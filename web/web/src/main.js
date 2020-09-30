import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.js";
import "./plugins/quill.js";
import _ from "lodash";
import fetch from "./utils/fetch";
import ClickOutside from "vue-click-outside";

Vue.prototype._ = _;
Vue.prototype.hostUrl = url => {
  const host =
    process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
  return host + url;
};
Vue.prototype.$fetch = fetch;
Vue.directive("click-outside", ClickOutside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
