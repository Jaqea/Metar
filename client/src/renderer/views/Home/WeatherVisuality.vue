<template>
  <div class="weatherVisuality">
    <dv-border-box-11 :title="'当前位置：' + option.name">
      <div class="input">
        <at-input
          v-model="value"
          @keyup.enter.native="search"
          size="large"
          placeholder="请输入城市名"
        >
        </at-input>
        <dv-decoration-3 style="width: 50%; height: 32px" />
      </div>
      <dv-border-box-8>
        <at-card :no-hover="true" :bodyStyle="{ padding: '0' }" :bordered="false">
          <h4 slot="title">空气质量实况排行</h4>
          <div slot="extra">质量指数</div>
          <div>
            <dv-scroll-ranking-board :config="config" style="height: 39rem" />
          </div>
        </at-card>
      </dv-border-box-8>
      <dv-border-box-1>
        <at-card :no-hover="true" :bodyStyle="{ padding: '0' }" :bordered="false">
          <h4 slot="title">气温与降水量走势-{{ option.year }}年</h4>
          <div style="width: 100%; height: 13rem; transform: translateY(-2rem)">
            <dv-charts :option="option" :optionDate="optionDate" :series1="series1" />
          </div>
        </at-card>
      </dv-border-box-1>
      <dv-border-box-4>
        <at-card :no-hover="true" :bodyStyle="{ padding: '0' }" :bordered="false">
          <h4 slot="title">15日降水概率-{{ option.year }}年</h4>
          <div style="width: 100%; height: 13rem; margin: 0 auto; transform: translateY(-2rem)">
            <dv-charts :option="option1" :optionDate="optionDate" :series2="series2" />
          </div>
        </at-card>
      </dv-border-box-4>
      <dv-border-box-12>
        <at-card :no-hover="true" :bodyStyle="{ padding: '0' }" :bordered="false">
          <h4 slot="title">降水量与相对湿度走势-{{ option.year }}年</h4>
          <div style="width: 100%; height: 13rem; margin: 0 auto; transform: translateY(-2rem)">
            <dv-charts :option="option2" :optionDate="optionDate" :series3="series3" />
          </div>
        </at-card>
      </dv-border-box-12>
    </dv-border-box-11>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeatherVisuality",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    config() {
      return {
        data: this.airRank,
        sort: false,
        rowNum: 14,
        waitTime: 1000,
      };
    },
    ...mapGetters("home", [
      "airRank",
      "option",
      "option1",
      "option2",
      "optionDate",
      "series1",
      "series2",
      "series3",
    ]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchWeatherVisuality", this.value);
    },
  },
  mounted() {
    this.$store.dispatch("home/airRank");
    this.$store.dispatch("home/weatherVisuality");
  },
};
</script>

<style lang="scss">
.weatherVisuality {
  margin: 0 -4px;
  margin-top: -1rem;
  color: #47d6fd;
  background-color: #060c18 !important;
  height: 60rem;
  overflow-y: scroll;
  margin-bottom: 2rem;
  .at-input {
    width: 50%;
  }
  .at-input__original {
    width: 100%;
    // border-radius: 25%;
    font-family: "Microsoft Yahei";
    border: none;
    background: rgba(255, 255, 255, 0.2);
    padding: 5px 13px;
    height: 2rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 20px;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: rgba(255, 255, 255, 0.7);
  }
  .at-card {
    background: transparent;
    .at-card__title {
      display: inline-block;
    }
    .at-card__head {
      border-bottom: 1px solid #47d6fd;
      padding: 0;
    }
    .info-name {
      padding-left: 0.5rem;
    }
  }
  h4 {
    color: #47d6fd;
  }
  .dv-border-box-11 {
    height: 77.5%;
    transform: translateY(-0.5rem);
    position: relative;
    .dv-border-box-8 {
      position: absolute;
      right: 0.8rem;
      top: 3.5rem;
      width: 40%;
      height: 91%;
      padding: 8px 12px;
      .rank {
        height: 100%;
      }
    }
    .input {
      display: flex;
      width: 56%;
      position: absolute;
      left: 0;
      top: 3rem;
      margin: 8px 16px;
    }
    .dv-border-box-1,
    .dv-border-box-4,
    .dv-border-box-12 {
      position: absolute;
      left: 0;
      height: 29%;
      padding: 5px 0;
      .at-card {
        margin: 8px 16px;
      }
    }
    .dv-border-box-1 {
      width: 58%;
      top: 5.4rem;
      padding-left: 0.5rem;
    }
    .dv-border-box-4 {
      width: 57%;
      top: 18.8rem;
      margin-left: 0.5rem;
      padding-left: 0.5rem;
    }
    .dv-border-box-12 {
      width: 57%;
      top: 32.5rem;
      margin-left: 0.5rem;
    }
  }

  //   height: 20rem;
}
</style>
