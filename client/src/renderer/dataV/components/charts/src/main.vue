<template>
  <div class="dv-charts-container" :ref="ref">
    <div class="charts-canvas-container" :ref="chartRef" />
  </div>
</template>

<script>
import Charts from "@jiaminghi/charts";
import { uuid } from "../../../util/index";

import autoResize from "../../../mixin/autoResize";

function deepClone(target) {
  if (typeof target === "object" && target) {
    const cloneObj = {};
    Object.keys(target).forEach((key) => {
      const val = target[key];
      if (typeof val === "object" && val) {
        cloneObj[key] = deepClone(val); // 是对象就再次调用该函数递归
      } else {
        cloneObj[key] = val; // 基本类型的话直接复制值
      }
    });
    return cloneObj;
  }
  return target;
}
function obj2arr(obj) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    arr[key] = obj[key];
  });
  return arr;
}
export default {
  name: "DvCharts",
  mixins: [autoResize],
  props: ["option", "optionDate", "series1", "series2", "series3"],
  data() {
    const id = uuid();
    return {
      ref: `charts-container-${id}`,
      chartRef: `chart-${id}`,
      chart: null,
      date: [],
    };
  },
  watch: {
    option() {
      // eslint-disable-next-line prefer-const
      let { chart, option } = this;
      if (!chart) return;

      if (!option) option = {};

      chart.setOption(option, true);
    },
    optionDate(newValue) {
      this.date = newValue;
    },
    series1(newValue) {
      const option = deepClone(this.option);
      option.legend.data = obj2arr(option.legend.data);
      option.yAxis = obj2arr(option.yAxis);
      option.yAxis[0].splitLine.style.lineDash = obj2arr(option.yAxis[0].splitLine.style.lineDash);
      option.xAxis.data = this.date;
      option.series = newValue;
      this.chart.setOption(option, true);
    },
    series2(newValue) {
      const option = deepClone(this.option);
      option.xAxis.data = this.date;
      option.series = newValue;
      this.chart.setOption(option, true);
    },
    series3(newValue) {
      const option = deepClone(this.option);
      option.legend.data = obj2arr(option.legend.data);
      option.yAxis = obj2arr(option.yAxis);
      option.xAxis.data = this.date;
      option.series = newValue;
      this.chart.setOption(option, true);
    },
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initChart } = this;

      initChart();
    },
    initChart() {
      const { $refs, chartRef, option } = this;

      const chart = (this.chart = new Charts($refs[chartRef]));

      if (!option) return;

      chart.setOption(option);
    },
    onResize() {
      const { chart } = this;

      if (!chart) return;

      chart.resize();
    },
  },
  updated() {
    console.log(1);
  },
  //   created() {
  //     console.log(this.option);
  //   },
};
</script>
