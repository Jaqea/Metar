<template>
  <div class="dataDetail">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px' }"
    >
      <h4 slot="title" style="position: relative">最新气象数据</h4>
      <div slot="extra"><a href="JavaScript:;" @click="back">返回</a></div>
      <div>
        <at-table
          :columns="columnsData"
          :data="dataList"
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
  name: "DataDetail",
  data() {
    return {
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
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "UserDataDetail",
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
    ...mapGetters("home", ["dataList"]),
  },
  methods: {
    back() {
      this.$router.push({
        name: "Dashbord",
      });
    },
  },
};
</script>

<style lang="scss">
.dataDetail {
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
