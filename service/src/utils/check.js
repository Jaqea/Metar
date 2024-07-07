const jwt = require("jsonwebtoken");

async function check(ctx, next) {
  let url = ctx.request.url;
  // 登录 不用检查
  if (
    url == "/login" ||
    url == "/register" ||
    url == "/findPassword" ||
    url == "/vertifyCode" ||
    url == "/getAvatar" ||
    url == "/logout"
  )
    await next();
  else {
    // 规定token写在header 的 'autohrization'
    let token = ctx.request.headers["authorization"];
    // 解码
    let payload = await jwt.decode(token, "shhhhh");
    let { time, timeout } = payload;
    let data = new Date().getTime();
    if (data - time <= timeout) {
      // 未过期
      await next();
    } else {
      //过期
      ctx.response.body = {
        status: 401,
        message: "用户登陆已超时，请重新登陆！",
      };
    }
  }
}

module.exports = check;
