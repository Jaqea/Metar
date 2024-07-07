<template>
  <div class="register">
    <Menu type="Reg" />
    <div class="container">
      <el-tag v-show="account" class="result">您的账号为：{{ account }} </el-tag>
      <div class="form">
        <el-form :model="registerInfo" :rules="rules" ref="registerInfo" label-width="0">
          <el-form-item label="" prop="nickName">
            <at-input
              name="nickName"
              size="large"
              v-model="registerInfo.nickName"
              placeholder="昵称"
            >
              <template slot="prepend">
                <i class="icon icon-user"></i>
              </template>
            </at-input>
          </el-form-item>
          <el-form-item label="" prop="password"
            ><at-input
              name="password"
              size="large"
              v-model="registerInfo.password"
              type="password"
              placeholder="密码"
            >
              <template slot="prepend">
                <i class="icon icon-lock"></i>
              </template>
            </at-input>
          </el-form-item>
          <el-form-item label="" prop="email"
            ><at-input name="email" size="large" v-model="registerInfo.email" placeholder="邮箱">
              <template slot="prepend">
                <i class="icon icon-mail"></i>
              </template>
            </at-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 12px" label="" prop="vertifyCode">
            <div class="flex">
              <at-input
                name="vertifyCode"
                size="large"
                v-model="registerInfo.vertifyCode"
                placeholder="验证码"
              >
              </at-input>
              <at-button type="primary" :disabled="isDisabled" @click="getVertifyCode">{{
                vertify
              }}</at-button>
            </div>
          </el-form-item>
          <at-button
            style="width: 100%; margin: 0.5rem 0"
            type="primary"
            @click="submitForm('registerInfo')"
            >点击注册</at-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import setTime from "@/utils/vertifyCode";
import checkEmail from "@/utils/checkEmail";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      vertify: "发送邮箱验证码",
      isDisabled: false,
      countdown: 60,
      registerInfo: {
        nickName: "",
        password: "",
        email: "",
        vertifyCode: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        vertifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度至少6个字符", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 15, message: "长度1到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("user", ["account"]),
  },
  methods: {
    getVertifyCode() {
      this.$store.dispatch("user/vertifyCode", { email: this.registerInfo.email });
      setTime(this);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/register", this.registerInfo);
          return true;
        }
        this.$Message.error("格式错误");
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
.register {
  .result {
    font-size: 12px;
    text-align: center;
    margin-bottom: 18px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .container:last-child {
    margin-top: 0px;
    padding: 0 5.5rem;
    padding-bottom: 0;
    position: relative;

    .form {
      .flex {
        padding-bottom: 4px;
        .at-btn {
          padding: 0;
        }
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
