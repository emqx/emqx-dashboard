PROJECT = emqx_dashboard
PROJECT_DESCRIPTION = EMQ X Web Dashboard
PROJECT_VERSION = 3.0

LOCAL_DEPS = mnesia

DEPS = minirest
dep_minirest = git-emqx https://github.com/emqx/minirest emqx30

BUILD_DEPS = emqx cuttlefish emqx_management
dep_emqx = git-emqx https://github.com/emqx/emqx emqx30
dep_cuttlefish = git-emqx https://github.com/emqx/cuttlefish emqx30
dep_emqx_management = git-emqx https://github.com/emqx/emqx-management emqx30

NO_AUTOPATCH = cuttlefish

ERLC_OPTS += +debug_info

COVER = true

define dep_fetch_git-emqx
	git clone -q --depth 1 -b $(call dep_commit,$(1)) -- $(call dep_repo,$(1)) $(DEPS_DIR)/$(call dep_name,$(1)) > /dev/null 2>&1; \
	cd $(DEPS_DIR)/$(call dep_name,$(1));
endef

include erlang.mk

app.config::
	./deps/cuttlefish/cuttlefish -l info -e etc/ -c etc/emqx_dashboard.conf -i priv/emqx_dashboard.schema -d data

