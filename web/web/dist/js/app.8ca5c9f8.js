(function(e){function t(t){for(var r,a,i=t[0],c=t[1],u=t[2],l=0,f=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},s=[];function i(e){return c.p+"js/"+({UserInfo:"UserInfo",about:"about",index:"index",my:"my"}[e]||e)+"."+{UserInfo:"79753042",about:"eacffb22",index:"d1e6e06d",my:"b2212808"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={UserInfo:1,index:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({UserInfo:"UserInfo",about:"about",index:"index",my:"my"}[e]||e)+"."+{UserInfo:"e6d0a060",about:"31d6cfe0",index:"ff5604e9",my:"31d6cfe0"}[e]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){u=f[i],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],p.parentNode.removeChild(p),n(s)},p.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var f=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var p=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1c1e":function(e,t,n){"use strict";n("d3b7");var r=n("8206"),a=n.n(r);t["a"]={get:function(e,t,n){return new Promise((function(r,o){a.a.get(e,{params:t,headers:n}).then((function(e){return r(e.data)})).catch((function(e){return o(e)}))}))},post:function(e,t,n){return new Promise((function(r,o){a.a.post(e,t,{headers:n}).then((function(e){return r(e.data)})).catch((function(e){return o(e)}))}))}}},4140:function(e,t,n){e.exports=n.p+"img/avatar.92bc827e.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Header"),n("router-view")],1)},o=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("layout",[r("div",{staticClass:"header"},[r("p",{staticClass:"site-name"},[e._v("hhc test")]),r("div",{staticClass:"right"},[r("Menu",{attrs:{mode:"horizontal",theme:"light"}},[r("MenuItem",{attrs:{name:1,to:"/index"}},[r("span",[e._v("首页")])]),r("MenuItem",{attrs:{name:2,to:"/about"}},[r("span",[e._v("关于")])]),r("MenuItem",{attrs:{name:3,to:"/my"}},[r("span",[e._v("我的")])])],1),r("div",{staticClass:"user-info"},[e.userInfo?[e.userInfo.avatar?r("img",{attrs:{src:e.imgUrl(e.userInfo.avatar)}}):r("img",{attrs:{src:n("4140")}}),r("Dropdown",{attrs:{placement:"bottom-end"}},[r("span",[e._v(e._s(e.userInfo.userName))]),r("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[r("DropdownItem",{nativeOn:{click:function(t){return e.$router.push("/user_info")}}},[e._v("我的")]),r("DropdownItem",{nativeOn:{click:function(t){return e.handleLogout(t)}}},[e._v("注销")])],1)],1)]:[r("span",{staticClass:"register",on:{click:function(t){e.showRegisterModal=!0}}},[e._v("注册/登录")])]],2)],1)]),r("h-modal",{model:{value:e.showRegisterModal,callback:function(t){e.showRegisterModal=t},expression:"showRegisterModal"}},[r("div",{staticClass:"register-wrap"},[r("div",{staticClass:"header"},[r("span",{staticClass:"title"},[e._v(e._s(e.titleText))]),r("Icon",{attrs:{type:"md-close",size:"18"},on:{click:function(t){e.showRegisterModal=!1}}})],1),"login"===e.currentType?r("div",{staticClass:"input-wrap"},[r("div",{staticClass:"title"},[e._v("邮箱")]),r("Input",{attrs:{prefix:"ios-mail-outline",placeholder:"请输入邮箱"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),r("div",{staticClass:"title"},[e._v("密码")]),r("Input",{attrs:{prefix:"ios-lock-outline",placeholder:"请输入密码",type:"password",password:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e.warnText?r("p",{staticClass:"warn-text"},[e._v(e._s(e.warnText))]):e._e(),r("Button",{staticClass:"btn",attrs:{long:"",type:"primary"},on:{click:e.handleLogin}},[e._v("登录")]),r("div",{staticClass:"forget-wrap"},[r("p",{on:{click:function(t){e.currentType="register"}}},[e._v("去注册")]),r("p",{on:{click:function(t){e.currentType="reset"}}},[e._v("忘记密码")])])],1):e._e(),"reset"===e.currentType?r("div",{staticClass:"input-wrap"},[r("div",{staticClass:"title"},[e._v("邮箱")]),r("Input",{attrs:{prefix:"ios-mail-outline",placeholder:"请输入邮箱"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),r("div",{staticClass:"title"},[e._v("验证码")]),r("div",{staticClass:"reset-wrap"},[r("Input",{staticStyle:{flex:"1"},attrs:{prefix:"ios-keypad-outline",placeholder:"请输入验证码",maxlength:"4"},model:{value:e.form.resetKey,callback:function(t){e.$set(e.form,"resetKey",t)},expression:"form.resetKey"}}),r("Button",{staticStyle:{"margin-left":"15px"},attrs:{disabled:e.isGetResetKeyDisabled},on:{click:e.getResetKey}},[e._v(e._s(e.getResetKeyText))])],1),r("div",{staticClass:"title"},[e._v("新密码")]),r("Input",{attrs:{prefix:"ios-lock-outline",placeholder:"请输入新密码",type:"password",password:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e.warnText?r("p",{staticClass:"warn-text"},[e._v(e._s(e.warnText))]):e._e(),r("Button",{staticClass:"btn",attrs:{long:"",type:"primary"},on:{click:e.handleReset}},[e._v("重置密码")]),r("div",{staticClass:"has-account"},[r("p",{on:{click:function(t){e.currentType="login"}}},[e._v("已有账号，去登陆")])])],1):e._e(),"register"===e.currentType?r("div",{staticClass:"input-wrap"},[r("div",{staticClass:"title"},[e._v("邮箱")]),r("Input",{attrs:{prefix:"ios-mail-outline",placeholder:"用于登录和找回密码"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),r("div",{staticClass:"title"},[e._v("用户名")]),r("Input",{attrs:{prefix:"ios-person-outline",placeholder:"用户名/8位以下"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}}),r("div",{staticClass:"title"},[e._v("密码")]),r("Input",{attrs:{prefix:"ios-lock-outline",placeholder:"密码/8~20位",type:"password",password:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e.warnText?r("p",{staticClass:"warn-text"},[e._v(e._s(e.warnText))]):e._e(),r("Button",{staticClass:"btn",attrs:{long:"",type:"primary"},on:{click:e.handleRegister}},[e._v("注册")]),r("div",{staticClass:"has-account"},[r("p",{on:{click:function(t){e.currentType="login"}}},[e._v("已有账号，去登陆")])])],1):e._e()])])],1)},i=[],c=(n("ac1f"),n("5319"),n("96cf"),n("1da1")),u=n("5530"),l=n("e79d"),f=n("90b2"),p=n("c5c1"),d=n("e3f5"),m=n("beb5"),h=n("5250"),v=n("78a0"),g=n("5c16"),w=n("8679"),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"h-modal"}},[e.isShow?n("div",{staticClass:"h-modal-wrap",style:{transition:e.transitionValue,zIndex:1e3+e.zIndexOffset},on:{click:function(t){return t.target!==t.currentTarget?null:e.closeModal(t)},touchmove:e.handleScroll}},[n("div",{staticClass:"h-modal-content",style:{transition:e.transitionValue}},[e._t("default")],2)]):e._e()])},b=[],x=(n("a9e3"),{name:"hModal",props:{value:{type:Boolean},time:{type:Number,default:function(){return 250}},hideOnBlur:{type:Boolean,default:function(){return!0}},disableScroll:{type:Boolean,default:function(){return!1}},zIndexOffset:{type:Number,default:function(){return 0}}},data:function(){return{isShow:this.value}},computed:{transitionValue:function(){return"all ".concat(this.time/1e3,"s ease")}},watch:{value:function(e){this.isShow=e},isShow:function(e){this.$emit("input",e),e?this.$emit("on-show"):this.$emit("on-hide")}},methods:{closeModal:function(){this.hideOnBlur&&(this.isShow=!1)},handleScroll:function(e){this.disableScroll&&(console.log("prevent scroll"),e.preventDefault())}}}),_=x,I=(n("c1d1"),n("2877")),k=Object(I["a"])(_,y,b,!1,null,"bc025be2",null),T=k.exports,C=n("1c1e"),R=n("2f62"),O={name:"Header",components:{Layout:w["a"],Menu:g["a"],MenuItem:v["a"],hModal:T,Icon:h["a"],Input:m["a"],Button:d["a"],Dropdown:p["a"],DropdownMenu:f["a"],DropdownItem:l["a"]},data:function(){return{showRegisterModal:!1,currentType:"register",form:{email:"",userName:"",password:"",resetKey:""},warnText:"",getResetKeyPending:!1,getResetKeyText:"获取验证码"}},created:function(){this.getUserInfo()},computed:Object(u["a"])(Object(u["a"])({},Object(R["c"])({userInfo:function(e){return e.userInfo}})),{},{isGetResetKeyDisabled:function(){return this.getResetKeyPending||!this.form.email||"已发送"===this.getResetKeyText},titleText:function(){return{register:"注册",login:"登录",reset:"找回密码"}[this.currentType]}}),methods:Object(u["a"])(Object(u["a"])({},Object(R["b"])({getUserInfo:"getUserInfo",logout:"logout"})),{},{handleRegister:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.warnText="",t.next=3,C["a"].post("/api/user/register",e.form);case 3:n=t.sent,0===n.error_code?(e.showRegisterModal=null,e.getUserInfo()):e.warnText=n.error_msg;case 5:case"end":return t.stop()}}),t)})))()},handleLogin:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.warnText="",t.next=3,C["a"].post("/api/user/login",e.form);case 3:n=t.sent,0===n.error_code?(e.showRegisterModal=null,e.getUserInfo()):e.warnText=n.error_msg;case 5:case"end":return t.stop()}}),t)})))()},getResetKey:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.warnText="",e.getResetKeyPending=!0,t.next=4,C["a"].post("/api/user/get_reset_key",{email:e.form.email});case 4:n=t.sent,e.getResetKeyPending=!1,0===n.error_code?e.getResetKeyText="已发送":e.warnText=n.error_msg;case 7:case"end":return t.stop()}}),t)})))()},handleReset:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C["a"].post("/api/user/reset_password",e.form);case 2:n=t.sent,0===n.error_code?(e.currentType="login",e.$Message.success("重置成功")):e.warnText=n.error_msg;case 4:case"end":return t.stop()}}),t)})))()},imgUrl:function(e){var t="";return t+e},handleLogout:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.logout();case 2:n=t.sent,0===n.error_code&&(e.$Message.success("注销成功"),e.$router.replace("/index"));case 4:case"end":return t.stop()}}),t)})))()}}),watch:{currentType:function(){this.warnText=""}}},j=O,M=(n("f160"),Object(I["a"])(j,s,i,!1,null,"7f120979",null)),S=M.exports,U={name:"app",components:{Header:S},data:function(){return{}},created:function(){}},$=U,K=(n("a44d"),Object(I["a"])($,a,o,!1,null,"074ccb6a",null)),P=K.exports,B=(n("d3b7"),n("8c4f")),D=function(){return n.e("index").then(n.bind(null,"4a55"))},E=function(){return n.e("about").then(n.bind(null,"844c"))},N=function(){return n.e("my").then(n.bind(null,"0958"))},L=function(){return n.e("UserInfo").then(n.bind(null,"0073"))};r["a"].use(B["a"]);var A=[{path:"/",redirect:"/index"},{path:"/index",name:"index",component:D},{path:"/about",nae:"about",component:E},{path:"/my",name:"my",component:N},{path:"/user_info",name:"UserInfo",component:L}],z=new B["a"]({routes:A}),H=z;r["a"].use(R["a"]);var V=new R["a"].Store({state:{userInfo:null},mutations:{setUserInfo:function(e,t){e.userInfo=t}},actions:{getUserInfo:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,C["a"].get("/api/user/get");case 3:r=t.sent,0===r.error_code&&n("setUserInfo",r.data);case 5:case"end":return t.stop()}}),t)})))()},logout:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,C["a"].post("/api/user/logout");case 3:return r=t.sent,0===r.error_code&&n("setUserInfo",null),t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)})))()}},modules:{}}),q=n("aa30");n("f8ce");r["a"].component("Button",d["a"]),r["a"].prototype.$Message=q["a"];var G=n("2ef0"),J=n.n(G);r["a"].prototype._=J.a,r["a"].config.productionTip=!1,new r["a"]({router:H,store:V,render:function(e){return e(P)}}).$mount("#app")},a44d:function(e,t,n){"use strict";var r=n("fcf3"),a=n.n(r);a.a},a608:function(e,t,n){},c1d1:function(e,t,n){"use strict";var r=n("db3e"),a=n.n(r);a.a},db3e:function(e,t,n){},f160:function(e,t,n){"use strict";var r=n("a608"),a=n.n(r);a.a},fcf3:function(e,t,n){}});
//# sourceMappingURL=app.8ca5c9f8.js.map