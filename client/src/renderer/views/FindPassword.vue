<template>
  <div class="findPassword">
    <Menu type="FPwd" />
    <div class="container">
      <div class="form">
        <el-form :model="findPasswordInfo" :rules="rules" ref="findPasswordInfo" label-width="0">
          <el-form-item label="" prop="email"
            ><at-input size="large" v-model="findPasswordInfo.email" placeholder="请输入邮箱">
              <template slot="prepend">
                <i class="icon icon-mail"></i>
              </template>
            </at-input>
          </el-form-item>
          <el-form-item label="" prop="vertifyCode">
            <div class="flex">
              <at-input size="large" v-model="findPasswordInfo.vertifyCode" placeholder="验证码">
              </at-input>
              <at-button type="primary" :disabled="isDisabled" @click="getVertifyCode">{{
                vertify
              }}</at-button>
            </div>
          </el-form-item>

          <el-form-item label="" prop="password">
            <at-input
              size="large"
              v-model="findPasswordInfo.password"
              type="password"
              placeholder="输入新密码"
            >
              <template slot="prepend">
                <i class="icon icon-lock"></i>
              </template>
            </at-input>
          </el-form-item>

          <el-form-item style="margin-bottom: 12px" label="" prop="passwordAgain">
            <at-input
              size="large"
              v-model="findPasswordInfo.passwordAgain"
              type="password"
              placeholder="再次确认新密码"
            >
              <template slot="prepend">
                <i class="icon icon-lock"></i>
              </template>
            </at-input>
          </el-form-item>
          <at-button
            style="width: 100%; margin-top: 5px"
            type="primary"
            @click="submitForm('findPasswordInfo')"
            >确定</at-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import setTime from "@/utils/vertifyCode";
import checkEmail from "@/utils/checkEmail";

export default {
  name: "FindPassword",
  data() {
    return {
      vertify: "发送邮箱验证码",
      isDisabled: false,
      countdown: 60,
      findPasswordInfo: {
        email: "",
        vertifyCode: "",
        password: "",
        passwordAgain: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: ["blur", "change"] },
          { validator: checkEmail, trigger: ["blur", "change"] },
        ],
        vertifyCode: [
          { required: true, message: "请输入验证码", trigger: ["blur", "change"] },
          { min: 6, max: 6, message: "长度为6个字符", trigger: ["blur", "change"] },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] },
          { min: 6, message: "长度至少6个字符", trigger: ["blur", "change"] },
        ],
        passwordAgain: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] },
          { min: 6, message: "长度至少6个字符", trigger: ["blur", "change"] },
          { validator: this.validatePass2, trigger: "blur", required: true },
        ],
      },
    };
  },
  methods: {
    validatePass2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.findPasswordInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    getVertifyCode() {
      this.$store.dispatch("user/vertifyCode", { email: this.findPasswordInfo.email });
      setTime(this);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/findPassword", this.findPasswordInfo);
          return true;
        }
        console.log("格式错误!");
        return false;
      });
    },
  },
  components: {
    Menu: (resolve) => require(["components/Menu.vue"], resolve),
  },
};
</script>

<style lang="scss">
.findPassword {
  .container:last-child {
    margin-top: 0px;
    padding: 0.5rem 5.5rem;
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
      .flex {
        .at-input {
          width: 41%;
        }
        .at-btn {
          width: 59%;
          margin-left: 0.5rem;
        }
      }
    }
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>
