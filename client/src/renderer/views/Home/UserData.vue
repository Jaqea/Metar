<template>
  <div class="userData">
    <at-card :noHover="true" style="width: 98%; margin: 0 auto" :loading="false">
      <h4 slot="title">历史下载数据</h4>
      <div>
        <at-table
          :columns="columnsUserData"
          :data="userDataList"
          stripe
          pagination
          :page-size="12"
        ></at-table>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserData",
  data() {
    return {
      columnsUserData: [
        {
          title: "名称",
          key: "name",
        },
        {
          title: "格式",
          key: "type",
        },
        {
          title: "大小",
          key: "size",
        },
        {
          title: "上次下载时间",
          key: "last_download",
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
                    hollow: true,
                  },
                  style: {
                    // marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "UserDataDetail",
                        params: {
                          index: params.index,
                          isNew: 2,
                        },
                      });
                    },
                  },
                },
                "查看详情"
              ),
            ]);
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters("home", ["userDataList"]),
  },
  created() {
    this.$store.dispatch("home/getAllUserData");
  },
};
</script>

<style lang="scss">
.userData {
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    td {
      max-width: 8rem;
      overflow: hidden;
    }
    .at-table__cell {
      text-align: center;
    }
  }
}
</style>
