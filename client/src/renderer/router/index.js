import Vue from "vue";
import VueRouter from "vue-router";
import { Loading } from "element-ui";
import routes from "./routes";
import store from "../store";

let loadingInstance;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
  loadingInstance = Loading.service({
    lock: true,
    text: "加载中...",
    spinner: "el-icon-loading",
  });
  if (!to.meta.middleware) next();
  const { middleware } = to.meta;
  const context = {
    to,
    from,
    next,
    store,
  };
  if (middleware) {
    middleware.forEach((middlewareItem) => middlewareItem(context));
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
  loadingInstance.close();
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
