<template>
  <div class="dataManage">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">
        气象数据信息
        <at-input
          @keyup.enter.native="search"
          v-model="value"
          placeholder="请输入数据名称"
          icon="search"
        ></at-input>
        <at-button
          style="position: absolute; right: 0; top: 50%; transform: translateY(-50%)"
          icon="icon-file-plus"
          @click="dialog4 = true"
          >上传数据</at-button
        >
      </h4>
      <div>
        <at-table
          :columns="columnsData"
          :data="dataList"
          stripe
          pagination
          :page-size="13"
        ></at-table>
        <el-dialog top="9vh" title="数据详情" :visible.sync="dialog1" width="60%">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="数据名称">
              <el-input v-model="dataInfo.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="数据上传者">
              <el-input v-model="dataInfo.author" readonly></el-input>
            </el-form-item>
            <el-form-item label="文件格式">
              <el-input v-model="dataInfo.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="数据大小">
              <el-input v-model="dataInfo.size" readonly></el-input>
            </el-form-item>
            <el-form-item label="下载次数">
              <el-input v-model="dataInfo.download" readonly></el-input>
            </el-form-item>
            <el-form-item label="上传时间">
              <el-input v-model="dataInfo.time" readonly></el-input>
            </el-form-item>
            <el-form-item label="数据简介">
              <el-input
                type="textarea"
                rows="2"
                maxlength="70"
                show-word-limit
                v-model="dataInfo.introduction"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="数据内容">
              <el-input
                type="textarea"
                v-model="dataInfo.content"
                rows="2"
                maxlength="70"
                show-word-limit
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" @click="download" type="primary" size="middld">{{
                content
              }}</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog title="修改数据信息" @close="close" :visible.sync="dialog2" width="60%">
          <el-form
            :model="dataRevise"
            :rules="rules"
            ref="dataRevise"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="数据名称" prop="name">
              <el-input v-model="dataRevise.name"></el-input>
            </el-form-item>
            <el-form-item label="文件格式" prop="type">
              <el-input v-model="dataRevise.type"></el-input>
            </el-form-item>
            <el-form-item label="数据上传者" prop="author">
              <el-input v-model="dataRevise.author"></el-input>
            </el-form-item>
            <el-form-item label="上传时间">
              <el-input v-model="dataRevise.time" readonly></el-input>
            </el-form-item>
            <el-form-item label="数据简介" prop="introduction">
              <el-input
                type="textarea"
                rows="2"
                maxlength="70"
                show-word-limit
                v-model="dataRevise.introduction"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据内容" prop="content">
              <el-input
                type="textarea"
                v-model="dataRevise.content"
                rows="2"
                maxlength="70"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-upload
              :http-request="uploadData"
              :before-upload="beforeDataUpload"
              :on-change="change"
              :file-list="fileList"
              action=""
              class="upload-demo"
              multiple
              :limit="1"
            >
              <el-button size="middle" type="primary">重新上传</el-button>
            </el-upload>
            <div slot="tip" class="el-upload__tip">
              <strong style="color: #f56c6c">*只能上传1个文件</strong>
            </div>
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm_revise('dataRevise')">保 存</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="dialog3" width="40%">
          <span slot="title" style="line-height: 24px; font-size: 18px; color: #303133"
            >提示<i
              class="icon icon-alert-circle"
              style="font-size: 18px; color: #e5d508; margin-left: 0.3rem"
            ></i
          ></span>
          <span>您确定要删除该数据吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog3 = false">取 消</el-button>
            <el-button type="primary" @click="deleteData">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog @close="close" title="添加新数据" :visible.sync="dialog4" width="60%">
          <el-form :model="newDataInfo" :rules="rules" ref="newDataInfo" label-width="100px">
            <el-form-item label="数据名称" prop="name">
              <el-input v-model="newDataInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="文件格式" prop="type">
              <el-input v-model="newDataInfo.type"></el-input>
            </el-form-item>
            <el-form-item label="数据上传者" prop="author">
              <el-input v-model="newDataInfo.author"></el-input>
            </el-form-item>
            <el-form-item label="数据简介" prop="introduction">
              <el-input
                rows="2"
                type="textarea"
                maxlength="70"
                show-word-limit
                v-model="newDataInfo.introduction"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据内容" prop="content">
              <el-input v-model="newDataInfo.content"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-upload
              :http-request="uploadData"
              :before-upload="beforeDataUpload"
              :on-change="change2"
              :file-list="fileList"
              action=""
              class="upload-demo"
              multiple
              :limit="1"
            >
              <el-button size="middle" type="primary">点击上传</el-button>
            </el-upload>
            <div slot="tip" class="el-upload__tip">
              <strong style="color: #f56c6c">*只能上传1个文件</strong>
            </div>
            <el-button @click="dialog4 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm_create('newDataInfo')">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sizeTostr from "../../utils/sizeTostr";

