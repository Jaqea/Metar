function timeNow() {
  var timenow = new Date();
  var y = timenow.getFullYear(); //年
  var m = timenow.getMonth() + 1; //月
  // m = m < 10 ? "0" + m : m;
  var d = timenow.getDate(); //日
  // d = d < 10 ? "0" + d : d;
  var time = y + "-" + m + "-" + d; //字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
  return time;
}

export default timeNow;
