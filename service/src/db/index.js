import userModel from "../models/user";
import dataModel from "../models/data";
import announceModel from "../models/announce";
import userDataModel from "../models/userData";
import getNowTime from "../utils/getNowTime";

class Mongodb {
  constructor() {}
  //user
  modifyLastLogin(user) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            last_login: user.last_login,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  createUser(newUser) {
    return new Promise((resolve, reject) => {
      const last_register = getNowTime();
      userModel.create(
        {
          account: newUser.account,
          nickName: newUser.nickName,
          email: newUser.email,
          imageUrl: "https://werther-oss.oss-cn-beijing.aliyuncs.com/avatar/default.png",
          last_login: "未登录过",
          last_register,
          download: 0,
          sex: newUser.sex ? newUser.sex : "",
          signature: "",
          password: newUser.password,
          type: "user",
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  deleteUser(email) {
    return new Promise((resolve, reject) => {
      userModel.deleteOne(
        {
          email,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findUser(nickName) {
    return new Promise((resolve, reject) => {
      userModel.find(
        {
          nickName,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findEmail(email) {
    return new Promise((resolve, reject) => {
      userModel.find({ email }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  modifyPwd(user) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            password: user.password,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findAccount(user) {
    return new Promise((resolve, reject) => {
      userModel.find({ account: user.account, password: user.password }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  modifyAvatar(user) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            imageUrl: user.imageUrl,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  modifyUserInfo(user) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            nickName: user.nickName,
            sex: user.sex,
            signature: user.signature,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findAvatar(account) {
    return new Promise((resolve, reject) => {
      userModel.find({ account }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  //home
  findAllUser() {
    return new Promise((resolve, reject) => {
      userModel.find({}, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  reviseUser(user) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { account: user.account },
        {
          $set: {
            nickName: user.nickName,
            password: user.password,
            email: user.email,
            sex: user.sex,
            signature: user.signature,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  //data
  findAllData() {
    return new Promise((resolve, reject) => {
      dataModel.find({}, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  deleteData(id) {
    return new Promise((resolve, reject) => {
      dataModel.deleteOne(
        {
          _id: id,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findData(name) {
    return new Promise((resolve, reject) => {
      dataModel.find(
        {
          name,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findDataId(id) {
    return new Promise((resolve, reject) => {
      dataModel.find(
        {
          _id: id,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  createData(data) {
    return new Promise((resolve, reject) => {
      const time = getNowTime();
      dataModel.create(
        {
          name: data.name,
          size: data.size,
          type: data.type,
          introduction: data.introduction,
          content: data.content,
          time,
          download: 0,
          author: data.author,
          url: "",
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  reviseData(data) {
    return new Promise((resolve, reject) => {
      dataModel.findOneAndUpdate(
        { _id: data._id },
        {
          $set: {
            name: data.name,
            type: data.type,
            size: data.size,
            introduction: data.introduction,
            content: data.content,
            author: data.author,
            url: data.url ? data.url : "",
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  modifyData(data) {
    return new Promise((resolve, reject) => {
      dataModel.findOneAndUpdate(
        { _id: data.id },
        {
          $set: {
            url: data.dataUrl,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  //announce
  findAllAnnounce() {
    return new Promise((resolve, reject) => {
      announceModel.find({}, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  deleteAnnounce(id) {
    return new Promise((resolve, reject) => {
      announceModel.deleteOne(
        {
          _id: id,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findAnnounce(name) {
    return new Promise((resolve, reject) => {
      announceModel.find(
        {
          title: name,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findAnnounceId(id) {
    return new Promise((resolve, reject) => {
      announceModel.find(
        {
          _id: id,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  createAnnounce(data) {
    return new Promise((resolve, reject) => {
      const time = getNowTime();
      announceModel.create(
        {
          title: data.title,
          last_upload: time,
          watchers: data.watchers ? data.watchers : 0,
          introduction: data.introduction,
          content: data.content,
          author: data.author,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  reviseAnnounce(data) {
    return new Promise((resolve, reject) => {
      const time = getNowTime();
      announceModel.findOneAndUpdate(
        { _id: data._id },
        {
          $set: {
            title: data.title,
            last_upload: time,
            watchers: data.watchers,
            introduction: data.introduction,
            content: data.content,
            author: data.author,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  //other
  addDownload(id, download) {
    return new Promise((resolve, reject) => {
      dataModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            download: download + 1,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  addWatchers(id, watchers) {
    return new Promise((resolve, reject) => {
      announceModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            watchers: watchers + 1,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }

  createUserData(userData) {
    return new Promise((resolve, reject) => {
      const time = getNowTime();
      userDataModel.create(
        {
          name: userData.name,
          size: userData.size,
          type: userData.type,
          introduction: userData.introduction,
          content: userData.content,
          download: userData.download,
          author: userData.author,
          email: userData.email,
          last_download: time,
          url: userData.url,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findAllUserData() {
    return new Promise((resolve, reject) => {
      userDataModel.find({}, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  findEmailUserData(email) {
    return new Promise((resolve, reject) => {
      userDataModel.find({ email }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  // other
  findNowData(nowTime) {
    return new Promise((resolve, reject) => {
      const re = new RegExp(`^.*${nowTime}.*$`);
      dataModel.find(
        {
          time: re,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findNowUserData(nowTime) {
    return new Promise((resolve, reject) => {
      const re = new RegExp(`^.*${nowTime}.*$`);
      userDataModel.find(
        {
          last_download: re,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  findNowAnnounce(nowTime) {
    return new Promise((resolve, reject) => {
      const re = new RegExp(`^.*${nowTime}.*$`);
      announceModel.find(
        {
          last_upload: re,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  addUserDownload(email, download) {
    return new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { email },
        {
          $set: {
            download: download + 1,
          },
        },
        {},
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
}

module.exports = new Mongodb();
