function getNowTime() {
  let dateTime;
  const yy = new Date().getFullYear();
  const mm = new Date().getMonth() + 1;
  const dd = new Date().getDate();
  const hh = new Date().getHours();
  const mf = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
  const ss = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();
  // eslint-disable-next-line prefer-const
  dateTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
  console.log(dateTime);
  return dateTime;
}

export default getNowTime;
