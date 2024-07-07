import jwt from "jsonwebtoken";
import LoginUrls from "../routes/user";
import MongoDB from "../db";
import sendEmail from "./sendEmail";
import { putAvatarStream } from "../utils/oss";
import getNowTime from "../utils/getNowTime";
const check = {}; //声明一个对象缓存邮箱和验证码，留着

async function vertifyCode(ctx) {
  const email = ctx.request.body.email;
  const code = Math.random().toFixed(6).slice(-6);
  check[email] = code;
  if (!email)
    return (ctx.body = {
      message: "参数错误，请稍后再试",
      status: 500,
    });
  async function timeout() {
    return new Promise((resolve, reject) => {
      sendEmail(email, code, (state) => {
        resolve(state);
      });
    });
  }
  await timeout().then((state) => {
    if (state) {
      ctx.response.body = {
        message: "邮箱发送成功，请查看验证码！",
        status: 200,
      };
      return true;
    } else {
      ctx.response.body = {
        message: "邮箱发送失败，请稍后重新发送!",
        status: 401,
      };
      return false;
    }
  });
}

async function login(ctx) {
  let user = ctx.request.body;
  user.timeout = 1000 * 60 * 60 * 2; //多长时间后过期
  user.time = new Date().getTime();
  const token = jwt.sign(user, "shhhhh");
  await MongoDB.findAccount(user).then((res) => {
    if (res.length != 0) {
      let result = { ...res[0]._doc };
      delete result.password;
      delete result._id;
      MongoDB.modifyLastLogin({ email: result.email, last_login: getNowTime() });
      ctx.response.body = {
        message: "登录成功",
        token,
        status: 200,
        user: result,
      };
    } else
      ctx.response.body = {
        message: "账号或密码错误",
        status: 401,
      };
  });
}

async function logout(ctx) {
  check[ctx.request.body.email] = "";
  ctx.response.body = {
    message: "成功退出！",
    status: 200,
  };
}
async function register(ctx) {
  const newUser = ctx.request.body;
  if (newUser.vertifyCode !== check[newUser.email])
    ctx.response.body = {
      message: "注册失败，验证码失效",
      status: 401,
    };
  else {
    let hasEmail;
    await MongoDB.findEmail(newUser.email).then((res) => {
      hasEmail = res.length !== 0 ? true : false;
    });
    if (hasEmail)
      ctx.response.body = {
        message: "该邮箱已经注册过！",
        status: 401,
      };
    else {
      const account = Math.random().toFixed(10).slice(-10);
      newUser.account = account;
      await MongoDB.createUser(newUser);
      ctx.response.body = {
        message: "注册成功！",
        account,
        status: 200,
      };
    }
  }
}
async function findPassword(ctx) {
  const user = ctx.request.body;
  if (user.vertifyCode !== check[user.email])
    ctx.response.body = {
      message: "修改失败，验证码失效",
      status: 401,
    };
  else {
    let hasEmail;
    await MongoDB.findEmail(user.email).then((res) => {
      hasEmail = res.length !== 0 ? false : true;
    });
    if (hasEmail)
      ctx.response.body = {
        message: "修改失败，该邮箱不存在！",
        status: 401,
      };
    else {
      await MongoDB.modifyPwd(user)
        .then(() => {
          ctx.response.body = {
            message: "修改成功！",
            status: 200,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

async function reviseUserInfo(ctx) {
  const user = ctx.request.body;
  if (user.password)
    await MongoDB.modifyPwd(user)
      .then(() => {
        ctx.response.body = {
          message: "密码修改成功！",
          status: 200,
        };
      })
      .catch((error) => {
        ctx.response.body = {
          message: "密码修改失败！",
          status: 401,
        };
        console.log(error);
      });
  await MongoDB.modifyUserInfo(user)
    .then(() => {
      ctx.response.body = {
        message: "用户信息修改成功！",
        status: 200,
        user,
      };
    })
    .catch((error) => {
      ctx.response.body = {
        message: "用户信息修改失败！",
        status: 401,
      };
      console.log(error);
    });
}
async function avatar(ctx) {
  const avatar = ctx.request.files.avatar;
  const email = ctx.request.query.email;
  let imageUrl = await putAvatarStream(avatar.path, email, avatar.name);
  await MongoDB.modifyAvatar({ email, imageUrl })
    .then(() => {
      ctx.response.body = {
        message: "头像修改成功！",
        status: 200,
        imageUrl,
      };
    })
    .catch((error) => {
      console.log(error);
      ctx.response.body = {
        message: "头像修改失败！请稍后再试",
        status: 401,
      };
    });
}

async function getAvatar(ctx) {
  const account = ctx.request.body.account;
  const res = await MongoDB.findAvatar(account);
  if (res.length != 0)
    ctx.response.body = {
      message: "获取头像成功！",
      status: 200,
      imageUrl: res[0].imageUrl,
    };
  else
    ctx.response.body = {
      message: "获取头像失败！",
      status: 401,
    };
}

const loginMathods = [
  login,
  register,
  findPassword,
  vertifyCode,
  logout,
  reviseUserInfo,
  avatar,
  getAvatar,
];
const loginMap = {};

LoginUrls.forEach((item, index) => {
  loginMap[item] = loginMathods[index];
});

module.exports = loginMap;
