<template>
  <div class="userDataDetail">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ 'padding-top': '0' }"
    >
      <h4 slot="title">{{ dataInfo.name }}</h4>
      <div slot="extra"><a href="JavaScript:;" @click="back">返回</a></div>
      <div>
        <h4>
          <span style="margin-right: 0.5rem">数据简介</span>
          <el-tag style="margin-right: 0.5rem">文件大小 {{ dataInfo.size }}</el-tag>
          <el-tag style="margin-right: 0.5rem">文件格式 {{ dataInfo.type }}</el-tag>
          <el-tag style="margin-right: 0.5rem">已下载次数 {{ dataInfo.download }}</el-tag>
        </h4>
        <p>{{ dataInfo.introduction }}</p>
        <h4>数据内容</h4>
        <p>
          {{ dataInfo.content }}
        </p>
        <p style="text-align: right; margin-top: 1rem; font-size: 12px">
          {{
            isNew != 2 ? "发布时间：" + dataInfo.time : "上次下载时间：" + dataInfo.last_download
          }}
        </p>
        <p>
          <el-button :loading="loading" @click="download" type="primary" style="margin-top: 1rem">{{
            isNew != 2 ? content : "重新下载"
          }}</el-button>
        </p>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserDataDetail",
  data() {
    return {
      content: "立即下载",
      loading: false,
      isNew: "",
      dataInfo: {
        name: "",
        time: "",
        download: "",
        type: "",
        size: "",
        introduction: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters("home", ["dataList", "userDataList"]),
  },
  methods: {
    back() {
      if (this.isNew === 0)
        this.$router.push({
          name: "Dashbord",
        });
      else if (this.isNew === 1)
        this.$router.push({
          name: "DataDetail",
        });
      else
        this.$router.push({
          name: "UserData",
        });
    },
    download() {
      this.loading = true;
      this.content = "下载中";
      this.$store.commit("home/down", this);
      if (this.isNew === 0) {
        this.$store.dispatch("home/addDownload", this.dataInfo._id);
        this.$store.dispatch("user/addUserDownload", this.$store.state.user.email);
        this.$store.dispatch("home/createUserData", this.dataInfo);
        // this.$store.commit("user/addUserDownload");
      }
      setTimeout(() => {
        this.loading = false;
        this.content = "立即下载";
      }, 4000);
    },
  },
  mounted() {
    this.isNew = this.$route.params.isNew;
    if (this.isNew === 2) this.dataInfo = { ...this.userDataList[this.$route.params.index] };
    else this.dataInfo = { ...this.dataList[this.$route.params.index] };
    this.dataInfo.email = JSON.parse(localStorage.getItem("user")).email;
  },
};
</script>

<style lang="scss">
.userDataDetail {
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);

    .at-card__body {
      h4 {
        margin: 0.5rem 0;
      }
    }
  }
}
</style>
