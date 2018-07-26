%%--------------------------------------------------------------------
%% Copyright (c) 2015-2017 EMQ Enterprise, Inc. (http://emqtt.io).
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
%%--------------------------------------------------------------------

-module(emqx_auth_dashboard).

-include_lib("emqx/include/emqx.hrl").

-behaviour(emqx_auth_mod).

-export([init/1, check/3, description/0]).

init([Listeners]) ->
    {ok, Listeners}.

check(#mqtt_client{ws_initial_headers = undefined}, _Password, _) ->
    ignore;

check(#mqtt_client{client_id = <<"dashboard_", _/binary>>,
                   username  = <<"dashboard">>,
                   ws_initial_headers = Headers}, _Password, Listeners) ->
    Origin = proplists:get_value("Origin", Headers, ""),
    case is_from_dashboard(Origin, Listeners) of
        true  -> ok;
        false -> ignore
    end;

check(_Client, _Password, _Opts) ->
    ignore.

is_from_dashboard(_Origin, []) ->
    false;
is_from_dashboard(Origin, [{_, Port, _}|Listeners]) ->
    %%TODO: workaround first...
    case string:rstr(Origin, integer_to_list(Port)) of
        0  -> is_from_dashboard(Origin, Listeners);
        _I -> true
    end.

description() ->
    "Dashboard Authentication Module".

