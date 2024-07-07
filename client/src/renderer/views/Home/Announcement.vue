<template>
  <div class="announcement">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">最新气象公告</h4>
      <div slot="extra"><a href="JavaScript:;" @click="back">返回</a></div>
      <div>
        <at-table
          :columns="columnsAnnounce"
          :data="announceList"
          stripe
          pagination
          :page-size="13"
        ></at-table>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Announcement",
  data() {
    return {
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
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "AnnounceDetail",
                        params: {
                          index: params.index,
                          isNew: 1,
                        },
                      });
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters("home", ["announceList"]),
  },
  methods: {
    back() {
      this.$router.push({
        name: "Dashbord",
      });
    },
  },
  created() {
    this.$store.dispatch("home/getAllAnnounce");
  },
};
</script>

<style lang="scss">
.announcement {
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
      width: 100px;
    }
  }
}
</style>
