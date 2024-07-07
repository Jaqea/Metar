<template>
  <div class="login">
    <div class="container">
      <Menu type="Main" />
      <div class="avatar">
        <img
          :src="
            imageUrl
              ? imageUrl
              : 'https://werther-oss.oss-cn-beijing.aliyuncs.com/avatar/default.png'
          "
          alt="avatar"
        />
      </div>
    </div>
    <div class="container">
      <div class="form">
        <el-form :model="loginInfo" ref="loginInfo" :rules="rules" label-width="0">
          <el-form-item label="" prop="account">
            <at-input
              @keyup.native="change"
              size="large"
              v-model="loginInfo.account"
              placeholder="账号"
            >
              <template slot="prepend">
                <i class="icon icon-user"></i>
              </template>
            </at-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <at-input type="password" size="large" v-model="loginInfo.password" placeholder="密码">
              <template slot="prepend">
                <i class="icon icon-lock"></i>
              </template>
            </at-input>
          </el-form-item>
        </el-form>
        <div class="flex flex-between">
          <at-checkbox @on-change="remember" v-model="isRemember">记住密码</at-checkbox>
          <at-button @click="findPwd" type="text">找回密码</at-button>
        </div>
        <at-button @click="submitForm('loginInfo')" type="primary">登录</at-button>
      </div>
      <at-button @click="register" type="text">注册账号</at-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isRemember: localStorage.getItem("isRemember") ? localStorage.getItem("isRemember") : "",
      loginInfo: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 10, max: 10, message: "长度为10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度至少6个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("user", ["imageUrl"]),
  },
  methods: {
    minize() {
      this.$electron.ipcRenderer.send("min");
    },
    closed() {
      this.$electron.ipcRenderer.send("close");
    },
    register() {
      this.$electron.ipcRenderer.send("openRegister");
    },
    findPwd() {
      this.$electron.ipcRenderer.send("openFindPassword");
    },
    remember() {
      if (this.isRemember) {
        localStorage.setItem("password", this.loginInfo.password);
        localStorage.setItem("isRemember", this.isRemember);
      } else {
        localStorage.removeItem("password");
        localStorage.removeItem("isRemember");
      }
    },
    submitForm(formName) {
      if (this.isRemember) {
        localStorage.setItem("password", this.loginInfo.password);
        localStorage.setItem("isRemember", this.isRemember);
      } else {
        localStorage.removeItem("password");
        localStorage.removeItem("isRemember");
      }
      localStorage.setItem("account", this.loginInfo.account);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login", this.loginInfo);
          return true;
        }
        console.log("格式错误!");
        return false;
      });
    },
    change() {
      this.$store.commit("user/deleteImageUrl");
    },
  },
  components: {
    Menu: (resolve) => require(["components/Menu.vue"], resolve),
  },
  mounted() {
    if (localStorage.getItem("account")) {
      this.$store.dispatch("user/getAvatar", {
        account: localStorage.getItem("account"),
      });
      this.loginInfo.account = localStorage.getItem("account");
    }
    if (localStorage.getItem("password")) {
      this.loginInfo.password = localStorage.getItem("password");
    }
  },
};
</script>

<style lang="scss">
// #6abcc5?
.login {
  height: 100%;
  .container:first-child {
    position: relative;
    height: 6.5rem;
    background: url("../assets/img/bgc.jpg") no-repeat;
    background-size: 100% 100%;
    .avatar {
      position: absolute;
      bottom: -2.3rem;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        box-shadow: 1px 0 16px 0;
      }
    }
  }
  .container:last-child {
    margin-top: 0px;
    padding: 3rem 5rem;
    padding-bottom: 0;
    position: relative;

    .form {
      .flex {
        padding-bottom: 4px;
        .at-btn {
          padding: 0;
        }
      }
      > .at-btn {
        margin-top: 0.4rem;
        width: 100%;
      }
      > .at-btn .at-btn__text {
        font-size: 14px;
      }
    }
    > .at-btn {
      position: absolute;
      left: 0.8rem;
      bottom: -0.5rem;
      padding: 0;
    }
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>
