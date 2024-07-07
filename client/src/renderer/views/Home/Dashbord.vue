<template>
  <div class="dashbord">
    <div class="row">
      <div v-for="(item, index) in dashbordList" :key="index" class="col-md-8">
        <at-card
          :noHover="true"
          style="width: 100%"
          :body-style="{ padding: '8px 24px', 'font-size': '30px' }"
          :bordered="false"
          :loading="false"
        >
          <h4 slot="title">{{ item.title }}</h4>
          <div>
            {{ item.number }}
            <p class="flex flex-end">
              <span :class="item.color"><i :class="item.iconClass"></i>{{ item.variety }}</span>
            </p>
          </div>
        </at-card>
      </div>
    </div>
    <div class="row flex row-second">
      <div class="col-md-16 flex">
        <at-card
          :noHover="true"
          style="width: 100%"
          :body-style="{ padding: '8px 24px', 'font-size': '30px' }"
          :bordered="false"
          :loading="false"
        >
          <div>
            <el-carousel style="width: 100%" :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="(item, index) in imgList" :key="index">
                <img :src="item" alt="轮播图片" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </at-card>
      </div>
      <div class="col-md-8">
        <at-card
          :noHover="true"
          style="width: 100%"
          :body-style="{ padding: '11px 24px' }"
          :bordered="false"
          :loading="false"
        >
          <h4 slot="title">最新气象公告</h4>
          <div slot="extra">
            <at-button style="padding: 6px 0" @click="more('announce')" type="text"
              >更多>></at-button
            >
          </div>
          <div>
            <p
              class="flex flex-between"
              @click="getNewAnnounce(index)"
              v-for="(item, index) in newAnnounceList"
              :key="index"
            >
              <span style="width: 70%; overflow: hidden; text-overflow: ellipsis">
                <i class="icon icon-link"></i>{{ item.title }}</span
              >
              <span style="width: 3.5rem; font-size: 12px">{{ item.last_upload }}</span>
            </p>
          </div>
        </at-card>
      </div>
    </div>
    <div class="row flex">
      <div class="col-md-16 flex">
        <at-card
          :noHover="true"
          style="width: 100%"
          :body-style="{ padding: '8px 24px', 'font-size': '30px' }"
          :bordered="false"
          :loading="false"
        >
          <div class="flex">
            <Highcharts
              :series="series4"
              :text="title3"
              :options="option3"
              :styles="styles"
              :categories="categories"
              ref="simpleChart"
            ></Highcharts>
          </div>
        </at-card>
      </div>
      <div class="col-md-8">
        <at-card
          :noHover="true"
          style="width: 100%"
          :body-style="{ padding: '8px 24px' }"
          :bordered="false"
          :loading="false"
        >
          <h4 slot="title">最新气象数据</h4>
          <div slot="extra">
            <at-button style="padding: 6px 0" @click="more('data')" type="text">更多>></at-button>
          </div>
          <div>
            <p
              class="flex flex-between"
              @click="getNewData(index)"
              v-for="(item, index) in newDataList"
              :key="index"
            >
              <span style="width: 70%; overflow: hidden; text-overflow: ellipsis">
                <i class="icon icon-link"></i>{{ item.name }}</span
              >
              <span style="width: 3.5rem; font-size: 12px">{{ item.time }}</span>
            </p>
          </div>
        </at-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);
export default {
  name: "Dashbord",
  data() {
    return {
      slide: [1, 2, 3, 4, 5],
      styles: {
        // width: "100%",
        height: "270px",
      },
    };
  },
  computed: {
    newDataList() {
      let data = [];
      if (this.dataList.length > 8) for (let i = 0; i < 8; i++) data.push(this.dataList[i]);
      else data = [...this.dataList];
      return data;
    },
    newAnnounceList() {
      let data = [];
      if (this.announceList.length > 7) for (let i = 0; i < 7; i++) data.push(this.announceList[i]);
      else data = [...this.announceList];
      return data;
    },
    ...mapGetters("home", [
      "dataList",
      "announceList",
      "dashbordList",
      "option3",
      "title3",
      "series4",
      "categories",
      "imgList",
    ]),
  },
  methods: {
    getNewData(index) {
      this.$router.push({
        name: "UserDataDetail",
        params: {
          isNew: 0,
          index,
        },
      });
    },
    getNewAnnounce(index) {
      this.$router.push({
        name: "AnnounceDetail",
        params: {
          isNew: 0,
          index,
        },
      });
    },
    more(name) {
      if (name === "data")
        this.$router.push({
          name: "DataDetail",
        });
      else
        this.$router.push({
          name: "Announcement",
        });
    },
  },
  components: {
    Highcharts: (resolve) => require(["components/home/Highcharts.vue"], resolve),
  },
  created() {
    this.$store.dispatch("home/getHome");
    this.$store.dispatch("home/getAllAnnounce");
    this.$store.dispatch("home/getAllData");
  },
};
</script>

<style lang="scss" scoped>
.dashbord {
  img {
    width: 100%;
    height: 100%;
  }
  > .row:nth-child(1) {
    height: 8rem;
  }
  > .row:nth-child(2) {
    height: 16rem;
  }
  > .row:nth-child(3) {
    height: 17.6rem;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .col-md-8 {
    padding: 0px 0.5rem;
    .at-card {
      box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    }
    .at-card__title h4 {
      font-size: 14px;
      color: #aaacae;
    }
    p {
      font-size: 14px;
      .up,
      .equal {
        color: #58c8a8;
      }
      .down {
        color: #f7a2a2;
      }
      i {
        padding-right: 0.5rem;
      }
    }
  }
  .row {
    margin-bottom: 1rem;
  }
  > .row:last-child,
  .row-second {
    .col-md-16 {
      padding: 0 0.5rem;
      border-right: none;
      .at-card {
        box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
      }
    }
    .col-md-8 {
      padding: 0px 0.5rem;
      .at-card {
        box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
      }
      .at-card__body {
        p {
          padding-bottom: 0.5rem;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          transition: color 0.1s;
          i {
            padding-right: 0.25rem;
          }
        }
        p:hover {
          color: #79a1eb;
        }
      }
    }
  }
}
</style>
