import service from "@/utils/http";

const user = {
  login(data) {
    return service.post("/login", {
      account: data.account,
      password: data.password,
    });
  },
  logout(data) {
    return service.post("/logout", { email: data.email });
  },
  vertifyCode(data) {
    return service.post("/vertifyCode", { email: data.email });
  },
  register(data) {
    return service.post("/register", {
      nickName: data.nickName,
      password: data.password,
      email: data.email,
      vertifyCode: data.vertifyCode,
    });
  },
  findPassword(data) {
    return service.post("/findPassword", {
      email: data.email,
      vertifyCode: data.vertifyCode,
      password: data.password,
      passwordAgain: data.passwordAgain,
    });
  },
  reviseUserInfo(data) {
    return service.post("/reviseUserInfo", {
      nickName: data.nickName,
      email: data.email,
      sex: data.sex,
      signature: data.signature,
      password: data.password,
    });
  },
  avatar(data) {
    return service({
      method: "post",
      url: "/avatar",
      data: data.formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { email: data.email },
    });
  },
  getAvatar(data) {
    return service.post("/getAvatar", { account: data.account });
  },
  addUserDownload() {
    const email = JSON.parse(localStorage.getItem("user")).email;
    return service.post("/addUserDownload", { email });
  },
  // ...其它
};

export default user;
