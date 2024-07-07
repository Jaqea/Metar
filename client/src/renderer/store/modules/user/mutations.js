import Vue from "vue";

const mutations = {
  login(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload.user));
    localStorage.setItem("token", payload.token);
    localStorage.setItem("isLogin", true);
    setTimeout(() => {
      Vue.prototype.$electron.ipcRenderer.send("openHome");
    }, 2000);
  },
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    setTimeout(() => {
      Vue.prototype.$electron.ipcRenderer.send("openLogin");
    }, 2000);
  },
  vertifyCode() {},
  register(state, payload) {
    state.account = payload.account;
  },
  findPassword(state, payload) {
    console.log(payload);
    // state.demo = payload;
  },
  created(state) {
    const user = { ...JSON.parse(localStorage.getItem("user")) };
    state.user = user;
  },
  reviseUserInfo(state, payload) {
    const user = { ...JSON.parse(localStorage.getItem("user")) };
    user.nickName = payload.user.nickName;
    user.sex = payload.user.sex;
    user.signature = payload.user.signature;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  avatar(state, payload) {
    if (payload.email === JSON.parse(localStorage.getItem("user")).email) {
      const user = { ...JSON.parse(localStorage.getItem("user")) };
      user.imageUrl = payload.imageUrl;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    }
  },
  getAvatar(state, payload) {
    localStorage.setItem("imageUrl", payload.imageUrl);
    state.imageUrl = payload.imageUrl;
  },
  deleteImageUrl(state) {
    localStorage.removeItem("imageUrl");
    state.imageUrl = "";
  },
  addUserDownload(state) {
    const user = { ...JSON.parse(localStorage.getItem("user")) };
    user.download += 1;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
};

export default mutations;
