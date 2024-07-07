import Vue from "vue";

async function downloadFile(href, title) {
  try {
    const a = document.createElement("a");
    a.setAttribute("href", href);
    a.setAttribute("download", title);
    a.click();
    Vue.prototype.$Message.success("下载成功！");
  } catch (e) {
    console.log(e);
    Vue.prototype.$Message.error("下载失败！");
  }
}

export default downloadFile;
