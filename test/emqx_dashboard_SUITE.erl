-module(emqx_dashboard_SUITE).

-compile(export_all).

-include_lib("eunit/include/eunit.hrl").

-include_lib("emqx/include/emqx.hrl").

-define(CONTENT_TYPE, "application/x-www-form-urlencoded").

-define(HOST, "http://127.0.0.1:18083/").

-define(API_VERSION, "v3").

-define(BASE_PATH, "api").

all() -> 
    [{group, overview},
     {group, alarms},
     %{group, connections},
     %{group, sessions},
     %{group, routes},
     %{group, subscriptions},
     {group, admins},
     {group, cli}
     ].

groups() ->
    [{overview, [sequence], [brokers, stats,
                             nodes, metrics, listeners]},
     {alarms, [sequence], [get_alarms]},
     {connections, [sequence], [connections, clients_query]},
     {sessions, [sequence], [session_query]},
     {routes, [sequence], [route_query]},
     {subscriptions, [sequence], [subscribe_query]},
     {admins, [sequence], [admins_add_delete]},
     {cli, [sequence], [cli]}
    ].

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

brokers(_) ->
    ?assert(request_dashbaord(get, api_path("brokers"), auth_header_())).

stats(_) ->
    ?assert(request_dashbaord(get, api_path("stats"), auth_header_())).

nodes(_) ->
    ?assert(request_dashbaord(get, api_path("nodes"), auth_header_())).

metrics(_) ->
    ?assert(request_dashbaord(get, api_path("metrics"), auth_header_())).

listeners(_) ->
    ?assert(request_dashbaord(get, api_path("listeners"), auth_header_())).

