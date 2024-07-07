import Vue from "vue";

export default function auth({ next, store }) {
  if (!store.getters["user/isLogin"]) {
    Vue.prototype.$electron.ipcRenderer.send("openLogin");
    return next({
      name: "Login",
    });
  }

  return next();
}
