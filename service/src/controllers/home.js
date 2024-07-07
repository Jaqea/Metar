import homeUrls from "../routes/home";
import MongoDB from "../db";
import { putDataStream, putAnnounceStream, createAnnounceStream } from "../utils/oss";
import getImgUrl from "../utils/getImgUrl";
import timeNow from "../utils/timeNow";
import timeAny from "../utils/timeAny";
const check = {}; //声明一个对象缓存邮箱和验证码，留着

// home
async function home(ctx) {
  // dashbordList
  const now = timeNow();
  const nowData = await MongoDB.findNowData(now);
  const nowUserData = await MongoDB.findNowUserData(now);
  const nowAnnounce = await MongoDB.findNowAnnounce(now);
  const data = await MongoDB.findAllData();
  const announce = await MongoDB.findAllAnnounce();
  const userData = await MongoDB.findAllUserData();

  let varietyData, dataColor, dataIcon;
  if (nowData.length === 0) {
    varietyData = 0;
    dataColor = "equal";
    dataIcon = "icon icon-minus";
  } else if (nowData.length > 0) {
    varietyData = (nowData.length / (data.length - nowData.length)).toFixed(2);
    dataColor = "up";
    dataIcon = "icon icon-trending-up";
  }

  let varietyAnnounce, announceColor, announceIcon;
  if (nowAnnounce.length === 0) {
    varietyAnnounce = 0;
    announceColor = "equal";
    announceIcon = "icon icon-minus";
  } else if (nowAnnounce.length > 0) {
    varietyAnnounce = (nowAnnounce.length / (announce.length - nowAnnounce.length)).toFixed(2);
    announceColor = "up";
    announceIcon = "icon icon-trending-up";
  }

  let varietyUserData, userDataColor, userDataIcon;
  if (nowUserData.length === 0) {
    varietyUserData = 0;
    userDataColor = "equal";
    userDataIcon = "icon icon-minus";
  } else if (nowUserData.length > 0) {
    varietyUserData = (nowUserData.length / (userData.length - nowUserData.length)).toFixed(2);
    userDataColor = "up";
    userDataIcon = "icon icon-trending-up";
  }

  // imgs
  let imgList = [];
  async function getImgs(index) {
    let time;
    if (index === 0) time = timeNow();
    else time = timeAny(index);
    const announces = await MongoDB.findNowAnnounce(time);
    announces.forEach((item) => {
      const imgs = getImgUrl(item.content);
      imgs.forEach((element) => {
        if (imgList.length === 5) return;
        imgList.push(element);
      });
    });
    if (imgList.length < 5) getImgs(index + 1);
  }
  await getImgs(0);
  // charts
  let dates = [now];
  let userDatas = [],
    datas = [],
    announces = [];
  for (let i = 0; i < 6; i++) {
    dates.push(timeAny(i + 1));
  }
  const years = dates[0].slice(0, 4);
  for (let i = 0; i < 7; i++) {
    userDatas.push((await MongoDB.findNowUserData(dates[i])).length);
    datas.push((await MongoDB.findNowData(dates[i])).length);
    announces.push((await MongoDB.findNowAnnounce(dates[i])).length);
    dates[i] = dates[i].substring(5);
  }
  dates = dates.reverse();
  userDatas = userDatas.reverse();
  datas = datas.reverse();
  announces = announces.reverse();
  ctx.response.body = {
    message: "成功获取实时数据！",
    status: 200,
    data: {
      dashbordList: [
        {
          title: "气象数据下载量",
          number: userData.length,
          color: userDataColor,
          iconClass: userDataIcon,
          variety: `${varietyUserData * 100}%`,
        },
        {
          title: "气象数据总量",
          number: data.length,
          color: dataColor,
          iconClass: dataIcon,
          variety: `${varietyData * 100}%`,
        },
        {
          title: "气象公告总量",
          number: announce.length,
          color: announceColor,
          iconClass: announceIcon,
          variety: `${varietyAnnounce * 100}%`,
        },
      ],
      years,
      categories: dates,
      series: [
        {
          name: "气象数据下载量",
          type: "line",
          data: userDatas,
        },
        {
          name: "气象数据总量",
          type: "line",
          data: datas,
        },
        {
          name: "气象公告总量",
          type: "line",
          data: announces,
        },
      ],
      imgList,
    },
  };
}
async function addDownload(ctx) {
  const id = ctx.request.body.id;
  const data = await MongoDB.findDataId(id);
  if (data.length) await MongoDB.addDownload(id, data[0].download);
  ctx.response.body = {
    message: "",
    status: 200,
  };
}
async function addWatchers(ctx) {
  const id = ctx.request.body.id;
  const announce = await MongoDB.findAnnounceId(id);
  await MongoDB.addWatchers(id, announce[0].watchers);
  ctx.response.body = {
    message: "",
    status: 200,
  };
}
async function addUserDownload(ctx) {
  const email = ctx.request.body.email;
  const data = await MongoDB.findEmail(email);
  if (data.length) await MongoDB.addUserDownload(email, data[0].download);
  ctx.response.body = {
    message: "",
    status: 200,
  };
}