export default {
  name: "DataManage",
  data() {
    return {
      content: "立即下载",
      loading: false,
      fileList: [],
      value: "",
      formData: "",
      deleteDataInfo: "",
      columnsData: [
        {
          title: "编号",
          key: "id",
        },
        {
          title: "数据名称",
          key: "name",
        },
        {
          title: "文件格式",
          key: "type",
        },
        {
          title: "上传时间",
          key: "time",
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
                      this.dataInfo = { ...this.dataList[params.index] };
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
                      this.dataRevise = { ...this.dataList[params.index] };
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
                    // marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.deleteDataInfo = {
                        id: this.dataList[params.index]._id,
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
      dataInfo: {
        name: "",
        time: "",
        download: "",
        type: "",
        size: "",
        introduction: "",
        content: "",
      },
      dataRevise: {
        name: "",
        time: "",
        download: "",
        type: "",
        size: "",
        introduction: "",
        content: "",
        author: "",
      },
      rules: {
        author: [
          { required: true, message: "请输入数据上传者", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入数据名称", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入文件格式", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
        ],
        introduction: [{ required: true, message: "请输入数据简介", trigger: "blur" }],
        content: [{ required: true, message: "请填写数据内容", trigger: "blur" }],
      },
      newDataInfo: {
        name: "",
        author: "",
        type: "",
        introduction: "",
        content: "",
        size: "",
      },
      empty: {
        name: "",
        download: 0,
        type: "",
        introduction: "",
        content: "",
      },
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
    };
  },
  computed: {
    ...mapGetters("home", ["dataList"]),
  },
  methods: {
    submitForm_revise(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog2 = false;
          if (this.formData) {
            this.$store.dispatch("home/uploadData", {
              formData: this.formData,
              id: this.dataRevise._id,
              dataRevise: this.dataRevise,
            });
          } else this.$store.dispatch("home/reviseData", this.dataRevise);
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    submitForm_create(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.formData) {
            this.$Message.error("请上传数据！");
            return false;
          }
          this.dialog4 = false;
          this.$store.dispatch("home/createData", {
            newDataInfo: this.newDataInfo,
            formData: this.formData,
          });
          this.formData = "";
          this.fileList = "";
          this.newDataInfo = { ...this.empty };
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    uploadData(params) {
      this.formData = new FormData();
      this.formData.append("data", params.file);
    },
    deleteData() {
      this.dialog3 = false;
      this.$store.dispatch("home/deleteData", this.deleteDataInfo);
    },
    change(file) {
      this.dataRevise.size = sizeTostr(file.size);
      this.dataRevise.name = file.name.split(".")[0];
      this.dataRevise.type = file.name.split(".").pop().toLowerCase();
    },
    change2(file) {
      this.newDataInfo.size = sizeTostr(file.size);
      this.newDataInfo.name = file.name.split(".")[0];
      this.newDataInfo.type = file.name.split(".").pop().toLowerCase();
    },
    beforeDataUpload() {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 <script 2;
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
    },
    close() {
      this.formData = "";
      this.fileList = [];
    },
    search() {
      this.$store.dispatch("home/findData", this.value);
    },
    download() {
      this.loading = true;
      this.content = "下载中";
      this.$store.commit("home/down", this);
    },
  },
  created() {
    this.$store.dispatch("home/getAllData");
  },
};
</script>

<style lang="scss">
.dataManage {
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .el-upload-list {
      position: absolute;
      left: 2rem;
      bottom: 2.5rem;
    }
    .el-upload__tip {
      position: absolute;
      bottom: 0.5rem;
      left: 2.3rem;
    }
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
    .upload-demo {
      display: inline-block;
      margin-right: 10px;
    }
    .el-dialog__body {
      padding: 16px 24px;
    }
    .at-card__title {
      display: block;
    }
    .el-dialog__footer {
      padding-bottom: 40px;
    }
    .at-input {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 6rem;
      transform: translateY(-50%);
    }
  }
}
</style>
