<template>
  <div class="predictSea">
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
            <span class="value"
              ><i class="icon icon-map-pin"></i> {{ tide.name }}
              <el-select
                v-model="portIndex"
                size="large"
                style="width: 8rem; margin-left: 0.5rem"
                @change="changePort"
              >
                <el-option
                  v-for="(item, index) in tide.ports"
                  :key="index"
                  :value="index"
                  :label="item.port.name"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <div>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="hours">
                <h2 style="position: relative">
                  逐小时潮汐预报 <span>数据来源于心知天气</span
                  ><span
                    style="
                      font-size: 12px;
                      position: absolute;
                      top: 50%;
                      right: 1.4rem;
                      transform: translateY(-50%);
                    "
                  >
                    上次更新时间 {{ tide.last_update }}
                  </span>
                </h2>
                <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
                  <div
                    class="flex flex-between flex-middle"
                    style="padding-right: 1.4rem; margin-bottom: 1rem"
                  >
                    <p>
                      <el-tag style="margin-right: 0.5rem"
                        >{{ "海平面" + tide.ports[portIndex].port.sea_level }}cm</el-tag
                      >
                      <el-tag style="margin-right: 0.5rem">{{
                        "经度" + tide.ports[portIndex].port.longitude
                      }}</el-tag>
                      <el-tag>{{ "纬度" + tide.ports[portIndex].port.latitude }}</el-tag>
                    </p>
                    <el-select v-model="date" size="large" style="width: 8rem" @change="changeDate">
                      <el-option
                        v-for="(item, index) in tide.ports[portIndex].data"
                        :key="index"
                        :value="index"
                        :label="item.date"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <Highcharts
                    :options="tideOptions"
                    :series="tideSeries"
                    :styles="styles"
                    :text="
                      tide.name +
                      '，' +
                      tide.ports[portIndex].port.name +
                      tide.ports[portIndex].data[date].date +
                      '潮汐高度变化'
                    "
                    ref="simpleChart"
                  ></Highcharts>
                </at-card>
              </div>
            </at-card>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="hours" style="margin-bottom: 2rem">
                <h2>高低潮时间</h2>
                <at-table
                  :columns="columnsSea"
                  :data="tide.ports[portIndex].data[date].range"
                  stripe
                ></at-table>
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
  name: "PredictSea",
  data() {
    return {
      portIndex: 0,
      date: 0,
      value: "",
      styles: {
        width: "100%",
        height: 400,
      },
      columnsSea: [
        {
          title: "海平面高度",
          key: "height",
        },
        {
          title: "高度类型",
          key: "type",
        },
        {
          title: "发布时间",
          key: "time",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("home", ["tide", "tideOptions", "tideSeries"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchTideDaily", this.value);
    },
    changePort(index) {
      const payload = {
        portIndex: index,
        date: this.date,
      };
      this.$store.commit("home/tideSeriesChange", payload);
    },
    changeDate(index) {
      const payload = {
        portIndex: this.portIndex,
        date: index,
      };
      this.$store.commit("home/tideSeriesChange", payload);
    },
  },
  components: {
    Highcharts: (resolve) => require(["components/home/Highcharts.vue"], resolve),
  },
  mounted() {
    this.$store.dispatch("home/tideDaily");
  },
};
</script>

<style lang="scss">
.predictSea {
  padding: 0 0.25rem;
  height: 49rem;
  overflow-y: scroll;
  margin-bottom: 2rem;
  overflow-x: auto;
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
        right: 2.5rem;
        top: 1.8rem;
        transform: translateY(-50%);
        .at-select {
          margin-left: 0.5rem;
        }
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
          margin-bottom: 1rem;
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
