<template>
  <div class="highcharts"></div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  props: ["options", "styles", "series", "text", "categories"],
  name: "Highcharts",
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    categories() {
      this.initChart();
    },
    series(newValue) {
      this.chart.update({
        series: newValue,
      });
    },
    text(newValue) {
      this.chart.setTitle({ text: newValue });
    },
  },
  methods: {
    initChart() {
      this.$el.style.width = `${`${this.styles.width}` || "800px"}`;
      this.$el.style.height = `${`${this.styles.height}` || "400px"}`;
      this.chart = new Highcharts.Chart(this.$el, this.options);
      if (this.series) {
        this.chart.update({
          series: this.series,
        });
      }
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style lang="scss" scoped>
.highcharts {
  width: 800px;
  height: 400px;
}
</style>
