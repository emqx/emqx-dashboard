webpackJsonp([22],{OgCE:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("zL8q"),l=e("JaHG"),o=e("CqLJ"),r=e.n(o),s={name:"alarms-view",components:{"el-table":n.Table,"el-table-column":n.TableColumn,"el-popover":n.Popover,"el-tooltip":n.Tooltip},data:function(){return{loading:!1,currentTableData:[],historicalTableData:[],lang:window.localStorage.getItem("language")||"en"}},methods:{loadData:function(){this.loadAlarmData("activated","currentTableData"),this.loadAlarmData("deactivated","historicalTableData")},loadAlarmData:function(t,a){var e=this;this.loading=!0,this.$httpGet("/alarms/"+t).then(function(t){var n=[];t.data.forEach(function(t){t.alarms.forEach(function(a){a.node=t.node,n.push(a)})}),e[a]=n,e.loading=!1}).catch(function(t){e.loading=!1,e.$message.error(t||e.$t("error.networkError"))})},getDuration:function(t){return Object(l.a)(t/1e3,Date.now())},dateFormat:function(t){return"number"!=typeof t&&"infinity"===t?"":r()(t/1e3,"yyyy-mm-dd HH:MM:ss")},handleCancelAlarm:function(t,a,e){var n=this,l={node:t.node,name:t.name};this.$httpPost("/alarms/deactivated",l).then(function(){e.$refs["popover-"+a].doClose(),n.loadData()}).catch(function(t){n.$message.error(t||n.$t("error.networkError"))})},handleClearAll:function(){var t=this;this.$confirm(this.$t("analysis.confirmClear"),this.$t("oper.warning"),{confirmButtonClass:"confirm-btn",cancelButtonClass:"cache-btn el-button--text",type:"warning"}).then(function(){t.$httpDelete("/alarms/deactivated").then(function(){t.loadData()}).catch(function(a){t.$message.error(a||t.$t("error.networkError"))})}).catch(function(){})}},created:function(){this.loadData()}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"alarms-view"},[e("div",{staticClass:"page-title"},[t._v("\n    "+t._s(t.$t("leftbar.alarms"))+"\n  ")]),t._v(" "),e("div",{staticClass:"table-title"},[t._v(t._s(t.$t("analysis.currentAlarms")))]),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{border:"",data:t.currentTableData}},[e("el-table-column",{attrs:{prop:"name",label:t.$t("analysis.alarmName")}}),t._v(" "),e("el-table-column",{attrs:{prop:"message","min-width":"140px",label:t.$t("analysis.alarmMessage"),"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.row;return[e("el-popover",{attrs:{placement:"top",trigger:"hover",width:"160","open-delay":500}},[t._l(n.details,function(a,n){return e("div",{key:n},[t._v("\n            "+t._s(n)+": "+t._s(a)+"\n          ")])}),t._v(" "),e("span",{staticClass:"details",attrs:{slot:"reference"},slot:"reference"},[e("i",{staticClass:"iconfont icon-bangzhu"})])],2),t._v(" "),e("span",[t._v(t._s(n.message))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"node","min-width":"60px",label:t.$t("clients.node"),"show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"activate_at",label:t.$t("analysis.activateAt")},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v("\n        "+t._s(t.dateFormat(e.activate_at))+"\n      ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:t.$t("analysis.duration")},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v("\n        "+t._s(t.getDuration(e.activate_at))+"\n      ")]}}])}),t._v(" "),e("el-table-column",{attrs:{fixed:"right",width:"120px",label:t.$t("oper.oper")},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.row,l=a.$index,o=a._self;return[e("el-popover",{ref:"popover-"+l,attrs:{placement:"right",trigger:"click"}},[e("p",[t._v(t._s(t.$t("analysis.confirmDeactivate")))]),t._v(" "),e("div",{staticStyle:{"text-align":"right"}},[e("el-button",{staticClass:"cache-btn",attrs:{size:"mini",type:"text"},on:{click:function(t){o.$refs["popover-"+l].doClose()}}},[t._v("\n              "+t._s(t.$t("oper.cancel"))+"\n            ")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){return t.handleCancelAlarm(n,l,o)}}},[t._v("\n              "+t._s(t.$t("oper.confirm"))+"\n            ")])],1),t._v(" "),e("el-button",{attrs:{slot:"reference",size:"mini",type:"danger",plain:""},slot:"reference"},[t._v("\n            "+t._s(t.$t("analysis.deactivate"))+"\n          ")])],1)]}}])})],1),t._v(" "),e("div",{staticClass:"table-title"},[t._v("\n    "+t._s(t.$t("analysis.historicalAlarm"))+"\n    "),e("el-button",{staticClass:"table-oper",attrs:{size:"mini",type:"danger",plain:"",disabled:!t.historicalTableData.length},on:{click:t.handleClearAll}},[t._v("\n      "+t._s(t.$t("analysis.clearAll"))+"\n    ")])],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{border:"",data:t.historicalTableData}},[e("el-table-column",{attrs:{prop:"name",label:t.$t("analysis.alarmName")}}),t._v(" "),e("el-table-column",{attrs:{prop:"message","min-width":"140px",label:t.$t("analysis.alarmMessage"),"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.row;return[e("el-popover",{attrs:{placement:"top",trigger:"hover",width:"160","open-delay":500}},[t._l(n.details,function(a,n){return e("div",{key:n},[t._v("\n            "+t._s(n)+": "+t._s(a)+"\n          ")])}),t._v(" "),e("span",{staticClass:"details",attrs:{slot:"reference"},slot:"reference"},[e("i",{staticClass:"iconfont icon-bangzhu"})])],2),t._v(" "),e("span",[t._v(t._s(n.message))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"node","min-width":"60px",label:t.$t("clients.node"),"show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"activate_at",label:t.$t("analysis.activateAt")},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v("\n        "+t._s(t.dateFormat(e.activate_at))+"\n      ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"deactivate_at",label:t.$t("analysis.deactivateAt")},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.row;return[t._v("\n        "+t._s(t.dateFormat(e.deactivate_at))+"\n      ")]}}])})],1)],1)},staticRenderFns:[]};var c=e("VU/8")(s,i,!1,function(t){e("pCis")},null,null);a.default=c.exports},pCis:function(t,a){}});