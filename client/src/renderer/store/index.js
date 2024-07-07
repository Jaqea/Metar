import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import home from "./modules/home";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    isLogin: true,
    isRequest: false,
  },
  getters: {
    isLogin: (state) => state.isLogin,
    isRequest: (state) => state.isRequest,
  },
  mutations: {
    set_isRequest(state) {
      state.isRequest = !state.isRequest;
    },
  },
  actions: {},
  modules: {
    user,
    home,
  },
});

export default store;
