<template>
  <div class="home">
    <div class="container">
      <div class="row at-row">
        <div class="col-md-4" style="-webkit-app-region: drag">
          <div class="flex empty">
            <div class="logo flex">
              <img style="margin-left: 0.5rem" src="../assets/logo.png" alt="logo" />
              <span class="flex">Metar</span>
            </div>
          </div>
        </div>
        <div class="col-md-16 flex flex-end" style="-webkit-app-region: drag">
          <div class="col-md-9 flex flex-end flex-middle" style="-webkit-app-region: no-drag">
            <span>{{ currentTime }}</span>
            <span>{{ locationInfo.name }}</span>
            <span style="font-size: 24px">{{ locationInfo.temperature }}℃</span>
            <span>{{ locationInfo.text }}</span>
          </div>
        </div>
        <div class="col-md-4 flex flex-end">
          <at-button @click="minimize" size="large" type="text" icon="icon-minus"></at-button>
          <at-button
            @click="maximize"
            v-show="!isMax"
            size="large"
            type="text"
            icon="icon-maximize"
          ></at-button>
          <at-button
            @click="restore"
            v-show="isMax"
            size="large"
            type="text"
            icon="icon-minimize-2"
          ></at-button>
          <at-button @click="closed" size="large" type="text" icon="icon-x"></at-button>
        </div>
      </div>
      <Content />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      type: "Home",
      timer: "",
      currentTime: new Date(),
    };
  },
  computed: {
    ...mapGetters("home", ["isMax", "locationInfo"]),
  },
  methods: {
    showLogin() {
      this.$electron.ipcRenderer.send("openLogin");
    },
    minimize() {
      this.$electron.ipcRenderer.send(`min${this.type}`);
    },
    maximize() {
      this.$electron.ipcRenderer.send(`max${this.type}`);
      this.$store.commit("home/isMax", !this.isMax);
    },
    restore() {
      this.$electron.ipcRenderer.send(`restore${this.type}`);
      this.$store.commit("home/isMax", !this.isMax);
    },
    closed() {
      this.$electron.ipcRenderer.send(`close${this.type}`);
    },
    getNowTime() {
      let dateTime;
      const yy = new Date().getFullYear();
      const mm = new Date().getMonth() + 1;
      const dd = new Date().getDate();
      const hh = new Date().getHours();
      const mf =
        new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
      const ss =
        new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();
      // eslint-disable-next-line prefer-const
      dateTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
      console.log(dateTime);
      return dateTime;
    },
  },
  mounted() {
    this.$store.dispatch("home/getHome");
    // this.$store.dispatch("home/location");
    this.$store.commit("user/created");
    const _this = this;
    // eslint-disable-next-line func-names
    this.timer = setInterval(function () {
      _this.currentTime =
        // 修改数据date
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  components: {
    Content: (resolve) => require(["components/home/Content.vue"], resolve),
  },
};
</script>

<style lang="scss">
body {
  background-color: rgba(0, 0, 0, 0) !important;
  overflow: hidden;
}
.home {
  background-color: #fff;
  border: 1px solid #e2ecf4;
  box-shadow: inset 0 0 10px #719dee;
  border-radius: 30px;
  border-radius: 1rem;
  .container {
    width: 100%;
    > .row {
      border-bottom: 1px solid #e2ecf4;
    }
    .at-btn--large {
      padding: 8px 0;
      padding-right: 14px;
      i {
        font-size: 1.15rem;
      }
    }
    .col-md-4:first-child,
    .col-md-16 {
      .col-md-9 {
        position: relative;
        span {
          padding-right: 0.8rem;
          height: 1.2rem;
          line-height: 1.2rem;
        }
      }
      .col-md-9::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
        right: -4px;
        width: 6px;
        height: 100%;
        background-color: #6190e8;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 12px 0 #6190e8;
        transition: opacity 0.2s;
        opacity: 1;
      }
    }

    .col-md-4:first-child {
      .empty {
        width: 100%;
        .logo {
          padding-left: 1.2rem;
          span {
            align-items: center;
            font-size: 20px;
            font-family: "Times New Roman", Times, serif;
          }
          img {
            width: 4rem;
            height: 4rem;
          }
        }
      }
      .btn {
        width: 15%;
      }
    }
  }
}
</style>