// userAdmin
async function getAllUser(ctx) {
  const res = await MongoDB.findAllUser();
  ctx.response.body = {
    message: "成功获取所有用户！",
    status: 200,
    userList: res.reverse(),
  };
}
async function createUser(ctx) {
  const user = ctx.request.body;
  const res = await MongoDB.createUser(user);
  ctx.response.body = {
    message: "成功创建用户！",
    status: 200,
    res,
  };
}
async function deleteUser(ctx) {
  const email = ctx.request.body.email;
  await MongoDB.deleteUser(email)
    .then(() => {
      ctx.response.body = {
        message: "成功删除用户！",
        status: 200,
      };
    })
    .catch(() => {
      ctx.response.body = {
        message: "删除用户失败！",
        status: 401,
      };
    });
}

async function findUser(ctx) {
  const nickName = ctx.request.query.nickName;
  if (nickName)
    await MongoDB.findUser(nickName)
      .then((userList) => {
        ctx.response.body = {
          message: "搜索成功！",
          status: 200,
          userList,
        };
      })
      .catch(() => {
        ctx.response.body = {
          message: "搜索失败！",
          status: 401,
        };
      });
  else {
    const res = await MongoDB.findAllUser();
    ctx.response.body = {
      message: "成功获取所有用户！",
      status: 200,
      userList: res,
    };
  }
}

async function createAccount(ctx) {
  const account = Math.random().toFixed(10).slice(-10);
  ctx.response.body = {
    message: "成功生成账号！",
    status: 200,
    account,
  };
}

async function reviseUser(ctx) {
  const user = ctx.request.body;
  await MongoDB.reviseUser(user);
  ctx.response.body = {
    message: "用户信息修改成功！",
    status: 200,
  };
}

// dataAdmin
async function getAllData(ctx) {
  const res = await MongoDB.findAllData();
  ctx.response.body = {
    message: "成功获取平台所有数据！",
    status: 200,
    dataList: res.reverse(),
  };
}
async function createData(ctx) {
  const data = ctx.request.body;
  const newdataInfo = await MongoDB.createData(data);
  ctx.response.body = {
    message: "成功上传数据！",
    status: 200,
    newdataInfo,
  };
}
async function reviseData(ctx) {
  const data = ctx.request.body;
  await MongoDB.reviseData(data);
  ctx.response.body = {
    message: "数据信息修改成功！",
    status: 200,
  };
}

async function deleteData(ctx) {
  const id = ctx.request.body.id;
  await MongoDB.deleteData(id)
    .then(() => {
      ctx.response.body = {
        message: "成功删除数据！",
        status: 200,
      };
    })
    .catch(() => {
      ctx.response.body = {
        message: "删除数据失败！",
        status: 401,
      };
    });
}

async function findData(ctx) {
  const name = ctx.request.query.name;
  if (name) {
    const dataList = await MongoDB.findData(name);
    if (dataList.length)
      ctx.response.body = {
        message: "搜索成功！",
        status: 200,
        dataList,
      };
    else
      ctx.response.body = {
        message: "搜索失败！",
        status: 401,
      };
  } else {
    const res = await MongoDB.findAllData();
    ctx.response.body = {
      message: "成功获取平台所有数据！",
      status: 200,
      dataList: res,
    };
  }
}
async function uploadData(ctx) {
  const data = ctx.request.files.data;
  const id = ctx.request.query.id;
  let dataUrl = await putDataStream(data.path, id, data.name);
  await MongoDB.modifyData({ id, dataUrl })
    .then(() => {
      ctx.response.body = {
        message: "数据上传成功！",
        status: 200,
        url: dataUrl,
      };
    })
    .catch((error) => {
      console.log(error);
      ctx.response.body = {
        message: "数据上传失败！请稍后再试",
        status: 401,
      };
    });
}

