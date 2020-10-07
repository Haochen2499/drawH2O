import Vue from "vue";
import Vuex from "vuex";
import fetch from "@utils/fetch";
import Cookie from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const res = await fetch.get("/api/user/get");
      if (res.error_code === 0) {
        commit("setUserInfo", res.data);
      }
    },
    async logout({ commit }) {
      const res = await fetch.post("/api/user/logout");
      if (res.error_code === 0) {
        commit("setUserInfo", null);
        Cookie.remove("login");
      }
      return res;
    }
  },
  modules: {}
});
