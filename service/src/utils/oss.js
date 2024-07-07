import OSS from "ali-oss";
import fs from "fs";
import config from "../config";

const client = new OSS({
  ...config.oss,
});

async function putAvatarStream(path, email, name) {
  // 使用'chunked encoding'。使用putStream接口时，SDK默认会发起一个'chunked encoding'的HTTP PUT请求。
  // 填写本地文件的完整路径，从本地文件中读取数据流。
  // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
  let stream = fs.createReadStream(path);
  // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
  const res = await client.list({ prefix: "avatar/" + email + "/", delimiter: "/" });
  res.objects.forEach((item) => {
    client.delete(item.name);
  });
  let result = await client.putStream("avatar/" + email + "/" + name, stream);
  return result.url;
}

async function putDataStream(path, id, name) {
  let stream = fs.createReadStream(path);
  // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
  const res = await client.list({ prefix: "data/" + id + "/", delimiter: "/" });
  res.objects.forEach((item) => {
    client.delete(item.name);
  });
  let result = await client.putStream("data/" + id + "/" + name, stream);
  return result.url;
}

async function putAnnounceStream(pathList, id, nameList) {
  // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
  const res = await client.list({ prefix: "announce/" + id + "/", delimiter: "/" });
  res.objects.forEach((item) => {
    client.delete(item.name);
  });
  let urls = [];
  for (let i = 0; i < pathList.length; i++) {
    let stream = fs.createReadStream(pathList[i]);
    let result = await client.putStream(
      "announce/" + id + "/" + nameList[i][nameList[i].length - 1],
      stream
    );
    urls.push(result.url);
  }
  return urls;
}

async function createAnnounceStream(pathList, id, nameList) {
  let urls = [];
  for (let i = 0; i < pathList.length; i++) {
    let stream = fs.createReadStream(pathList[i]);
    let result = await client.putStream(
      "announce/" + id + "/" + nameList[i][nameList[i].length - 1],
      stream
    );
    urls.push(result.url);
  }
  return urls;
}

export { putAvatarStream, putDataStream, putAnnounceStream, createAnnounceStream };
