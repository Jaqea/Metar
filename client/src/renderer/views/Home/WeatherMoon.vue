<template>
  <div class="weatherMoon">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :body-style="{ padding: '0' }"
      :bordered="false"
      :loading="false"
    >
      <div class="predictBody">
        <div class="now">
          <div style="position: sticky; top: 0; z-index: 1; text-align: right">
            <at-input
              v-model="value"
              @keyup.enter.native="search"
              size="large"
              placeholder="请输入城市名"
              append-button
            >
            </at-input>
            <span class="value"><i class="icon icon-map-pin"></i> {{ moon.name }} </span>
          </div>
          <div>
            <at-card
              :noHover="true"
              style="width: 100%"
              :body-style="{ padding: '8px 16px' }"
              :bordered="false"
              :loading="false"
            >
              <at-table :columns="columnsMoon" :data="moon.moons" stripe></at-table>
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
  name: "WeatherMoon",
  data() {
    return {
      value: "",
      columnsMoon: [
        {
          title: "月出时间",
          key: "rise",
        },
        {
          title: "月落时间",
          key: "set",
        },
        {
          title: "月球被照明部分比例",
          key: "fraction",
        },
        {
          title: "月相",
          key: "phase",
        },
        {
          title: "月相名称",
          key: "phase_name",
        },
        {
          title: "日期",
          key: "date",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("home", ["moon"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchMoon", this.value);
    },
  },
  mounted() {
    this.$store.dispatch("home/moon");
  },
};
</script>

<style lang="scss">
.weatherMoon {
  padding: 0 0.25rem;
  background: transparent;
  overflow-y: scroll;
  margin-bottom: 5rem;
  height: 49rem;
  overflow-x: auto;
  .at-card {
    .now {
      position: relative;
      .at-input__original {
        width: 15rem;
        font-family: "Microsoft Yahei";
        height: 2rem;
        line-height: 20px;
        font-size: 14px;
      }
      .value {
        position: absolute;
        right: 2.5rem;
        top: 1.8rem;
        transform: translateY(-50%);
      }
      > div:first-child {
        background-color: #fff;
        padding: 12px 16px;
        border: 1px solid #e2ecf4;
      }
      > div:last-child {
        border: 1px solid #e2ecf4;
        box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
        margin-bottom: 5rem;
        padding-bottom: 2rem;
        .at-table__cell {
          text-align: center;
        }
      }
    }
  }
}
</style>
