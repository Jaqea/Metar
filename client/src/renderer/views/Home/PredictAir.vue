<template>
  <div class="predictAir">
    <at-card
      :noHover="true"
      style="width: 100%"
      :body-style="{ padding: '0' }"
      :bordered="false"
      :loading="false"
    >
      <div class="predictBody">
        <div class="now">
          <div style="position: sticky; top: 0; z-index: 1">
            <at-input
              v-model="value"
              @keyup.enter.native="search"
              size="large"
              placeholder="请输入城市名"
              append-button
            >
            </at-input>
            <span class="value"><i class="icon icon-map-pin"></i> {{ airSearchName }}</span>
          </div>
          <div>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="hours">
                <h2>逐小时空气质量预报 <span>数据来源于心知天气</span></h2>
                <at-table :columns="columnsHourly" :data="airHourly" stripe pagination></at-table>
              </div>
              <div class="hours" style="margin-bottom: 2rem">
                <h2>逐日空气质量预报</h2>
                <at-table :columns="columnsDaily" :data="airDaily" stripe></at-table>
              </div>
            </at-card>
          </div>
        </div>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "predictAir",
  data() {
    return {
      columnsHourly: [
        {
          title: "空气质量指数",
          key: "aqi",
        },
        {
          title: "PM2.5",
          key: "pm25",
        },
        {
          title: "PM10",
          key: "pm10",
        },
        {
          title: "二氧化硫",
          key: "so2",
        },
        {
          title: "二氧化氮",
          key: "no2",
        },
        {
          title: "一氧化碳",
          key: "co",
        },
        {
          title: "空气质量类别",
          key: "quality",
        },
        {
          title: "预报小时",
          key: "time",
        },
      ],
      columnsDaily: [
        {
          title: "空气质量指数",
          key: "aqi",
        },
        {
          title: "PM2.5",
          key: "pm25",
        },
        {
          title: "PM10",
          key: "pm10",
        },
        {
          title: "二氧化硫",
          key: "so2",
        },
        {
          title: "二氧化氮",
          key: "no2",
        },
        {
          title: "一氧化碳",
          key: "co",
        },
        {
          title: "空气质量类别",
          key: "quality",
        },
        {
          title: "日期",
          key: "date",
        },
      ],
      value: "",
    };
  },
  computed: {
    ...mapGetters("home", ["airHourly", "airDaily", "airSearchName"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchAirDaily", this.value);
      this.$store.dispatch("home/searchAirHourly", this.value);
    },
  },
  mounted() {
    this.$store.dispatch("home/airDaily");
    this.$store.dispatch("home/airHourly");
  },
};
</script>

<style lang="scss">
.predictAir {
  padding: 0 0.25rem;
  height: 49rem;
  overflow-y: scroll;
  margin-bottom: 2rem;
  overflow-x: auto;
  th {
    width: 10%;
  }
  th:last-child {
    width: 20%;
  }
  .at-table__cell {
    text-align: center;
  }
  .el-divider--horizontal {
    margin: 12px 0;
    background: #ececec;
  }
  .predictBody {
    margin-bottom: 5rem;
  }
  .at-card {
    background-color: transparent;
  }
  > .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .now {
      //   padding: 12px 16px;
      position: relative;
      .at-input__original {
        width: 15rem;
        font-family: "Microsoft Yahei";
        padding: 5px 13px;
        // width: 251px;
        height: 2rem;
        line-height: 20px;
        font-size: 14px;
      }
      .value {
        position: absolute;
        right: 4rem;
        top: 1.8rem;
        transform: translateY(-50%);
      }
      > div {
        padding: 12px 16px;
        background-color: #fff;
      }
      > div:first-child {
        border-top: 1px solid #e2ecf4;
        border-bottom: 1px solid #e2ecf4;
      }
      div > .at-card {
        .hours {
          h2 {
            font-weight: 400;
            margin-bottom: 1rem;
            span {
              font-size: 12px;
              height: 21px;
              line-height: 21px;
              margin-left: 0.5rem;
            }
          }
          h2::before {
            content: "";
            float: left;
            height: 7px;
            width: 7px;
            overflow: hidden;
            margin-right: 10px;
            background: #3f536e;
            border-radius: 50%;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
