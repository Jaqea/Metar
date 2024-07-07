<template>
  <div class="content">
    <div class="row at-row">
      <div class="col-md-4">
        <at-menu active-name="1" inline-collapsed>
          <at-menu-item name="1" to="/home">首页</at-menu-item>
          <at-menu-item name="2" to="/weatherNow">气象实况信息</at-menu-item>
          <at-submenu>
            <template slot="title">气象预报</template>
            <at-menu-item name="3-1" to="/predictWeather">天气类</at-menu-item>
            <at-menu-item name="3-2" to="/predictAir">空气类</at-menu-item>
            <at-menu-item name="3-3" to="/predictSea">海洋类</at-menu-item>
          </at-submenu>
          <at-submenu>
            <template slot="title">气象指标评估</template>
            <at-menu-item name="4-1" to="/weatherLife">生活指数</at-menu-item>
            <at-menu-item name="4-2" to="/weatherCalendar">农历节气生肖</at-menu-item>
            <at-menu-item name="4-3" to="/weatherSun">日出日落</at-menu-item>
            <at-menu-item name="4-4" to="/weatherMoon">月出月落月相</at-menu-item>
          </at-submenu>
          <at-menu-item name="5" to="/weatherDisaster">气象灾害预警</at-menu-item>
          <at-menu-item name="6" to="/weatherVisuality">气象数据可视化</at-menu-item>
          <at-submenu v-show="user.type === 'admin' ? true : false">
            <template slot="title">后台管理</template>
            <at-menu-item name="7-1" to="/userManage">用户管理</at-menu-item>
            <at-menu-item name="7-2" to="/dataManage">气象数据管理</at-menu-item>
            <at-menu-item name="7-3" to="/announceManage">气象公告管理</at-menu-item>
          </at-submenu>
        </at-menu>
      </div>
      <div class="col-md-16">
        <div id="container">
          <router-view></router-view>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="avatar">
            <img :src="user.imageUrl" alt="avatar" /><i :class="'el-icon-' + sex"></i>
          </div>
          <h1>{{ user.nickName }}</h1>
          <p>{{ user.email }}</p>
          <p>
            <el-tag type="warning" size="large" @click="userData">{{ user.download }}</el-tag>
          </p>
          <p style="font-size: 12px; color: #aaacae">气象数据下载量</p>
          <p style="padding: 1rem; padding-bottom: 0.5rem">
            {{ user.signature }}
          </p>
          <el-divider content-position="right">{{ user.nickName }}</el-divider>
        </div>
        <div class="row flex flex-center" style="padding-top: 16rem">
          <at-button size="large" type="primary" @click="edit">编辑信息</at-button>
          <at-button size="large" @click="logout">退出登录</at-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Content",
  data() {
    return {
      type: "Home",
      map: null,
    };
  },
  computed: {
    sex() {
      if (this.user.sex === "男") return "male";
      if (this.user.sex === "女") return "female";
      return "";
    },
    ...mapGetters("user", ["user"]),
  },
  methods: {
    edit() {
      this.$router.push({
        name: "UserInfo",
      });
    },
    logout() {
      this.$store.dispatch("user/logout", JSON.parse(localStorage.getItem("user")).email);
    },
    userData() {
      this.$router.push({
        name: "UserData",
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.content {
  .at-btn--large {
    padding: 8px 0;
    padding-right: 14px;
    i {
      font-size: 1.15rem;
    }
  }
  > div > .col-md-16 {
    min-height: 50rem;
    background-color: #f7f8fd;
  }
  .col-md-4:first-child,
  .col-md-16 {
    padding-top: 1rem;
    border-right: 1px solid #e2ecf4;
  }
  .at-menu--inline {
    width: 100% !important;
    border-right: none;
  }
  .col-md-4:last-child {
    padding: 1rem 8px;
    .row:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      //   text-align: center;
      .el-tag {
        padding: 0 2rem;
        font-size: 24px;
        margin-top: 0.5rem;
        cursor: pointer;
      }
      .avatar {
        width: 6rem;
        height: 6rem;
        margin-bottom: 1rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
        }
        .el-icon-male {
          position: absolute;
          bottom: -10px;
          right: -10px;
          color: #6190e8;
          font-size: 1rem;
          font-weight: bold;
        }
        .el-icon-female {
          position: absolute;
          bottom: -10px;
          right: -10px;
          color: #e861d2;
          font-size: 1rem;
          font-weight: bold;
        }
      }
      .el-divider--horizontal {
        margin: 0;
      }
      p {
        margin-bottom: 0.5rem;
        text-align: center;
      }
    }
    .row:last-child {
      .at-btn--large {
        width: 100%;
        padding: 8px 20px;
        margin: 0.55rem 1rem 0 1rem;
      }
    }
  }
}
</style>
