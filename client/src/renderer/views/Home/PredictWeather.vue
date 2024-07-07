<template>
  <div class="predictWeather">
    <at-card
      :noHover="true"
      style="width: 100%"
      :body-style="{ padding: '0' }"
      :bordered="false"
      :loading="false"
    >
      <div class="predictBody">
        <div class="now">
          <div style="position: sticky; top: 0">
            <at-input
              v-model="value"
              @keyup.enter.native="search"
              size="large"
              placeholder="请输入城市名"
            >
            </at-input>
            <span class="value"><i class="icon icon-map-pin"></i>{{ weatherDaily[0].name }}</span>
          </div>
          <div>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="hours">
                <h2>逐小时天气预报 <span>数据来源于心知天气</span></h2>
                <div class="flex flex-around">
                  <div :key="index" v-for="(item, index) in hourly1" class="hoursPredict">
                    <p>{{ item.time }}</p>
                    <div style="height: 4rem"><img :src="item.code" /></div>
                    <p style="font-size: 18px; line-height: 14px">{{ item.temperature }}℃</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.text }}</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.wind_direction }}</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.wind_speed }}km/h</p>
                    <div class="hoursMore">
                      <div class="table flex flex-around">
                        <div class="table-item">
                          <p style="color: #475669; font-size: 12px">{{ item.humidity }}%</p>
                          <p style="color: rgb(170, 172, 174); font-size: 10px">相对湿度</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-around">
                  <div :key="index" v-for="(item, index) in hourly2" class="hoursPredict">
                    <p>{{ item.time }}</p>
                    <div style="height: 4rem"><img :src="item.code" /></div>
                    <p style="font-size: 18px; line-height: 14px">{{ item.temperature }}℃</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.text }}</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.wind_direction }}</p>
                    <p style="font-size: 14px; margin-top: 1rem">{{ item.wind_speed }}km/h</p>
                    <div class="hoursMore">
                      <div class="table flex flex-around">
                        <div class="table-item">
                          <p style="color: #475669; font-size: 12px">{{ item.humidity }}%</p>
                          <p style="color: rgb(170, 172, 174); font-size: 10px">相对湿度</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </at-card>
            <at-card :body-style="{ padding: '0' }" :noHover="true" :bordered="false">
              <div class="days">
                <h2 style="position: relative">
                  15日天气预报
                  <span
                    style="
                      font-size: 12px;
                      opacity: 0.6;
                      position: absolute;
                      top: 50%;
                      right: 1.4rem;
                      transform: translateY(-50%);
                    "
                  >
                    上次更新时间 {{ weatherDaily[0].last_update }}
                  </span>
                </h2>
                <div style="padding-top: 1rem">
                  <div
                    :key="i"
                    v-for="(item, i) in weatherDaily"
                    class="daysPredict flex flex-middle flex-around"
                  >
                    <span style="font-size: 16px">{{ item.date }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><img :src="item.code_day" /> <img :src="item.code_night" /></span>
                    <span style="width: 6rem">
                      {{
                        item.text_day === item.text_night
                          ? item.text_day
                          : `${item.text_day}转${item.text_night}`
                      }}
                    </span>
                    <span style="width: 4rem">{{ item.high }}℃/{{ item.low }}℃</span>
                    <span style="width: 8rem">{{ item.wind_direction }}</span>
                    <span style="width: 4rem">{{ item.wind_speed }}km/h</span>
                    <span style="width: 4rem">&lt;{{ item.wind_scale }}级</span>
                  </div>
                </div>
              </div>
            </at-card>
          </div>
        </div>
        <div style="padding: 1rem 0; margin-bottom: 4.5rem">
          <at-card
            :noHover="true"
            style="width: 100%"
            :body-style="{ padding: '0' }"
            :bordered="false"
            :loading="false"
          >
            <div style="padding: 12px 16px">
              <Highcharts
                :options="options"
                :series="series"
                :styles="styles"
                :text="weatherDaily[0].name + '15日最高最低气温变化'"
                ref="simpleChart"
              ></Highcharts>
            </div>
          </at-card>
        </div>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PredictWeather",
  data() {
    return {
      value: "",
      styles: {
        width: "100%",
        height: 400,
      },
    };
  },
  computed: {
    ...mapGetters("home", ["options", "series", "weatherDaily", "hourly1", "hourly2"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchWeatherDaily", this.value);
      this.$store.dispatch("home/searchWeatherHourly", this.value);
    },
  },
  components: {
    Highcharts: (resolve) => require(["components/home/Highcharts.vue"], resolve),
  },
  mounted() {
    this.$store.dispatch("home/weatherDaily");
    this.$store.dispatch("home/weatherHourly");
  },
};
</script>

<style lang="scss">
.predictWeather {
  padding: 0 0.25rem;
  .predictBody {
    height: 49rem;
    overflow-y: scroll;
    overflow-x: auto;

    > div:first-child {
      background: url("../../assets/img/bgcBody.jpg");
      background-size: 100% 100%;
      box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.8);
    }
    > div:last-child {
      margin: 0.5rem 0;
      background-size: 100% 100%;
      .at-card {
        background: #fff;
        box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
      }
    }
  }
  .at-card {
    color: #fff;
    background-color: transparent;
    .now {
      > div:first-child {
        color: #3f536e;
        z-index: 2;
        background: #fff;
        box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
        border: 1px solid #e2ecf4;
      }
      > div {
        padding: 12px 16px;
      }
    }
  }
  .el-divider--horizontal {
    margin: 12px 0;
    background: #e2eaf2;
  }
  .at-input__original {
    width: 15rem;
    font-family: "Microsoft Yahei";
    padding: 5px 13px;
    // width: 251px;
    height: 2rem;
    line-height: 20px;
    font-size: 14px;
  }
  > .at-card {
    // box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .now {
      //   padding: 12px 16px;
      position: relative;
      .at-input__original {
        width: 15rem;
      }
      .value {
        position: absolute;
        right: 4rem;
        top: 1.8rem;
        transform: translateY(-50%);
      }
      .at-card__body {
        h2 {
          font-weight: 400;
          color: #fff;
          span {
            font-size: 12px;
            height: 21px;
            line-height: 21px;
            margin-left: 0.5rem;
          }
        }
        p {
          color: #fff;
          //   margin: 1rem 0;
        }
        h2::before {
          content: "";
          float: left;
          height: 7px;
          width: 7px;
          overflow: hidden;
          margin-right: 10px;
          background: #fff;
          border-radius: 50%;
          margin-top: 8px;
        }
        .hours,
        .days {
          img {
            width: 2rem;
            margin: 1rem 0;
          }
          .hoursPredict {
            padding: 1rem 0;
            text-align: center;
            // width: 8%;
            position: relative;
            .hoursMore {
              display: none;
              position: absolute;
              width: 4rem;
              padding: 0.3rem 0.3rem;
              top: 14.5rem;
              left: -0.5rem;
              background-color: #fff;
              z-index: 1;
              border-radius: 5px;
              box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
              .table-item {
                margin: 0 0.2rem;
                p {
                  margin: 0.2rem 0;
                }
              }
            }
            .hoursMore::before {
              content: " ";
              width: 10px;
              height: 10px;
              background-color: #fff;
              position: absolute;
              top: -0.2rem;
              left: 50%;
              transform: translateX(-45%) rotate(45deg);
            }
          }
        }
        .days {
          .daysPredict {
            width: 100%;
            position: relative;
            margin-bottom: 0.7rem;
            span {
              width: 7rem;
              text-align: center;
            }
            img {
              margin: 0 0.2rem;
            }
            .el-divider--vertical {
              height: 1.7rem;
            }
          }
        }
        .hoursPredict:hover .hoursMore {
          display: block;
        }
      }
    }
  }
}
</style>
