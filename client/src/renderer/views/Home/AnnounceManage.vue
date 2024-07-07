<template>
  <div class="announceManage">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">
        气象公告信息
        <at-input
          @keyup.enter.native="search"
          v-model="value"
          placeholder="请输入公告名称"
          icon="search"
        ></at-input>
        <at-button
          style="position: absolute; z-index: 1; right: 0; top: 50%; transform: translateY(-50%)"
          icon="icon-edit"
          @click="editor"
          >发布公告</at-button
        >
      </h4>
      <div>
        <at-table
          :columns="columnsAnnounce"
          :data="announceList"
          stripe
          pagination
          :page-size="13"
        ></at-table>
        <el-dialog title="公告详情" :visible.sync="dialog1" width="60%">
          <el-form label-width="80px">
            <el-form-item label="公告名称">
              <el-input v-model="announceInfo.title" readonly></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="announceInfo.author" readonly></el-input>
            </el-form-item>
            <el-form-item label="访问次数">
              <el-input v-model="announceInfo.watchers" readonly></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-input v-model="announceInfo.last_upload" readonly></el-input>
            </el-form-item>
            <el-form-item label="公告简介">
              <el-input
                type="textarea"
                rows="2"
                maxlength="70"
                show-word-limit
                v-model="announceInfo.introduction"
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
          <div v-html="announceInfo.content"></div>
        </el-dialog>
        <el-dialog :visible.sync="dialog2" width="40%">
          <span slot="title" style="line-height: 24px; font-size: 18px; color: #303133"
            >提示<i
              class="icon icon-alert-circle"
              style="font-size: 18px; color: #e5d508; margin-left: 0.3rem"
            ></i
          ></span>
          <span>您确定要删除该公告吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button type="primary" @click="deleteAnnounce">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AnnounceManage",
  data() {
    return {
      value: "",
      formData: "",
      deleteAnnounceInfo: "",
      columnsAnnounce: [
        {
          title: "编号",
          key: "id",
        },
        {
          title: "标题",
          key: "title",
        },
        {
          title: "作者",
          key: "author",
        },
        {
          title: "发布时间",
          key: "last_upload",
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
                      this.announceInfo = { ...this.announceList[params.index] };
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
                      this.$router.push({
                        name: "ReviseAnnounce",
                        params: {
                          index: params.index,
                        },
                      });
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
                      this.deleteAnnounceInfo = {
                        id: this.announceList[params.index]._id,
                        index: params.index,
                      };
                      this.dialog2 = true;
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      announceInfo: {
        title: "",
        last_upload: "",
        watchers: "",
        author: "",
        introduction: "",
        content: "",
      },
      dialog1: false,
      dialog2: false,
    };
  },
  computed: {
    ...mapGetters("home", ["announceList"]),
  },
  methods: {
    editor() {
      this.$router.push({
        name: "EditorAnnounce",
      });
    },
    deleteAnnounce() {
      this.dialog2 = false;
      this.$store.dispatch("home/deleteAnnounce", this.deleteAnnounceInfo);
    },
    search() {
      this.$store.dispatch("home/findAnnounce", this.value);
    },
  },
  created() {
    this.$store.dispatch("home/getAllAnnounce");
  },
};
</script>

<style lang="scss">
.announceManage {
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
    .upload-demo {
      display: inline-block;
      margin-right: 10px;
    }
    .el-dialog__body {
      padding: 16px 24px;
    }
    .el-dialog__wrapper:nth-child(2) {
      .el-dialog__body {
        height: 36rem;
        overflow-y: scroll;
        overflow-x: auto;
      }
    }
    .at-card__title {
      display: block;
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
