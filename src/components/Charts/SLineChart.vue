<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(newVal) {
        newVal && this.setOptions(newVal)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      let xNames = []
      chartData.data && chartData.data.forEach(function (item) {
        xNames.push(item.name)
      });
      this.chart.setOption({
        title: {
          text: chartData.title || "",
          x: "10px",
          y: "10px",
          show: true,
          textStyle: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "15"
          },
          // padding: [25, 0, 0, 0]
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        color: "#74C1E9",
        // grid: {
        //   top: "35px",
        //   left: "40px",
        //   right: "10px",
        //   bottom: "0px",
        //   containLabel: true
        // },
        xAxis: {
          type: "category",
          data: xNames
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true
          },
          minInterval: 1,
          splitLine: false
        },
        series: [{
          name: chartData.name,
          data: chartData.data,
          barWidth: 30,
          type: "bar"
        }]
      })
    }
  }
}
</script>
