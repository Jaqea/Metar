<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "weather",
};
</script>

<style lang="scss">
body {
  #nprogress .bar {
    background: #6190e8 !important; //自定义颜色
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
  }
  /*定义滚动条轨道
 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(100, 193, 250);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块
 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: 0 1px 12px 0 #6190e8;
    background-color: #6190e8;
  }
}
</style>
