import axios from "axios";
import nprogress from "nprogress";
import Vue from "vue";

const BASEURL = require("api/base");

const service = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
service.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : BASEURL.production;

// 请求拦截器
const request = (config) => {
  nprogress.start();
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
  if (token) config.headers.Authorization = token;
  return config;
};

const requestErr = (err) => {
  nprogress.start();
  console.log(err);
  Vue.prototype.$Message.error(err);
  return Promise.error(err);
};

// 响应拦截器
const response = (res) => {
  nprogress.done();
  if (res.data.status === 200) {
    if (res.data.message) Vue.prototype.$Message.success(res.data.message);
    return Promise.resolve(res);
  }
  Vue.prototype.$Message.error(res.data.message);
  //   return Promise.reject(res);
};

const responseErr = (err) => {
  nprogress.done();
  if (err.data.message) Vue.prototype.$Message.error(err.data.message);
  if (err.status) {
    switch (err.status) {
      case 401: // 未登录
        break;
      case 403: // token 过期
        break;
      case 404: // 请求不存在
        break;
      default:
        break;
    }
  }
  return Promise.reject(err);
};

service.interceptors.request.use(request, requestErr);
service.interceptors.response.use(response, responseErr);

export default service;
