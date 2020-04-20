webpackJsonp([10],{"5lNs":function(t,e){},GQ4E:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("woOf"),n=s.n(a),o=s("fZjL"),i=s.n(o),r={name:"topic-metrics",components:{},props:{},watch:{currentExpandRow:{deep:!0,handler:function(){clearInterval(this.timer)}}},data:function(){return{expands:[],addVisible:!1,popoverVisible:!1,modClosed:!1,topicQos:"all",timer:0,topics:[],currentExpandRow:{},currentTopic:{},record:{},rules:{topic:{required:!0,message:this.$t("oper.pleaseEnter")}}}},methods:{getRowKeys:function(t){return t.topic},loadData:function(){var t=this;this.$httpGet("/topic-metrics").then(function(e){t.topics=i()(e.data).map(function(t){return{topic:t,messageIn:e.data[t]["messages.in.count"],messageOut:e.data[t]["messages.out.count"],messageDrop:e.data[t]["messages.dropped.count"]}}),t.modClosed=!1}).catch(function(e){t.$message.warning(t.$t("error."+e.message)),t.modClosed=!0})},hidePopover:function(){var t=this;this.popoverVisible=!0,setTimeout(function(){t.popoverVisible=!1},0)},handleOperation:function(){this.addVisible=!0},handleModLoad:function(){var t=this;this.$httpPut("/modules/emqx_mod_topic_metrics/load").then(function(){t.$message.success(t.$t("oper.enableSuccess")),t.loadData(),t.modClosed=!1}).catch(function(e){t.$message.error(e||t.$t("error.networkError"))})},deleteTopicMetric:function(t){var e=this;this.$httpDelete("/topic-metrics/"+encodeURIComponent(t.topic)).then(function(){e.loadData(),e.hidePopover()}).catch(function(t){e.$message.error(t||e.$t("error.networkError"))})},handleAdd:function(){var t=this;this.$refs.record.validate(function(e){if(e){var s={};n()(s,t.record),t.$httpPost("/topic-metrics",s).then(function(){t.handleClose(),t.loadData()}).catch(function(){})}})},handleClose:function(){this.addVisible=!1,this.$refs.record.resetFields()},viewTopicDetails:function(t,e){var s=document.querySelectorAll(".el-table__expand-icon")[e];s&&s.click()},loadDetail:function(){var t=this;this.$httpGet("/topic-metrics/"+encodeURIComponent(this.currentTopic.topic)).then(function(e){t.currentTopic=e.data,t.loadData()}).catch(function(){})},setLoadDetailInterval:function(){var t=this;this.timer=setInterval(function(){t.$httpGet("/topic-metrics/"+encodeURIComponent(t.currentExpandRow.topic)).then(function(e){t.currentTopic=e.data}).catch(function(){})},1e4)},handleExpandChange:function(t,e){var s=this;if(!e.length)return this.currentExpandRow={},void clearInterval(this.timer);this.currentExpandRow=t,this.currentTopic={},this.$httpGet("/topic-metrics/"+encodeURIComponent(t.topic)).then(function(a){s.currentTopic=a.data,s.$refs.crudTable.store.states.expandRows=e.length?[t]:[],s.loadData(),s.setLoadDetailInterval()}).catch(function(){})},getCurrentTopicData:function(t,e){var s={all:"messages",qos0:"messages.qos0",qos1:"messages.qos1",qos2:"messages.qos2"}[this.topicQos],a=this.currentTopic[s+"."+t+"."+e];return"rate"===e&&a?a.toFixed(2):a},getCurrentTopicDropRate:function(t){return t?t.toFixed(2):t}},created:function(){this.loadData()},beforeRouteLeave:function(t,e,s){clearInterval(this.timer),s()},beforeDestroy:function(){clearInterval(this.timer)}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"topic-metrics"},[s("div",{staticClass:"page-title"},[t._v("\n    "+t._s(t.$t("analysis.topicMetrics"))+"\n    "),s("span",{staticClass:"sub-tip"},[t._v(t._s(t.$t("analysis.metricsTip")))]),t._v(" "),t.modClosed?s("el-button",{staticClass:"confirm-btn",staticStyle:{float:"right"},attrs:{round:"",plain:"",type:"success",size:"medium",disable:t.$store.state.loading},on:{click:t.handleModLoad}},[t._v("\n      "+t._s(t.$t("modules.enable"))+"\n    ")]):s("el-button",{staticClass:"confirm-btn",staticStyle:{float:"right"},attrs:{round:"",plain:"",type:"success",icon:"el-icon-plus",size:"medium",disable:t.$store.state.loading},on:{click:t.handleOperation}},[t._v("\n      "+t._s(t.$t("rule.create"))+"\n    ")])],1),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.$store.state.loading,expression:"$store.state.loading"}],ref:"crudTable",attrs:{border:"",data:t.topics,"row-key":t.getRowKeys,"expand-row-keys":t.expands},on:{"expand-change":t.handleExpandChange}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"expand-header"},[t._v("\n          "+t._s(t.$t("analysis.details"))+"\n          "),s("el-radio-group",{staticClass:"topic-qos-radio",attrs:{prop:e,size:"mini"},model:{value:t.topicQos,callback:function(e){t.topicQos=e},expression:"topicQos"}},[s("el-radio-button",{attrs:{label:"all"}},[t._v(t._s(t.$t("analysis.all")))]),t._v(" "),s("el-radio-button",{attrs:{label:"qos0"}},[t._v("QoS 0")]),t._v(" "),s("el-radio-button",{attrs:{label:"qos1"}},[t._v("QoS 1")]),t._v(" "),s("el-radio-button",{attrs:{label:"qos2"}},[t._v("QoS 2")])],1)],1),t._v(" "),s("el-row",{staticClass:"expand-body",attrs:{gutter:20}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"message-card in"},[s("div",[t._v("\n                "+t._s(t.$t("analysis.messageIn"))+"\n                "),s("span",{staticClass:"message-rate"},[t._v("\n                  "+t._s(t.$t("analysis.rateItem",[t.getCurrentTopicData("in","rate")]))+"\n                  "+t._s(t.$t("analysis.rate"))+"\n                ")])]),t._v(" "),s("div",{staticClass:"message-card--body"},[t._v("\n                "+t._s(t.getCurrentTopicData("in","count"))+"\n              ")])])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"message-card out"},[s("div",[t._v("\n                "+t._s(t.$t("analysis.messageOut"))+"\n                "),s("span",{staticClass:"message-rate"},[t._v("\n                  "+t._s(t.$t("analysis.rateItem",[t.getCurrentTopicData("in","rate")]))+"\n                  "+t._s(t.$t("analysis.rate"))+"\n                ")])]),t._v(" "),s("div",{staticClass:"message-card--body"},[t._v("\n                "+t._s(t.getCurrentTopicData("out","count"))+"\n              ")])])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"message-card drop"},[s("div",[t._v("\n                "+t._s(t.$t("analysis.messageDrop"))+"\n                "),s("span",{staticClass:"message-rate"},[t._v("\n                  "+t._s(t.$t("analysis.rateItem",[t.getCurrentTopicDropRate(t.currentTopic["messages.dropped.rate"])]))+"\n                  "+t._s(t.$t("analysis.rate"))+"\n                ")])]),t._v(" "),s("div",{staticClass:"message-card--body"},[t._v("\n                "+t._s(t.currentTopic["messages.dropped.count"])+"\n              ")])])])],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"topic",label:t.$t("topics.topic")}}),t._v(" "),s("el-table-column",{attrs:{prop:"messageIn",label:t.$t("analysis.messageIn")}}),t._v(" "),s("el-table-column",{attrs:{prop:"messageOut",label:t.$t("analysis.messageOut")}}),t._v(" "),s("el-table-column",{attrs:{prop:"messageDrop",label:t.$t("analysis.messageDrop")}}),t._v(" "),s("el-table-column",{attrs:{width:"180px",label:t.$t("oper.oper")},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"success",size:"mini",plain:""},on:{click:function(s){return t.viewTopicDetails(e.row,e.$index)}}},[t._v("\n          "+t._s(t.$t("oper.view"))+"\n        ")]),t._v(" "),s("el-popover",{attrs:{placement:"right",trigger:"click",value:t.popoverVisible}},[s("p",[t._v(t._s(t.$t("oper.confirmDelete")))]),t._v(" "),s("div",{staticStyle:{"text-align":"right"}},[s("el-button",{staticClass:"cache-btn",attrs:{size:"mini",type:"text"},on:{click:t.hidePopover}},[t._v("\n              "+t._s(t.$t("oper.cancel"))+"\n            ")]),t._v(" "),s("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(s){return t.deleteTopicMetric(e.row)}}},[t._v("\n              "+t._s(t.$t("oper.confirm"))+"\n            ")])],1),t._v(" "),s("el-button",{attrs:{slot:"reference",size:"mini",type:"danger",plain:""},slot:"reference"},[t._v("\n            "+t._s(t.$t("oper.delete"))+"\n          ")])],1)]}}])})],1),t._v(" "),s("el-dialog",{staticClass:"create-subscribe",attrs:{title:t.$t("analysis.addTopic"),width:"400px",visible:t.addVisible},on:{"update:visible":function(e){t.addVisible=e}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleAdd(e)}}},[s("el-form",{ref:"record",staticClass:"el-form--public",attrs:{model:t.record,rules:t.rules,size:"small","label-position":"top"}},[s("el-form-item",{attrs:{prop:"topic",label:t.$t("subscriptions.topic")}},[s("el-input",{attrs:{placeholder:"Topic"},model:{value:t.record.topic,callback:function(e){t.$set(t.record,"topic",e)},expression:"record.topic"}})],1)],1),t._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"cache-btn",attrs:{type:"text"},on:{click:t.handleClose}},[t._v("\n        "+t._s(t.$t("oper.cancel"))+"\n      ")]),t._v(" "),s("el-button",{staticClass:"confirm-btn",attrs:{type:"success",loading:t.$store.state.loading},on:{click:t.handleAdd}},[t._v("\n        "+t._s(t.$t("oper.add"))+"\n      ")])],1)],1)],1)},staticRenderFns:[]};var l=s("VU/8")(r,c,!1,function(t){s("5lNs")},null,null);e.default=l.exports}});