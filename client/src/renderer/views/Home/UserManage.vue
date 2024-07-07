<template>
  <div class="userManage">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">
        用户信息
        <at-input
          v-model="value"
          @keyup.enter.native="search"
          placeholder="请输入用户昵称"
          icon="search"
        ></at-input>
        <at-button
          style="position: absolute; right: 0; top: 50%; transform: translateY(-50%)"
          icon="icon-user-plus"
          @click="dialog4 = true"
          >添加用户</at-button
        >
      </h4>
      <div>
        <at-table
          :columns="columnsUser"
          :data="userList"
          stripe
          pagination
          :page-size="13"
        ></at-table>
        <el-dialog top="10vh" title="用户详细信息" :visible.sync="dialog1" width="60%">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户头像">
              <img :src="userInfo.imageUrl" class="avatar" />
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input v-model="userInfo.nickName" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户账号">
              <el-input v-model="userInfo.account" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="userInfo.email" readonly></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="userInfo.sex" disabled>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="已下载数据量">
              <el-input v-model="userInfo.download" readonly></el-input>
            </el-form-item>
            <el-form-item label="上次登陆时间">
              <el-input v-model="userInfo.last_login" readonly></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
              <el-input v-model="userInfo.last_register" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户签名">
              <el-input
                type="textarea"
                v-model="userInfo.signature"
                rows="2"
                maxlength="70"
                show-word-limit
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog top="9vh" title="修改用户信息" :visible.sync="dialog2" width="60%">
          <el-form :model="userRevise" :rules="rules" ref="userRevise" label-width="100px">
            <el-form-item label="用户头像">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadAvatar"
                :before-upload="beforeAvatarUpload"
                :on-change="change"
              >
                <img v-if="userRevise.imageUrl" :src="userRevise.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="userRevise.nickName"></el-input>
            </el-form-item>
            <el-form-item label="用户账号">
              <el-input v-model="userRevise.account" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="userRevise.email"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input show-password type="password" v-model="userRevise.password"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userRevise.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户签名" prop="signature">
              <el-input
                type="textarea"
                v-model="userRevise.signature"
                rows="2"
                maxlength="70"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm_revise('userRevise')">保 存</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="dialog3" width="40%">
          <span slot="title" style="line-height: 24px; font-size: 18px; color: #303133"
            >提示<i
              class="icon icon-alert-circle"
              style="font-size: 18px; color: #e5d508; margin-left: 0.3rem"
            ></i
          ></span>
          <span>您确定要删除该用户吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog3 = false">取 消</el-button>
            <el-button type="primary" @click="deleteUser">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog @close="close" title="添加用户" :visible.sync="dialog4" width="60%">
          <el-form :model="newUserInfo" :rules="rules" ref="newUserInfo" label-width="100px">
            <el-form-item label="用户头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :http-request="uploadAvatar"
                :before-upload="beforeAvatarUpload"
                :on-change="changeAdd"
              >
                <img v-if="newUserInfo.imageUrl" :src="newUserInfo.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="newUserInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item label="用户账号" prop="account">
              <el-button @click="getNewAccount" type="primary">点击生成</el-button>
              <el-tag style="position: absolute; right: 0">{{ createAccount }}</el-tag>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="newUserInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input show-password v-model="newUserInfo.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="newUserInfo.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户签名" prop="signature">
              <el-input
                type="textarea"
                v-model="newUserInfo.signature"
                rows="2"
                maxlength="70"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog4 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm_create('newUserInfo')">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import checkEmail from "@/utils/checkEmail";

