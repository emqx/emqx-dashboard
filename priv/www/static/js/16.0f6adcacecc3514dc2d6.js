webpackJsonp([16],{Wolf:function(t,e){},xPbZ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),n=i.n(s),a={name:"resources-view",components:{ResourceDialog:i("SHGx").a},props:{},data:function(){return{dialogVisible:!1,viewDialogVisible:!1,tableData:[],res:{},reloadLoading:!1,currentResource:""}},methods:{handleReconnect:function(t){var e=this;this.reloadLoading=!0,this.currentResource=t.id,this.$httpPost("/resources/"+t.id).then(function(){setTimeout(function(){e.loadData(),e.reloadLoading=!1},300)}).catch(function(){e.reloadLoading=!1})},handleDelete:function(t){var e=this;this.$confirm(this.$t("rule.confirm_stop_delete"),"Notice",{confirmButtonClass:"confirm-btn",confirmButtonText:this.$t("oper.confirm"),cancelButtonClass:"cache-btn el-button--text",cancelButtonText:this.$t("oper.cancel"),type:"warning"}).then(function(){e.$httpDelete("/resources/"+t.id).then(function(){e.$message.success(e.$t("rule.delete_success")),e.loadData()})}).catch()},viewResource:function(t){this.res=n()({},t),this.viewDialogVisible=!0},handleOperation:function(){this.dialogVisible=!0},loadData:function(){var t=this;this.$httpGet("/resources").then(function(e){t.tableData=e.data})}},created:function(){this.loadData()}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"resources-view"},[i("div",{staticClass:"page-title"},[t._v("\n    "+t._s(t.$t("rule.resource_title"))+"\n    "),i("el-button",{staticClass:"confirm-btn",staticStyle:{float:"right"},attrs:{round:"",plain:"",type:"success",icon:"el-icon-plus",size:"medium",disable:t.$store.state.loading},on:{click:t.handleOperation}},[t._v("\n      "+t._s(t.$t("rule.create"))+"\n    ")])],1),t._v(" "),i("el-table",{attrs:{border:"",data:t.tableData}},[i("el-table-column",{attrs:{prop:"id",label:t.$t("rule.id")}}),t._v(" "),i("el-table-column",{attrs:{prop:"type",label:t.$t("rule.resource_type")}}),t._v(" "),i("el-table-column",{attrs:{prop:"description",label:t.$t("rule.description")}}),t._v(" "),i("el-table-column",{attrs:{prop:"status",label:t.$t("rule.running_statue")},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[i("span",{class:[s.status.is_alive?"running":"stopped","status"]},[t._v("\n            "+t._s(s.status.is_alive?t.$t("rule.enabled"):t.$t("rule.disabled"))+"\n          ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("rule.oper")},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[i("el-button",{attrs:{loading:t.reloadLoading&&t.currentResource===s.id,plain:"",type:"success",size:"mini"},on:{click:function(e){return t.handleReconnect(s)}}},[t._v("\n          "+t._s(s.status.is_alive?t.$t("rule.reconnect"):t.$t("rule.connect"))+"\n        ")]),t._v(" "),i("el-button",{attrs:{plain:"",type:"success",size:"mini"},on:{click:function(e){return t.viewResource(s)}}},[t._v("\n          "+t._s(t.$t("rule.view"))+"\n        ")]),t._v(" "),i("el-button",{attrs:{plain:"",size:"mini",type:"warning"},on:{click:function(e){return t.handleDelete(s)}}},[t._v("\n          "+t._s(t.$t("rule.delete"))+"\n        ")])]}}])})],1),t._v(" "),i("resource-dialog",{ref:"resourceDialog",attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e},confirm:t.loadData}}),t._v(" "),i("el-dialog",{attrs:{title:t.$t("rule.resource_details"),visible:t.viewDialogVisible},on:{"update:visible":function(e){t.viewDialogVisible=e}}},[i("div",{staticClass:"dialog-preview"},[i("div",{staticClass:"option-item"},[i("div",{staticClass:"option-title"},[t._v("\n          "+t._s(t.$t("rule.id"))+"\n        ")]),t._v(" "),i("div",{staticClass:"option-value"},[t._v(t._s(t.res.id))])]),t._v(" "),i("div",{staticClass:"option-item"},[i("div",{staticClass:"option-title"},[t._v("\n          "+t._s(t.$t("rule.resource_type"))+"\n        ")]),t._v(" "),i("div",{staticClass:"option-value"},[t._v(t._s(t.res.type))])]),t._v(" "),i("div",{staticClass:"option-item"},[i("div",{staticClass:"option-title"},[t._v("\n          "+t._s(t.$t("rule.description"))+"\n        ")]),t._v(" "),i("div",{staticClass:"option-value"},[t._v(t._s(t.res.description))])]),t._v(" "),t.res.config&&Object.keys(t.res.config).length>0?i("div",{staticClass:"option-item"},[i("div",{staticClass:"option-title"},[t._v("\n          "+t._s(t.$t("rule.config_info"))+"\n        ")]),t._v(" "),i("div",{staticClass:"option-all"},t._l(Object.entries(t.res.config),function(e,s){return i("div",{key:s,staticClass:"option-item"},["object"!=typeof e[1]||Array.isArray(e[1])?[i("div",{staticClass:"option-title"},[t._v("\n                "+t._s(e[0])+"\n              ")]),t._v(" "),i("div",{staticClass:"option-value"},[t._v("\n                "+t._s(e[1])+"\n              ")])]:[i("div",{staticClass:"option-title"},[t._v("\n                "+t._s(e[0])+"\n              ")]),t._v(" "),i("div",{staticClass:"option-value"},[e[1]&&0!==Object.keys(e[1]).length?i("data-table",{staticStyle:{"margin-top":"0"},attrs:{disabled:""},model:{value:e[1],callback:function(i){t.$set(e,1,i)},expression:"item[1]"}}):i("span",[t._v("\n                  N/A\n                ")])],1)]],2)}),0)]):t._e()]),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"confirm-btn",attrs:{type:"success"},on:{click:function(e){t.viewDialogVisible=!1}}},[t._v("\n        "+t._s(t.$t("rule.confirm"))+"\n      ")])],1)])],1)},staticRenderFns:[]};var l=i("VU/8")(a,o,!1,function(t){i("Wolf")},null,null);e.default=l.exports}});