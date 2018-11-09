PROJECT = emqx_dashboard
PROJECT_DESCRIPTION = EMQ X Web Dashboard
PROJECT_VERSION = 3.0

LOCAL_DEPS = mnesia

DEPS = minirest
dep_minirest = git https://github.com/emqx/minirest emqx30

BUILD_DEPS = emqx cuttlefish emqx_management
dep_emqx = git https://github.com/emqtt/emqttd emqx30
dep_cuttlefish = git https://github.com/emqtt/cuttlefish emqx30
dep_emqx_management = git https://github.com/emqx/emqx-management emqx30

NO_AUTOPATCH = cuttlefish

ERLC_OPTS += +debug_info

COVER = true

include erlang.mk

app.config::
	./deps/cuttlefish/cuttlefish -l info -e etc/ -c etc/emqx_dashboard.conf -i priv/emqx_dashboard.schema -d data

