%% Copyright (c) 2013-2019 EMQ Technologies Co., Ltd. All Rights Reserved.
%%
%% Licensed under the Apache License, Version 2.0 (the "License");
%% you may not use this file except in compliance with the License.
%% You may obtain a copy of the License at
%%
%%     http://www.apache.org/licenses/LICENSE-2.0
%%
%% Unless required by applicable law or agreed to in writing, software
%% distributed under the License is distributed on an "AS IS" BASIS,
%% WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
%% See the License for the specific language governing permissions and
%% limitations under the License.


-module(emqx_dashboard).

-import(proplists, [get_value/2]).

-export([start_listeners/0, stop_listeners/0, listeners/0]).

-export([http_handlers/0]).

-define(APP, ?MODULE).

%%--------------------------------------------------------------------
%% Start/Stop listeners.
%%--------------------------------------------------------------------

start_listeners() ->
    lists:foreach(fun(Listener) -> start_listener(Listener) end, listeners()).

%% Start HTTP Listener
start_listener({Proto, Port, Options}) when Proto == http ->
    Dispatch = [{"/", cowboy_static, {priv_file, emqx_dashboard, "www/index.html"}},
                {"/static/[...]", cowboy_static, {priv_dir, emqx_dashboard, "www/static"}},
                {"/api/v3/[...]", minirest, http_handlers()}],
    minirest:start_http(listener_name(Proto), [{port, Port}] ++ Options, Dispatch);

start_listener({Proto, Port, Options}) when Proto == https ->
    Dispatch = [{"/", cowboy_static, {priv_file, emqx_dashboard, "www/index.html"}},
                {"/static/[...]", cowboy_static, {priv_dir, emqx_dashboard, "www/static"}},
                {"/api/v3/[...]", minirest, http_handlers()}],
    minirest:start_https(listener_name(Proto), [{port, Port}] ++ Options, Dispatch).

stop_listeners() ->
    lists:foreach(fun(Listener) -> stop_listener(Listener) end, listeners()).

stop_listener({Proto, _Port, _}) ->
    minirest:stop_http(listener_name(Proto)).

listeners() ->
    application:get_env(?APP, listeners, []).

listener_name(Proto) ->
    list_to_atom(atom_to_list(Proto) ++ ":dashboard").

%%--------------------------------------------------------------------
%% HTTP Handlers and Dispatcher
%%--------------------------------------------------------------------

http_handlers() ->
    ApiProviders = application:get_env(?APP, api_providers, []),
    [{"/api/v3/", minirest:handler(#{apps => ApiProviders}),[{authorization, fun is_authorized/1}]}].

%%--------------------------------------------------------------------
%% Basic Authorization
%%--------------------------------------------------------------------

is_authorized(Req) ->
    is_authorized(binary_to_list(cowboy_req:path(Req)), Req).

is_authorized("/api/v3/auth" ++ _, _Req) ->
    true;
is_authorized(_Path, Req) ->
    case cowboy_req:parse_header(<<"authorization">>, Req) of
        {basic, Username, Password} ->
            case emqx_dashboard_admin:check(iolist_to_binary(Username),
                                            iolist_to_binary(Password)) of
                ok -> true;
                {error, Reason} ->
                    logger:error("Dashboard Authorization Failure: username=~s, reason=~p",
                                [Username, Reason]),
                    false
            end;
         _  -> false
    end.


user_passwd(BasicAuth) ->
    list_to_tuple(binary:split(base64:decode(BasicAuth), <<":">>)).

