webpackJsonp([1],{JaHG:function(e,t,r){"use strict";t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=[],s="",a=i()({},t,{});return n()(e).forEach(function(e){var n=p()(e,2),i=n[0],o=n[1];if("$resource"!==i){var c=o.format,l=o.enum,d=o.input,m=o.title,v=o.type,y=o.description,g=o.default;"object"===(void 0===m?"undefined":u()(m))&&(m=m[f]),"object"===(void 0===y?"undefined":u()(y))&&(y=y[f]);var _=g||"";h.includes(c)&&(_={url:"http://"}[c]);var $={placeholder:_};(l||"boolean"===v)&&(v="emq-select",$.field=l?{options:l.map(function(e){return{value:e,label:e}})}:{options:[{label:!0,value:!0},{label:!1,value:!1}]}),"object"!==v||g||(g={}),"textarea"===d&&($.type="textarea",$.rows=5),r.push({key:i,type:v,label:m||i,prop:i,defaultValue:g,$attrs:$,description:y}),t?a[t][i]=b(e):a[i]=b(e)}else s="string"}),{model:r,rules:a,resource:s}};var s=r("W3Iv"),n=r.n(s),a=r("bOdI"),i=r.n(a),o=r("fZjL"),c=r.n(o),l=r("pFYg"),u=r.n(l),d=r("d7EF"),p=r.n(d),f=window.localStorage.language||window.EMQX_DASHBOARD_CONFIG.lang||"en",m={is_required:{en:"is required",zh:"必填"}},h=["string","number","boolean","method","regexp","integer","float","array","object","enum","date","url","hex","email"];function b(e){var t=p()(e,2),r=t[0],s=t[1],n=s.type,a=s.format,i=s.required,o=s.enum,l=s.title;"object"===(void 0===l?"undefined":u()(l))&&(l=l[f]);var d={};return i&&(d.required=!0,d.message=(l||r)+" "+m.is_required[f]),d.type=n,h.includes(a)&&(d.type=a),d.enum="enum"===n?o:void 0,c()(d).length>0?d:void 0}},LRkt:function(e,t){},SHGx:function(e,t,r){"use strict";var s=r("Dd8w"),n=r.n(s),a=r("pFYg"),i=r.n(a),o=r("JaHG"),c=window.localStorage.language||window.EMQX_DASHBOARD_CONFIG.lang||"en",l={name:"resource-dialog",inheritAttrs:!1,props:{visible:{type:Boolean,required:!0},resourceType:{type:String},enableItem:{type:Array,default:function(){return[]}}},data:function(){return{paramsList:[],resourceRules:{},resourceTypes:[],record:{name:"",type:"",config:{},description:""}}},methods:{close:function(){this.$refs.record&&this.$refs.record.resetFields()},handleCreate:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.record.validate(function(r){if(r){var s=t?"/resources":"/resources?test=true";e.$httpPost(s,e.record).then(function(r){t?(e.$message.success(e.$t("rule.create_success")),e.dialogVisible=!1,e.$emit("confirm",r.data)):e.$message.success(e.$t("rule.conf_test_success"))}).catch(function(){})}})},handleTypeChange:function(e){this.paramsList=[],this.resourceRules={};var t=this.resourceTypes.find(function(t){return t.name===e});if(t){var r=Object(o.a)(t.params,"config"),s=r.model,n=r.rules;this.resourceRules=n,this.paramsList=s,this.initRecord()}},initRecord:function(){var e=this;0===this.paramsList.length?this.$set(this.record,"config",void 0):this.record.config||this.$set(this.record,"config",{}),this.paramsList.forEach(function(t){e.$set(e.record.config,t.key,t.defaultValue)}),setTimeout(function(){e.$refs.record.clearValidate()},30)},loadResourceTypes:function(){var e=this;this.$httpGet("/resource_types").then(function(t){e.record={name:"",type:"",config:{},description:""},e.resourceType&&(e.record.type=e.resourceType),e.resourceTypes=t.data.map(function(e){return e.titleLabel="object"===i()(e.title)?e.title[c]:e.title,e}),e.handleTypeChange(e.record.type),setTimeout(function(){e.$refs.record.clearValidate()},30)})}},created:function(){},computed:{dialogVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}},rules:function(){return n()({name:{required:!0},type:{required:!0}},this.resourceRules)}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",e._b({staticClass:"resource-dialog",attrs:{width:"700px",visible:e.dialogVisible,title:e.$t("rule.resource_mgmt")},on:{"update:visible":function(t){e.dialogVisible=t},close:e.close,open:e.loadResourceTypes}},"el-dialog",e.$attrs,!1),[r("el-form",{ref:"record",staticClass:"el-form--public",attrs:{model:e.record,rules:e.rules}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"type",label:e.$t("rule.resource_type")}},[r("el-select",{staticClass:"el-select--public",staticStyle:{width:"100%"},attrs:{"popper-class":"el-select--public",disabled:!!e.resourceType},on:{change:e.handleTypeChange},model:{value:e.record.type,callback:function(t){e.$set(e.record,"type",t)},expression:"record.type"}},e._l(e.resourceTypes,function(t,s){return r("el-option",{key:s,attrs:{disabled:0!==e.enableItem.length&&!e.enableItem.includes(t.name),label:t.titleLabel,value:t.name}})}),1)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",[r("template",{slot:"label"},[e._v(" ")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleCreate(!1)}}},[e._v("\n            "+e._s(e.$t("rule.conf_test"))+"\n          ")])],2)],1),e._v(" "),e.record.type?[e._l(e.paramsList,function(t,s){return r("el-col",{key:s,attrs:{span:"object"===t.type||"textarea"===t.$attrs.type?24:12}},[r("el-form-item",{attrs:{prop:"config."+t.prop}},[r("template",{slot:"label"},[e._v("\n              "+e._s(t.label)+"\n\n              "),t.description?r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[e._v("\n                "+e._s(t.description)+"\n                "),r("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})]):e._e()],1),e._v(" "),"object"===t.type?r("data-table",{model:{value:e.record.config[t.key],callback:function(r){e.$set(e.record.config,t.key,r)},expression:"record.config[item.key]"}}):"emq-select"===t.type?r("emq-select",e._b({staticClass:"el-select--public",attrs:{"popper-class":"el-select--public"},model:{value:e.record.config[t.key],callback:function(r){e.$set(e.record.config,t.key,r)},expression:"record.config[item.key]"}},"emq-select",t.$attrs,!1)):"number"===t.type?r("el-input",e._b({attrs:{type:"number"},model:{value:e.record.config[t.key],callback:function(r){e.$set(e.record.config,t.key,e._n(r))},expression:"record.config[item.key]"}},"el-input",t.$attrs,!1)):r("el-input",e._b({model:{value:e.record.config[t.key],callback:function(r){e.$set(e.record.config,t.key,r)},expression:"record.config[item.key]"}},"el-input",t.$attrs,!1))],2)],1)}),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"description",label:e.$t("rule.description")}},[r("el-input",{model:{value:e.record.description,callback:function(t){e.$set(e.record,"description",t)},expression:"record.description"}})],1)],1)]:e._e()],2)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticClass:"cache-btn",attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("\n      "+e._s(e.$t("rule.cancel"))+"\n    ")]),e._v(" "),r("el-button",{staticClass:"confirm-btn",attrs:{type:"success"},on:{click:e.handleCreate}},[e._v("\n      "+e._s(e.$t("rule.create"))+"\n    ")])],1)],1)},staticRenderFns:[]};var d=r("VU/8")(l,u,!1,function(e){r("LRkt")},null,null);t.a=d.exports},eDC2:function(e,t,r){"use strict";var s=r("mvHQ"),n=r.n(s),a=r("d7EF"),i=r.n(a),o=r("W3Iv"),c=r.n(o),l=r("Xxa5"),u=r.n(l),d=r("exGp"),p=r.n(d),f=r("Dd8w"),m=r.n(f),h=r("fZjL"),b=r.n(h),v=r("pFYg"),y=r.n(v),g=r("SHGx"),_=r("JaHG"),$=window.localStorage.language||window.EMQX_DASHBOARD_CONFIG.lang||"en",k={name:"action-dialog",inheritAttrs:!1,components:{ResourceDialog:g.a},props:{visible:{type:Boolean,required:!0},formData:{type:Object},currentActions:{type:Array,default:function(){return[]}},params:{type:Object,default:function(){return{for:"$message"}}}},data:function(){return{resourceDialogVisible:!1,resourceType:"",enableItem:[],record:{params:{}},rules:{action:{required:!0},params:{$resource:{required:!0,message:"Resource is required"}}},options:[],action:{},actionsList:[],paramsList:[]}},methods:{handleResourceCreate:function(e){this.loadResource(e.id)},createResource:function(){this.resourceDialogVisible=!0,this.resourceType=this.action.type},_isEmpty:function(e){return!e||(!(!Array.isArray(e)||0!==e.length)||("object"===(void 0===e?"undefined":y()(e))?0===b()(e).length:!!e))},close:function(){this.$refs.record&&(this.options={},this.action={},this.paramsList=[],this.$refs.record.resetFields())},handleAdd:function(){var e=this;this.$refs.record.validate(function(t){if(t){var r=e.record,s=r.params,a={name:r.action,params:m()({},s)},i=n()(a);e.currentActionsMap[i]?e.$message.error(e.$t("rule.action_exists")):(e.$emit("confirm",a),e.dialogVisible=!1)}})},handleActionChange:function(e){var t=this;if(this.paramsList=[],this.enableItem=[],this.action=this.actionsList.find(function(t){return t.name===e}),this.action){this.enableItem=this.action.types;var r=Object(_.a)(this.action.params),s=r.model,n=void 0===s?[]:s,a=r.rules,i=void 0===a?{}:a;return this.paramsList=n,this.rules.params=m()({},this.rules.params,i),this.$set(this.record,"params",{}),n.forEach(function(e){var r=e.key,s=e.defaultValue;t.$set(t.record.params,r,s||void 0)}),setTimeout(function(){t.$refs.record.clearValidate()},10),this.loadResource()}},loadResource:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this.action&&this.action.params&&this.action.params.$resource){this.$set(this.record.params,"$resource",t),this.$set(this.record,"resource",t);var r=this.action.types,s=void 0===r?[]:r;return this.$httpGet("/resources").then(function(r){var n=r.data;e.options=n.filter(function(e){return s.includes(e.type)}),e.$set(e.record,"resource",t)})}},loadActions:function(){var e=this;return this.$httpGet("/actions",this.params).then(function(t){e.actionsList=t.data.map(function(e){return e.label=(e.title||{})[$],e.descriptionLabel=(e.description||{})[$],e})})},renderForm:function(e){var t=this;return p()(u.a.mark(function r(){var s,n,a,i;return u.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t.formData){r.next=2;break}return r.abrupt("return");case 2:return s=t.formData||e,n=s.name,a=s.params,i=void 0===a?{}:a,r.next=5,t.handleActionChange(n);case 5:t.fillData(i);case 6:case"end":return r.stop()}},r,t)}))()},fillData:function(e){var t=this;c()(e).forEach(function(e){var r=i()(e,2),s=r[0],n=r[1];t.$set(t.record,s,n)})},open:function(e){var t=this;return p()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.record.params={},e.next=3,t.loadActions();case 3:case"end":return e.stop()}},e,t)}))()}},created:function(){var e=this;return p()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.loadActions();case 2:return t.next=4,e.renderForm();case 4:case"end":return t.stop()}},t,e)}))()},computed:{dialogVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}},currentActionsMap:function(){var e={};return this.currentActions.forEach(function(t){var r=n()(t);e[r]=!0}),e}}},x={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",e._b({staticClass:"action-dialog",attrs:{width:"500px","append-to-body":"",visible:e.dialogVisible,title:e.$t("rule.actions")},on:{"update:visible":function(t){e.dialogVisible=t},open:e.open,close:e.close}},"el-dialog",e.$attrs,!1),[r("el-form",{ref:"record",staticClass:"el-form--public",attrs:{model:e.record,rules:e.rules}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"action"}},[r("template",{slot:"label"},[e._v("\n            "+e._s(e.$t("rule.action"))+"\n            "),r("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover"}},[e._v("\n              "+e._s(e.action.descriptionLabel||e.$t("rule.action_type"))+"\n              "),r("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})])],1),e._v(" "),r("el-select",{staticClass:"el-select--public",staticStyle:{width:"100%"},attrs:{"popper-class":"el-select--public"},on:{change:e.handleActionChange},model:{value:e.record.action,callback:function(t){e.$set(e.record,"action",t)},expression:"record.action"}},e._l(e.actionsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.label,value:e.name}})}),1)],2)],1),e._v(" "),e.action.params&&e.action.params.$resource?r("el-col",{attrs:{span:12}},[r("el-form-item",{staticClass:"resource-item",attrs:{prop:"params.$resource"}},[r("template",{slot:"label"},[e._v("\n            "+e._s(e.$t("rule.resource"))+"\n            "),r("span",{staticClass:"btn",staticStyle:{float:"right","font-size":"12px"},on:{click:e.createResource}},[e._v("\n              "+e._s(e.$t("rule.new_resource"))+"\n            ")])]),e._v(" "),r("el-select",{staticClass:"el-select--public",staticStyle:{width:"100%"},attrs:{"popper-class":"el-select--public"},model:{value:e.record.params.$resource,callback:function(t){e.$set(e.record.params,"$resource",t)},expression:"record.params.$resource"}},e._l(e.options,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],2)],1):e._e(),e._v(" "),e._l(e.paramsList,function(t,s){return r("el-col",{key:s,attrs:{span:"object"===t.type||"textarea"===t.$attrs.type?24:12}},[r("el-form-item",{attrs:{prop:"params."+t.prop}},[r("template",{slot:"label"},[e._v("\n            "+e._s(t.label)+"\n\n            "),t.description?r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[e._v("\n              "+e._s(t.description)+"\n              "),r("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})]):e._e()],1),e._v(" "),"object"===t.type?r("data-table",{model:{value:e.record.params[t.key],callback:function(r){e.$set(e.record.params,t.key,r)},expression:"record.params[item.key]"}}):"emq-select"===t.type?r("emq-select",e._b({staticClass:"el-select--public",attrs:{"popper-class":"el-select--public"},model:{value:e.record.params[t.key],callback:function(r){e.$set(e.record.params,t.key,r)},expression:"record.params[item.key]"}},"emq-select",t.$attrs,!1)):"number"===t.type?r("el-input",e._b({attrs:{type:"number"},model:{value:e.record.config[t.key],callback:function(r){e.$set(e.record.config,t.key,e._n(r))},expression:"record.config[item.key]"}},"el-input",t.$attrs,!1)):r("el-input",e._b({model:{value:e.record.params[t.key],callback:function(r){e.$set(e.record.params,t.key,r)},expression:"record.params[item.key]"}},"el-input",t.$attrs,!1))],2)],1)})],2)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{staticClass:"cache-btn",attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("\n      "+e._s(e.$t("rule.cancel"))+"\n    ")]),e._v(" "),r("el-button",{staticClass:"confirm-btn",attrs:{type:"success"},on:{click:e.handleAdd}},[e._v("\n      "+e._s(e.$t("rule.confirm"))+"\n    ")])],1),e._v(" "),r("resource-dialog",{attrs:{visible:e.resourceDialogVisible,"resource-type":e.resourceType,"enable-item":e.enableItem,"append-to-body":""},on:{"update:visible":function(t){e.resourceDialogVisible=t},confirm:e.handleResourceCreate}})],1)},staticRenderFns:[]};var w={name:"rule-actions",components:{ActionDialog:r("VU/8")(k,x,!1,function(e){r("fwWC")},null,null).exports},props:{record:{type:Object,required:!0},inDialog:{type:Boolean,default:!1},operations:{type:Array,default:function(){return["create","edit","delete"]}},params:{type:Object,default:function(){return{for:"$message"}}}},data:function(){return{dialogVisible:!1}},filters:{jsonFormat:function(e){return n()(e,null,2)}},methods:{handleActionAdd:function(e){this.record.actions.push(e)},handleRemove:function(e){var t=e.$index;this.record.actions=this.record.actions.filter(function(e,r){return r!==t})}},created:function(){},computed:{has:function(){var e=[];return this.operations.forEach(function(t){e[t]=!0}),e}}},C={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"rule-actions"},[r("el-table",{class:{"el-table--public":e.inDialog},attrs:{border:"",data:e.record.actions}},[r("el-table-column",{attrs:{prop:"name",label:e.$t("rule.type")}}),e._v(" "),r("el-table-column",{attrs:{prop:"params",label:e.$t("rule.value")},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.row;return e._l(Object.entries(s.params),function(t,s){return r("div",{key:s,staticClass:"action-item"},[e._v("\n          "+e._s("$resource"===t[0]?e.$t("rule.rely_resource"):t[0])+": "+e._s(t[1])+"\n        ")])})}}])}),e._v(" "),e.has.delete||e.has.edit?r("el-table-column",{attrs:{label:e.$t("rule.oper")},scopedSlots:e._u([{key:"default",fn:function(t){return[e.has.delete?r("el-button",{attrs:{type:"text"},on:{click:function(r){return e.handleRemove(t)}}},[e._v("\n          "+e._s(e.$t("rule.delete"))+"\n        ")]):e._e(),e._v(" "),e.has.edit?r("el-button",{attrs:{type:"text"}},[e._v(e._s(e.$t("rule.edit")))]):e._e()]}}],null,!1,2514070549)}):e._e()],1),e._v(" "),e.has.create?r("el-button",{staticStyle:{"margin-top":"24px","min-width":"80px"},attrs:{type:"success",plain:"",icon:"el-icon-plus",size:"small"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("\n    "+e._s(e.$t("rule.add"))+"\n  ")]):e._e(),e._v(" "),r("action-dialog",{attrs:{visible:e.dialogVisible,currentActions:e.record.actions,params:e.params},on:{"update:visible":function(t){e.dialogVisible=t},confirm:e.handleActionAdd}})],1)},staticRenderFns:[]};var A=r("VU/8")(w,C,!1,function(e){r("q6Ju")},null,null);t.a=A.exports},fwWC:function(e,t){},q6Ju:function(e,t){}});