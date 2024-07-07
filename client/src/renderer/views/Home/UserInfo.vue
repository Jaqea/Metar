<template>
  <div class="userInfo">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ 'padding-right': '5rem' }"
    >
      <h4 slot="title">用户基本信息</h4>
      <div>
        <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">
          <el-form-item label="" prop="avatar">
            <el-upload
              action=""
              :http-request="uploadAvatar"
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-change="change"
            >
              <img :src="userInfo.imageUrl" class="avatar" />
            </el-upload>
          </el-form-item>

          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="userInfo.nickName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" readonly></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userInfo.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input
              type="textarea"
              v-model="userInfo.signature"
              rows="2"
              maxlength="70"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userInfo')">立即保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {
        imageUrl: "",
        nickName: "",
        email: "",
        sex: "",
        signature: "",
        password: "",
      },
      formData: "",
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 15, message: "长度1到15个字符", trigger: "blur" },
        ],
        password: [{ min: 6, message: "长度至少6个字符", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        signature: [{ message: "请输入个性签名", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    async uploadAvatar(params) {
      this.formData = new FormData();
      this.formData.append("avatar", params.file);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData)
            this.$store.dispatch("user/avatar", {
              formData: this.formData,
              email: this.userInfo.email,
            });
          this.$store.dispatch("user/reviseUserInfo", this.userInfo);
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    change(file) {
      this.userInfo.imageUrl = file.raw.path;
    },
    beforeAvatarUpload() {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
    },
  },
  created() {
    this.userInfo.nickName = this.user.nickName;
    this.userInfo.imageUrl = this.user.imageUrl;
    this.userInfo.email = this.user.email;
    this.userInfo.sex = this.user.sex;
    this.userInfo.signature = this.user.signature;
  },
};
</script>

<style lang="scss">
.userInfo {
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      left: 50%;
      overflow: hidden;
      transform: translateX(-50%);
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
