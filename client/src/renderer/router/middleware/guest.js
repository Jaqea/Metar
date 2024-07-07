import Vue from "vue";

export default function guest({ next, store }) {
  if (store.getters["user/isLogin"]) {
    Vue.prototype.$electron.ipcRenderer.send("openHome");
    return next({
      name: "Home",
    });
  }
  return next();
}