get_alarms(_) ->
    AlarmTest = #alarm{id = <<"1">>, severity = error, title="alarm title", summary="alarm summary"},
    emqx_alarm_mgr:set_alarm(AlarmTest),
    [Alarm] = emqx_alarm_mgr:get_alarms(),
    ?assertEqual(error, Alarm#alarm.severity).

connections(_) ->
    ?assert(request_dashbaord(get, api_path("connections"), "page_size=100&curr_page=1", auth_header_())).

clients_query(_) ->
    Sock = client_connect_(<<16,12,0,4,77,81,84,84,4,0,0,90,0,0>>, 4),
    {ok, Entry} = emqx_dashboard_client:list(<<>>, 1, 100),
    Client = proplists:get_value(result, Entry),
    ClientId = proplists:get_value(clientId, Client), 
    ?assertEqual({ok, Entry}, emqx_dashboard_client:list(ClientId, 1, 100)),
    gen_tcp:close(Sock).

session_query(_) ->
    Sock = client_connect_(<<16,12,0,4,77,81,84,84,4,0,0,90,0,0>>, 4),
    {ok, Entry} = emqx_dashboard_session:list(<<>>, 1, 100),
    Session= proplists:get_value(result, Entry),
    ClientId = proplists:get_value(clientId, Session), 
    ?assertEqual({ok, Entry}, emqx_dashboard_session:list(ClientId, 1, 100)),
    gen_tcp:close(Sock).

route_query(_) ->
    ok = emqx:subscribe(<<"topic">>),
    timer:sleep(10),
    {ok, Routes} = emqx_dashboard_route:list(<<>>, 1, 100),
    ?assertEqual({ok, Routes}, emqx_dashboard_route:list(<<"topic">>, 1, 100)),
    ok = emqx:unsubscribe(<<"topic">>).

subscribe_query(_) ->
    Sock = client_connect_(<<16,12,0,4,77,81,84,84,4,0,0,90,0,0>>, 4),
    {ok, Entry} = emqx_dashboard_subscription:list(<<>>, 1, 100),
    Sub = proplists:get_value(result, Entry),
    ClientId = proplists:get_value(clientId, Sub), 
    ?assertEqual({ok, Entry}, emqx_dashboard_subscription:list(ClientId, 1, 100)),
    gen_tcp:close(Sock).

admins_add_delete(_) ->
    ok = emqx_dashboard_admin:add_user(<<"username">>, <<"password">>, <<"tag">>),
    ok = emqx_dashboard_admin:add_user(<<"username1">>, <<"password1">>, <<"tag1">>),
    Admins = emqx_dashboard_admin:all_users(),
    ?assertEqual(3, length(Admins)),
    ok = emqx_dashboard_admin:remove_user(<<"username1">>),
    Users = emqx_dashboard_admin:all_users(),
    ?assertEqual(2, length(Users)),
    ok = emqx_dashboard_admin:change_password(<<"username">>, <<"password">>, <<"pwd">>),
    timer:sleep(10),
    ?assert(request_dashbaord(get, api_path("brokers"), auth_header_("username", "pwd"))),
    %ct:pal("user now: ~p", [emqx_dashboard_admin:lookup_user(<<"username">>)]),
    ok = emqx_dashboard_admin:remove_user(<<"username">>),
    ?assertNotEqual(true, request_dashbaord(get, api_path("brokers"), auth_header_("username", "pwd"))).

client_connect_(Packet, RecvSize) ->
    {ok, Sock} = gen_tcp:connect({127,0,0,1}, 1883, [binary, {packet, raw}, {active, false}]),
    gen_tcp:send(Sock, Packet),
    gen_tcp:recv(Sock, RecvSize, 3000),
    Sock.

request_dashbaord(Method, Url, Auth) ->
    Request = {Url, [Auth]},
    do_request_dashbaord(Method, Request).
request_dashbaord(Method, Url, QueryParams, Auth) ->
    Request = {Url ++ "?" ++ QueryParams, [Auth]},
    do_request_dashbaord(Method, Request).
do_request_dashbaord(Method, Request)->
    ct:pal("Method: ~p, Request: ~p", [Method, Request]),
    case httpc:request(Method, Request, [], []) of
        {error, socket_closed_remotely} ->
            {error, socket_closed_remotely};
        {ok, {{"HTTP/1.1", 200, _}, _, _Return} }  ->
            true;
        {ok, {Reason, _, _}} ->
            {error, Reason}
    end.

auth_header_() ->
    auth_header_("admin", "public").

auth_header_(User, Pass) ->
    Encoded = base64:encode_to_string(lists:append([User,":",Pass])),
    {"Authorization","Basic " ++ Encoded}.

api_path(Path) ->
    ?HOST ++ filename:join([?BASE_PATH, ?API_VERSION, Path]).

cli(_Config) ->
    [mnesia:dirty_delete({mqtt_admin, Admin}) ||  Admin <- mnesia:dirty_all_keys(mqtt_admin)],
    emqx_dashboard_cli:admins(["add", "username", "password"]),
    [{mqtt_admin, <<"username">>, <<Salt:4/binary, Hash/binary>>, _}] = 
        emqx_dashboard_admin:lookup_user(<<"username">>),
    ?assertEqual(Hash, erlang:md5(<<Salt/binary, <<"password">>/binary>>)),
    emqx_dashboard_cli:admins(["passwd", "username", "newpassword"]),
    [{mqtt_admin, <<"username">>, <<Salt1:4/binary, Hash1/binary>>, _}] = 
        emqx_dashboard_admin:lookup_user(<<"username">>),
    ?assertEqual(Hash1, erlang:md5(<<Salt1/binary, <<"newpassword">>/binary>>)),
    emqx_dashboard_cli:admins(["del", "username"]),
    [] = emqx_dashboard_admin:lookup_user(<<"username">>),
    emqx_dashboard_cli:admins(["add", "admin1", "pass1"]),
    emqx_dashboard_cli:admins(["add", "admin2", "passw2"]),
    AdminList = emqx_dashboard_admin:all_users(),
    ?assertEqual(2, length(AdminList)).