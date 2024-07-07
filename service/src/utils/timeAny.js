function timeAny(index) {
  var timenow = new Date();
  timenow.setDate(timenow.getDate() - index); //设置天数 -1 天，昨天的日期
  var y = timenow.getFullYear(); //年
  var m = timenow.getMonth() + 1; //月
  // m = m < 10 ? "0" + m : m;
  var d = timenow.getDate(); //日
  // d = d < 10 ? "0" + d : d;
  var yesterdayTime = y + "-" + m + "-" + d; //字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
  return yesterdayTime;
}

export default timeAny;
