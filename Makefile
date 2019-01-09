PROJECT = emqx_dashboard
PROJECT_DESCRIPTION = EMQ X Web Dashboard
PROJECT_VERSION = 3.0

LOCAL_DEPS = mnesia

DEPS = minirest
dep_minirest = git-emqx https://github.com/emqx/minirest v0.1.0

BUILD_DEPS = emqx cuttlefish emqx_management
dep_emqx = git-emqx https://github.com/emqx/emqx emqx30
dep_cuttlefish = git-emqx https://github.com/emqx/cuttlefish v2.2.1
dep_emqx_management = git-emqx https://github.com/emqx/emqx-management emqx30

NO_AUTOPATCH = cuttlefish

ERLC_OPTS += +debug_info

COVER = true

$(shell [ -f erlang.mk ] || curl -s -o erlang.mk https://raw.githubusercontent.com/emqx/erlmk/master/erlang.mk)
include erlang.mk

app.config::
	./deps/cuttlefish/cuttlefish -l info -e etc/ -c etc/emqx_dashboard.conf -i priv/emqx_dashboard.schema -d data