export default {
  name: "UserManage",
  data() {
    return {
      value: "",
      formData: "",
      deleteUserInfo: "",
      columnsUser: [
        {
          title: "编号",
          key: "id",
        },
        {
          title: "用户昵称",
          key: "nickName",
        },
        {
          title: "用户账号",
          key: "account",
        },
        {
          title: "上次登录时间",
          key: "last_login",
        },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "AtButton",
                {
                  props: {
                    size: "smaller",
                    // hollow: true,
                  },
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.userInfo = { ...this.userList[params.index] };
                      this.dialog1 = true;
                    },
                  },
                },
                "查看"
              ),
              h(
                "AtButton",
                {
                  props: {
                    size: "smaller",
                    // hollow: true,
                    type: "primary",
                  },
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.userRevise = { ...this.userList[params.index] };
                      this.dialog2 = true;
                    },
                  },
                },
                "修改"
              ),
              h(
                "AtButton",
                {
                  props: {
                    size: "smaller",
                    // hollow: true,
                    type: "error",
                  },
                  style: {
                    display: this.userList[params.index].type === "admin" ? "none" : "inline-block",
                  },
                  on: {
                    click: () => {
                      this.deleteUserInfo = {
                        email: this.userList[params.index].email,
                        index: params.index,
                      };
                      this.dialog3 = true;
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      userInfo: {
        account: "",
        imageUrl: "",
        nickName: "",
        email: "",
        last_login: "",
        last_register: "",
        download: "",
        sex: "",
        signature: "",
      },
      userRevise: {
        account: "",
        imageUrl: "",
        nickName: "",
        email: "",
        sex: "",
        signature: "",
        password: "",
      },
      newUserInfo: {
        account: "",
        imageUrl: "",
        nickName: "",
        email: "",
        password: "",
        sex: "",
        signature: "",
      },
      empty: {
        account: "",
        imageUrl: "",
        nickName: "",
        email: "",
        password: "",
        sex: "",
        signature: "",
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: "blur" },
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 15, message: "长度1到15个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度至少6个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        signature: [{ message: "请输入个性签名", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters("home", ["userList", "createAccount"]),
  },
  methods: {
    submitForm_revise(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog2 = false;
          this.$store.dispatch("home/reviseUser", this.userRevise);
          if (this.formData) {
            this.$store.dispatch("user/avatar", {
              formData: this.formData,
              email: this.userRevise.email,
            });
            this.formData = "";
          }
          if (this.userRevise.account === JSON.parse(localStorage.getItem("user")).account) {
            localStorage.setItem("user", JSON.stringify(this.userRevise));
            this.$store.commit("user/created");
          }
          this.$store.commit("home/reviseUserList", this.userRevise);
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    submitForm_create(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog4 = false;
          this.newUserInfo.account = this.createAccount;
          this.$store.dispatch("home/createUser", this.newUserInfo);
          if (this.formData) {
            this.$store.dispatch("user/avatar", {
              formData: this.formData,
              email: this.newUserInfo.email,
            });
            this.formData = "";
          }
          this.$store.commit("home/emptyAccount");
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    getNewAccount() {
      this.$store.dispatch("home/createAccount");
    },
    uploadAvatar(params) {
      this.formData = new FormData();
      this.formData.append("avatar", params.file);
    },
    change(file) {
      this.userRevise.imageUrl = file.raw.path;
    },
    changeAdd(file) {
      this.newUserInfo.imageUrl = file.raw.path;
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
    deleteUser() {
      this.dialog3 = false;
      this.$store.dispatch("home/deleteUser", this.deleteUserInfo);
    },
    search() {
      this.$store.dispatch("home/findUser", this.value);
    },
    close() {
      this.newUserInfo = { ...this.empty };
    },
  },
  created() {
    this.$store.dispatch("home/getAllUser");
  },
};
</script>

<style lang="scss">
.userManage {
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    td {
      max-width: 8rem;
      overflow: hidden;
    }
    .at-table__cell {
      text-align: center;
    }
    .at-table__cell:last-child {
      width: 200px;
    }
    .avatar {
      width: 4rem;
      height: 4rem;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 4rem;
      height: 4rem;
      line-height: 4rem;
    }
    .el-dialog__body {
      padding: 16px 24px;
    }
    .el-dialog__wrapper:nth-child(3) {
      .el-dialog__body {
        padding: 0 24px;
      }
    }
    .el-dialog__footer {
      padding-top: 0;
    }
    .el-form-item {
      margin-bottom: 18px;
    }
    .at-card__title {
      display: block;
    }
    .at-input {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 4.3rem;
      transform: translateY(-50%);
    }
  }
}
</style>
