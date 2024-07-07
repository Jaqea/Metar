import fs from "fs";
const router = require("koa-router")();

function addMapping(mapping, router) {
  for (const url in mapping) {
    if (url.startsWith("GET ")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith("POST ")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
    } else if (url.startsWith("PATCH ")) {
      let path = url.substring(6);
      router.patch(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  var files = fs.readdirSync(__dirname + dir);
  var js_files = files.filter((f) => {
    return f.endsWith(".js");
  });

  for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + dir + "\\" + f);
    addMapping(mapping, router);
  }
}

module.exports = function (dir) {
  let controllers_dir = dir || "/controllers"; // 如果不传参数，扫描目录默认为'controllers'
  addControllers(router, controllers_dir);
  console.log(router.routes());
  return router.routes();
};
