<template>
  <div class="announceDetail">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">公告详情</h4>
      <div slot="extra"><a href="JavaScript:;" @click="back">返回</a></div>
      <div>
        <h2>
          {{ announceInfo.title }}
        </h2>
        <p style="margin: 1rem 0; text-indent: 2rem">
          {{ announceInfo.introduction }}
        </p>

        <p class="flex" style="line-height: 32px; position: relative">
          <span>发布时间：{{ announceInfo.last_upload }}</span
          ><span style="margin-left: 2rem">作者：{{ announceInfo.author }}</span>
          <el-tag style="position: absolute; right: 0"
            >访问次数：{{ announceInfo.watchers }}</el-tag
          >
        </p>
        <el-divider></el-divider>
        <div style="margin: 1rem 0" v-html="announceInfo.content"></div>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AnnounceDetail",
  data() {
    return {
      isNew: "",
      announceInfo: {
        title: "",
        last_upload: "",
        watchers: "",
        author: "",
        introduction: "",
        content: "",
      },
    };
  },
  methods: {
    back() {
      if (this.isNew === 0)
        this.$router.push({
          name: "Dashbord",
        });
      else
        this.$router.push({
          name: "Announcement",
        });
    },
  },
  computed: {
    ...mapGetters("home", ["announceList"]),
  },
  created() {
    this.isNew = this.$route.params.isNew;
    this.announceInfo = { ...this.announceList[this.$route.params.index] };
    this.$store.dispatch("home/addWatchers", this.announceInfo._id);
  },
};
</script>

<style lang="scss">
.announceDetail {
  overflow-y: scroll;
  height: 49rem;
  padding-bottom: 5rem;
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .el-divider--horizontal {
      margin: 1rem 0;
    }
    h2 {
      text-align: center;
    }
  }
}
</style>
