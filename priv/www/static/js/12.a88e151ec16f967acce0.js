webpackJsonp([12],{LbE0:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"help-view",components:{},data:function(){return{lang:window.localStorage.getItem("language")||"en"}},computed:{learnEnterprise:function(){return"en"===this.lang?"https://www.emqx.io/products/enterprise":"https://www.emqx.io/cn/products/enterprise"},freeTrial:function(){return"en"===this.lang?"https://www.emqx.io/downloads#enterprise":"https://www.emqx.io/cn/downloads#enterprise"},docsLink:function(){return"en"===this.lang?"https://developer.emqx.io/docs/broker/v3/en":"https://developer.emqx.io/docs/broker/v3/cn"},faqLink:function(){return"en"===this.lang?"https://developer.emqx.io/docs/tutorial/en/faq/faq.html":"https://developer.emqx.io/docs/tutorial/zh/faq/faq.html"}},methods:{}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"help-view"},[s("div",{staticClass:"page-title"},[t._v(t._s(t.$t("topbar.help")))]),t._v(" "),s("div",{staticClass:"help-item"},[s("h3",[t._v(t._s(t.$t("help.quickStart")))]),t._v(" "),s("p",[t._v(t._s(t.$t("help.emqxDesc")))]),t._v(" "),s("a",{attrs:{target:"_blank",href:"https://github.com/emqx/emqx"}},[t._v("github.com/emqx/emqx")])]),t._v(" "),s("el-divider"),t._v(" "),s("div",{staticClass:"help-item"},[s("h3",[t._v(t._s(t.$t("help.emqxEnterprise")))]),t._v(" "),s("p",{domProps:{innerHTML:t._s(t.$t("help.enterpriseDesc"))}}),t._v(" "),s("a",{attrs:{target:"_blank",href:t.learnEnterprise}},[t._v("\n      "+t._s(t.$t("oper.learnMore"))+"\n    ")]),t._v(" "),s("a",{attrs:{target:"_blank",href:t.freeTrial}},[t._v("\n      "+t._s(t.$t("help.freeTrial"))+"\n    ")])]),t._v(" "),s("el-divider"),t._v(" "),s("div",{staticClass:"help-item"},[s("h3",[t._v(t._s(t.$t("help.useDocs")))]),t._v(" "),s("p",[t._v(t._s(t.$t("help.docsDesc")))]),t._v(" "),s("a",{attrs:{target:"_blank",href:t.docsLink}},[t._v("\n      "+t._s(t.$t("help.forwardView"))+"\n    ")])]),t._v(" "),s("el-divider"),t._v(" "),s("div",{staticClass:"help-item"},[s("h3",[t._v("FAQ")]),t._v(" "),s("p",[t._v(t._s(t.$t("help.faqDesc")))]),t._v(" "),s("a",{attrs:{target:"_blank",href:t.faqLink}},[t._v("\n      "+t._s(t.$t("help.forwardFaq"))+"\n    ")])]),t._v(" "),s("el-divider"),t._v(" "),s("div",{staticClass:"help-item"},[s("h3",[t._v(t._s(t.$t("help.followUs")))]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://github.com/emqx/emqx"}},[e("i",{staticClass:"iconfont icon-git"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://twitter.com/emqtt"}},[e("i",{staticClass:"iconfont icon-tuite"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://emqx.slack.com/"}},[e("i",{staticClass:"iconfont icon-slack"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://stackoverflow.com/questions/tagged/emq"}},[e("i",{staticClass:"iconfont icon-stack-overflow"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://groups.google.com/forum/#!forum/emqtt"}},[e("i",{staticClass:"iconfont icon-icons-google_groups"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"follow-link",attrs:{target:"_blank",href:"https://www.youtube.com/channel/UCDU9GWFk8NTGiTvPx_2XskA"}},[e("i",{staticClass:"iconfont icon-youtube"})])}]};var i=s("VU/8")(a,n,!1,function(t){s("hgWS")},null,null);e.default=i.exports},hgWS:function(t,e){}});