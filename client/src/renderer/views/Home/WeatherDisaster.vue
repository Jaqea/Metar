<template>
  <div class="weatherDisaster">
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
              placeholder="请输入城市名/县名"
              append-button
            >
            </at-input>
            <span class="value"><i class="icon icon-map-pin"></i> {{ alarm.name }}</span>
          </div>
          <div>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="hours" v-for="(item, index) in alarm.alarms" :key="index">
                <h2 style="position: relative">
                  <i
                    :class="'icon icon-alert-triangle ' + item.level"
                    style="margin-right: 0.5rem"
                  ></i>
                  {{ item.title }}<el-tag :type="item.tag">{{ item.type }}</el-tag
                  ><span
                    style="
                      font-size: 12px;
                      position: absolute;
                      top: 50%;
                      right: -11rem;
                      transform: translateY(-50%);
                    "
                  >
                    发布时间 {{ item.pub_date }}
                  </span>
                </h2>
                <p class="detail">
                  {{ item.description }}
                </p>
                <el-divider direction="horizontal"></el-divider>
              </div>
              <el-empty
                :image-size="200"
                v-show="alarm.isEmpty"
                description="暂未发布气象灾害预警"
              ></el-empty>
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
  name: "WeatherDisaster",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapGetters("home", ["alarm"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchWeatherAlarm", this.value);
    },
  },
  mounted() {
    console.log(this.alarm);
    this.$store.dispatch("home/weatherAlarm");
  },
};
</script>

<style lang="scss">
.weatherDisaster {
  .yellow {
    color: #e5d508;
  }
  .orange {
    color: #f49903;
  }
  .blue {
    color: #355fff;
  }
  .red {
    color: rgb(245, 49, 49);
  }
  padding: 0 0.25rem;
  height: 50rem;
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
      position: relative;
      .at-input__original {
        width: 15rem;
        font-family: "Microsoft Yahei";
        padding: 5px 13px;
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
          margin-bottom: 1rem;
          h2 {
            font-weight: 400;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            max-width: 36rem;
            span {
              font-size: 12px;
              height: 21px;
              line-height: 21px;
              margin-left: 0.5rem;
            }
          }
          .detail {
            font-size: 16px;
            text-indent: 36px;
            line-height: 1.8rem;
          }
        }
      }
    }
  }
}
</style>
