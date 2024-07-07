function setTime(that) {
  if (that.countdown === 0) {
    that.isDisabled = false;
    that.vertify = "重新发送短信验证码";
    that.countdown = 60;
  } else {
    that.isDisabled = true;
    that.vertify = `${that.countdown}秒后重新发送`;
    that.countdown -= 1;
    setTimeout(() => {
      setTime(that);
    }, 1000);
  }
}

export default setTime;