//announceAdmin
async function getAllAnnounce(ctx) {
  const res = await MongoDB.findAllAnnounce();
  ctx.response.body = {
    message: "成功获取平台所有公告！",
    status: 200,
    announceList: res.reverse(),
  };
}
async function createAnnounce(ctx) {
  const data = ctx.request.body;
  const newAnnounceInfo = await MongoDB.createAnnounce(data);
  let content = newAnnounceInfo.content;
  const imgUrl = getImgUrl(content);
  if (imgUrl.length != 0) {
    let announceUrls = [];
    let urls = [];
    let arr = [];
    for (let i = 0; i < imgUrl.length; i++) {
      const url = imgUrl[i].substr(8).split("/").join("\\");
      urls.push(url);
      arr.push(url.split("\\"));
    }
    announceUrls = await createAnnounceStream(urls, newAnnounceInfo._id, arr);
    announceUrls.forEach((item, index) => {
      content = content.split(imgUrl[index]).join(item);
    });
    newAnnounceInfo.content = content;
  }
  await MongoDB.reviseAnnounce({ ...newAnnounceInfo });
  ctx.response.body = {
    message: "成功发布公告！",
    status: 200,
    newAnnounceInfo,
  };
}
async function reviseAnnounce(ctx) {
  const data = ctx.request.body;
  let content = data.content;
  const imgUrl = getImgUrl(content);
  let newImgUrl = [];
  for (let i = 0; i < imgUrl.length; i++) {
    const index = imgUrl[i].indexOf("http");
    if (index == -1) newImgUrl.push(imgUrl[i]);
  }
  if (newImgUrl.length != 0) {
    let announceUrls = [];
    let urls = [];
    let arr = [];
    for (let i = 0; i < newImgUrl.length; i++) {
      const url = newImgUrl[i].substr(8).split("/").join("\\");
      urls.push(url);
      arr.push(url.split("\\"));
    }
    announceUrls = await putAnnounceStream(urls, data._id, arr);
    announceUrls.forEach((item, index) => {
      content = content.split(imgUrl[index]).join(item);
    });
  }
  data.content = content;
  await MongoDB.reviseAnnounce(data);
  ctx.response.body = {
    message: "公告信息修改成功！",
    status: 200,
  };
}
async function deleteAnnounce(ctx) {
  const id = ctx.request.body.id;
  await MongoDB.deleteAnnounce(id)
    .then(() => {
      ctx.response.body = {
        message: "成功删除公告！",
        status: 200,
      };
    })
    .catch(() => {
      ctx.response.body = {
        message: "删除公告失败！",
        status: 401,
      };
    });
}
async function findAnnounce(ctx) {
  const name = ctx.request.query.name;
  if (name) {
    const announceList = await MongoDB.findAnnounce(name);
    if (announceList.length)
      ctx.response.body = {
        message: "搜索成功！",
        status: 200,
        announceList,
      };
    else
      ctx.response.body = {
        message: "搜索失败！",
        status: 401,
      };
  } else {
    const res = await MongoDB.findAllAnnounce();
    ctx.response.body = {
      message: "成功获取平台所有公告！",
      status: 200,
      announceList: res,
    };
  }
}

//userData
async function createUserData(ctx) {
  const userData = ctx.request.body;
  const newUserDataInfo = await MongoDB.createUserData(userData);
  ctx.response.body = {
    message: "",
    status: 200,
    newUserDataInfo,
  };
}
async function getAllUserData(ctx) {
  const email = ctx.request.query.email;

  const res = await MongoDB.findEmailUserData(email);
  ctx.response.body = {
    message: "成功获取历史下载数据！",
    status: 200,
    userDataList: res.reverse(),
  };
}

const homeMathods = [
  home,
  getAllUser,
  reviseUser,
  createUser,
  createAccount,
  deleteUser,
  findUser,
  getAllData,
  createData,
  deleteData,
  findData,
  reviseData,
  uploadData,
  getAllAnnounce,
  createAnnounce,
  deleteAnnounce,
  findAnnounce,
  reviseAnnounce,
  addDownload,
  addWatchers,
  createUserData,
  getAllUserData,
  addUserDownload,
];
const homeMap = {};

homeUrls.forEach((item, index) => {
  homeMap[item] = homeMathods[index];
});

module.exports = homeMap;
