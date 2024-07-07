<template>
  <div class="weatherNow">
    <at-card
      :noHover="true"
      style="width: 100%"
      :body-style="{ padding: '0' }"
      :bordered="false"
      :loading="false"
    >
      <div class="now">
        <at-input
          v-model="value"
          @keyup.enter.native="search"
          size="large"
          placeholder="请输入城市名"
          append-button
        >
        </at-input>
        <span class="value"><i class="icon icon-map-pin"></i> {{ now.name }}</span>
        <el-divider></el-divider>
        <div class="city">
          <div class="p">
            <span style="font-size: 6rem">{{ now.temperature }}℃</span
            ><span style="font-size: 1.5rem; margin: 0 0.5rem">{{ now.text }}</span>
            <div :class="city.airClass">
              <i class="icon icon-feather" :style="'color:' + city.color + ';'"></i> {{ city.aqi }}
              {{ city.quality }}
              <div class="air-detail" :style="'--bgc:' + city.color">
                <div :class="city.innerClass">空气质量指数 {{ city.aqi }} {{ city.quality }}</div>
                <div class="table flex flex-between">
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.pm25 }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">PM2.5</p>
                  </div>
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.pm10 }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">PM10</p>
                  </div>
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.so2 }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">SO2</p>
                  </div>
                </div>
                <div class="table flex flex-between">
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.no2 }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">NO2</p>
                  </div>
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.o3 }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">O3</p>
                  </div>
                  <div class="table-item">
                    <p style="color: #475669; font-size: 14px">{{ city.co }}</p>
                    <p style="color: rgb(170, 172, 174); font-size: 12px">CO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p style="font-size: 1.2rem">
            <span style="margin-right: 1rem"
              ><i class="icon icon-navigation"></i> {{ now.wind_direction }}风
              {{ now.wind_scale }}级</span
            >
            <span style="margin-right: 1rem"
              ><i class="icon icon-droplet"></i> 相对湿度 {{ now.humidity }}%</span
            ><span style="margin-right: 1rem"
              ><i class="icon icon-compass"></i> 气压 {{ now.pressure }}hPa</span
            >
          </p>
          <p style="font-size: 1.2rem">
            <span style="margin-right: 1rem"
              ><i class="icon icon-zap"></i> 风速 {{ now.wind_speed }}km/h</span
            >
            <span style="margin-right: 1rem"
              ><i class="icon icon-eye"></i> 能见度 {{ now.visibility }}km</span
            ><span style="margin-right: 1rem"
              ><i class="icon icon-thermometer"></i> 体感温度 {{ now.feels_like }}℃</span
            >
          </p>
          <p style="font-size: 1.2rem">
            <span style="margin-right: 1rem"
              ><i class="icon icon-alert-triangle"></i> 首要污染物
              {{ city.primary_pollutant }}</span
            >
          </p>
          <p style="font-size: 14px; opacity: 0.6; height: 19px; line-height: 19px">
            上次更新时间 {{ now.last_update }}
          </p>
          <img :src="now.code" alt="weather" />
        </div>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WeatherNow",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapGetters("home", ["now", "city"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchLive", this.value);
    },
    ...mapActions(["home/airNow", "home/weatherNow"]),
  },
  created() {
    this.$store.dispatch("home/airNow");
    this.$store.dispatch("home/weatherNow");
    console.log(this.now);
    console.log(this.city);
  },
};
</script>

<style lang="scss">
.weatherNow {
  .excellent {
    background-color: #35f064;
  }
  .good {
    background-color: #f0cc35;
  }
  .poor {
    background-color: #f04b35;
  }
  padding: 0 0.25rem;
  > .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .now {
      position: relative;
      height: 36.5rem;
      background: url("../../assets/img/weatherBgc.jpg") no-repeat;
      background-size: 100% 100%;
      padding: 12px 16px;
      .value {
        position: absolute;
        right: 4rem;
        top: 2rem;
        color: #fff;
        transform: translateY(-50%);
      }
      .el-divider--horizontal {
        margin: 12px 0;
        background: rgba(255, 255, 255, 0.24);
      }
      .at-input__original {
        width: 15rem;
        border-radius: 25%;
        font-family: "Microsoft Yahei";
        border: none;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 49px;
        padding: 5px 13px;
        // width: 251px;
        height: 2rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 20px;
        font-size: 14px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: rgba(255, 255, 255, 0.7);
      }
      .city {
        // position: relative;
        p,
        .p {
          color: #fff;
          margin-bottom: 0.7rem;
          .at-popover__popper {
            width: 250px;
            height: 100px;
            color: #475669;
          }
        }
        .p {
          margin-bottom: 0;
          .air {
            display: inline-block;
            position: relative;
            border-radius: 18px;
            font-size: 14px;
            padding: 3px 10px 3px 3px;
            cursor: pointer;
            .icon {
              display: inline-block;
              width: 18px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              border-radius: 50%;
              background-color: #fff;
              margin-right: 0.4rem;
              margin-left: 0.1rem;
            }
            .air-detail {
              display: none;
              position: absolute;
              top: 2.5rem;
              left: -6.2rem;
              background-color: #fff;
              width: 280px;
              border-radius: 5px;
              box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
              .inner {
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                font-size: 18px;
                padding: 8px 16px;
                text-align: center;
                color: #fff;
              }
              .table {
                .table-item {
                  width: 33.33%;
                  padding: 6px;
                  border-right: 1px solid #e2ecf4;
                  border-bottom: 1px solid #e2ecf4;
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  p {
                    margin: 0.15rem 0;
                  }
                }
              }
            }
          }
        }
        .air:hover .air-detail {
          display: block;
        }
        .air-detail::before {
          content: " ";
          width: 15px;
          height: 15px;
          background-color: var(--bgc);
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-45%) rotate(45deg);
        }
        img {
          position: absolute;
          right: 4rem;
          top: 34%;
        }
      }
    }
  }
}
</style>
