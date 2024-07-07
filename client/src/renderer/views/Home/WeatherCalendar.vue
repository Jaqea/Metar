<template>
  <div class="weatherCalendar">
    <at-card
      :noHover="true"
      style="width: 100%; margin: 0 auto"
      :body-style="{ padding: '0' }"
      :bordered="false"
      :loading="false"
    >
      <div class="predictBody">
        <div class="now">
          <div class="flex flex-between">
            <div class="card-item" v-for="(item, index) in calendar" :key="index">
              <h3>
                {{ item.date + `（${item.lunar_year}-${item.lunar_month}-${item.lunar_day}）` }}
              </h3>
              <div class="flex flex-between">
                <h1>{{ item.lunar_day }}</h1>
                <div>
                  <p>
                    <strong>{{ `【${item.zodiac}年】` }}</strong
                    >{{ item.lunar_month_name + item.lunar_day_name }}
                  </p>
                  <p>{{ `${item.ganzhi_year}年 ${item.ganzhi_month}月 ${item.ganzhi_day}日` }}</p>
                  <p v-show="item.lunar_festival" style="color: #d02f12">
                    <strong>{{ item.lunar_festival }}</strong>
                  </p>
                  <p>
                    {{ item.lunar_leap_month ? item.lunar_leap_month : "无闰月" }}
                    <span style="color: #d02f12">{{
                      item.solar_term ? item.solar_term : "无节气"
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </at-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeatherCalendar",
  data() {
    return { value: "" };
  },
  computed: {
    ...mapGetters("home", ["calendar"]),
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchCalendar", this.value);
    },
  },
  mounted() {
    this.$store.dispatch("home/calendar");
    console.log(this.calendar);
  },
};
</script>

<style lang="scss">
.weatherCalendar {
  padding: 0 0.25rem;
  background: transparent;
  height: 49rem;
  overflow-x: auto;
  padding-bottom: 5rem;
  .at-card {
    background: transparent;
    border-top: 1px solid #e2ecf4;
    .now {
      position: relative;
      > div {
        flex-wrap: wrap;
        .card-item {
          width: 32.5%;
          height: 11rem;
          border: 1px solid #e2ecf4;
          background-color: #fff;
          text-align: center;
          box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
          margin-bottom: 1rem;

          > h3 {
            padding: 16px;
            border-bottom: 1px solid #e2ecf4;
            color: #79a1eb;
          }
          > div {
            h1 {
              padding: 0 0.5rem;
              font-size: 5rem;
              color: #79a1eb;
              border-right: 1px solid #e2ecf4;
            }
            div {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              p {
                padding-bottom: 0.2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
