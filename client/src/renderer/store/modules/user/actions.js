import { user } from "api/modules";

const actions = {
  login(context, payload) {
    user.login(payload).then((res) => {
      context.commit("login", res.data);
    });
  },
  logout(context, payload) {
    user.logout({ email: payload }).then(() => {
      context.commit("logout");
    });
  },
  vertifyCode(context, payload) {
    user.vertifyCode(payload).then((res) => {
      context.commit("vertifyCode", res.data);
    });
  },
  register(context, payload) {
    user.register(payload).then((res) => {
      context.commit("register", res.data);
    });
  },
  findPassword(context, payload) {
    user.findPassword(payload).then((res) => {
      context.commit("findPassword", res.data);
    });
  },
  reviseUserInfo(context, payload) {
    user.reviseUserInfo(payload).then((res) => {
      context.commit("reviseUserInfo", res.data);
    });
  },
  avatar(context, payload) {
    user.avatar(payload).then((res) => {
      context.commit("avatar", { email: payload.email, ...res.data });
    });
  },
  getAvatar(context, payload) {
    user.getAvatar(payload).then((res) => {
      context.commit("getAvatar", res.data);
    });
  },
  addUserDownload(context) {
    user.addUserDownload().then(() => {
      context.commit("addUserDownload");
    });
  },
};

export default actions;
