<template>
  <div class="container">
    <div class="flex">
      <div class="flex empty">
        <div class="logo flex">
          <img style="margin-left: 0.5rem" src="../assets/logo.png" alt="logo" />
          <span class="flex">Metar</span>
        </div>
      </div>
      <div class="flex btn flex-end">
        <at-button @click="minize" size="large" type="text" icon="icon-minus"></at-button>
        <at-button @click="closed" size="large" type="text" icon="icon-x"></at-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  props: ["type"],
  methods: {
    minize() {
      this.$electron.ipcRenderer.send(`min${this.type}`);
    },
    closed() {
      this.$electron.ipcRenderer.send(`close${this.type}`);
    },
  },
};
</script>

<style lang="scss">
.container {
  .empty {
    width: 85%;
    -webkit-app-region: drag;
    .logo {
      padding-left: 0.1rem;
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
    .at-btn--large {
      padding: 8px 0;
      padding-right: 14px;
      i {
        font-size: 1.15rem;
      }
    }
  }
}
</style>
