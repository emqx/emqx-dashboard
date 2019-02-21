-module(emqx_dashboard_cli_SUITE).

-include_lib("eunit/include/eunit.hrl").

-compile(export_all).

all() ->
    [cli].

init_per_suite(Config) ->
    [start_apps(App, {SchemaFile, ConfigFile}) ||
        {App, SchemaFile, ConfigFile}
            <- [{emqx, local_path("deps/emqx/priv/emqx.schema"),
                       local_path("deps/emqx/etc/emqx.conf")},
                {emqx_management, local_path("deps/emqx_management/priv/emqx_management.schema"),
                                  local_path("deps/emqx_management/etc/emqx_management.conf")},
                {emqx_dashboard, local_path("priv/emqx_dashboard.schema"),
                                 local_path("etc/emqx_dashboard.conf")}]],
    Config.

end_per_suite(_Config) ->
    application:stop(emqx_dashboard),
    application:stop(emqx),
    ekka_mnesia:ensure_stopped().

cli(_Config) ->
    [mnesia:dirty_delete({mqtt_admin, Admin}) ||  Admin <- mnesia:dirty_all_keys(mqtt_admin)],
    emqx_dashboard_cli:admins(["add", "username", "password"]),
    [{mqtt_admin, <<"username">>, <<Salt:4/binary, Hash/binary>>, _}] = 
        emqx_dashboard_admin:lookup_user(<<"username">>),
    case Hash =:= erlang:md5(<<Salt/binary, <<"password">>/binary>>) of
        true -> ok;
        false -> ct:fail("password error")
    end,
    emqx_dashboard_cli:admins(["passwd", "username", "newpassword"]),
    [{mqtt_admin, <<"username">>, <<Salt1:4/binary, Hash1/binary>>, _}] = 
        emqx_dashboard_admin:lookup_user(<<"username">>),
    case Hash1 =:= erlang:md5(<<Salt1/binary, <<"newpassword">>/binary>>) of
        true -> ok;
        false -> ct:fail("password error")
    end,
    emqx_dashboard_cli:admins(["del", "username"]),
    [] = emqx_dashboard_admin:lookup_user(<<"username">>),
    emqx_dashboard_cli:admins(["add", "admin1", "pass1"]),
    emqx_dashboard_cli:admins(["add", "admin2", "passw2"]),
    AdminList = emqx_dashboard_admin:all_users(),
    2 = length(AdminList).

get_base_dir() ->
    {file, Here} = code:is_loaded(?MODULE),
    filename:dirname(filename:dirname(Here)).

local_path(RelativePath) ->
    filename:join([get_base_dir(), RelativePath]).

start_apps(App, {SchemaFile, ConfigFile}) ->
    read_schema_configs(App, {SchemaFile, ConfigFile}),
    set_special_configs(App),
    application:ensure_all_started(App).

read_schema_configs(App, {SchemaFile, ConfigFile}) ->
    ct:pal("Read configs - SchemaFile: ~p, ConfigFile: ~p", [SchemaFile, ConfigFile]),
    Schema = cuttlefish_schema:files([SchemaFile]),
    Conf = conf_parse:file(ConfigFile),
    NewConfig = cuttlefish_generator:map(Schema, Conf),
    Vals = proplists:get_value(App, NewConfig, []),
    [application:set_env(App, Par, Value) || {Par, Value} <- Vals].

set_special_configs(emqx) ->
    application:set_env(emqx, plugins_loaded_file,
                        local_path("deps/emqx/test/emqx_SUITE_data/loaded_plugins"));
set_special_configs(_App) ->
    ok.
