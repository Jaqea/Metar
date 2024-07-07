<template>
  <div class="weatherLife">
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
            <span class="value"><i class="icon icon-map-pin"></i> {{ life.name }} </span
            ><span style="font-size: 12px; position: relative; right: 1.5rem"
              >上次更新时间：{{ life.last_update }}</span
            >
          </div>
          <div>
            <at-card
              :noHover="true"
              style="width: 100%"
              :body-style="{ padding: '0' }"
              :bordered="false"
              :loading="false"
            >
              <div class="flex flex-between">
                <div class="card-item" v-for="(item, index) in life.suggestion" :key="index">
                  <div>
                    <img :src="item.img" alt="icon" />
                    <p>{{ item.name }}</p>
                    <h2>{{ item.brief }}</h2>
                    <p class="flex flex-center flex-middle">{{ item.details }}</p>
                  </div>
                </div>
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
  name: "WeatherLife",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    search() {
      this.$store.dispatch("home/searchLife", this.value);
    },
  },
  computed: {
    ...mapGetters("home", ["life"]),
  },
  mounted() {
    this.$store.dispatch("home/life");
    console.log(this.life);
  },
};
</script>

<style lang="scss">
.weatherLife {
  padding: 0 0.25rem;
  background: transparent;
  overflow-y: scroll;
  margin-bottom: 5rem;
  height: 49rem;
  overflow-x: auto;
  .at-card:first-child {
    background-color: transparent;
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
      .at-card {
        background: transparent;
        margin-bottom: 5rem;
        div {
          flex-wrap: wrap;
          .card-item {
            width: 23%;
            height: 11rem;
            border: 1px solid #e2ecf4;
            background-color: #fff;
            text-align: center;
            box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
            margin-bottom: 1rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            > div {
              transition: all 0.3s;
              p:last-child {
                margin-top: 3rem;
                height: 11rem;
                background-color: #fff;
                padding: 0 1rem;
                text-align: left;
                //   transform: translateY(-10rem);
              }
            }
            p {
              margin: 0.5rem 0;
            }
            img {
              width: 2.5rem;
              height: 2.5rem;
              margin-top: 1.5rem;
            }
            h2 {
              font-weight: 400;
              margin-bottom: 1.5rem;
            }
          }
          .card-item:hover > div {
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
