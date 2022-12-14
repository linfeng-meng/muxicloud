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
    timeType: {
      type: String,
      default: '1'
    },
    dates: {
      type: Array,
      default: []
    },
    data: {
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
    data: {
      deep: true,
      handler(newVal) {
        newVal && this.setOptions()
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
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        color: this.data.color,
        legend: {
          data: this.data.legend
        },
        grid: {
          top: "35px",
          left: "40px",
          right: "10px",
          bottom: "0px",
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dates,
          axisLabel: {
            rotate: 60,
            interval: "1" === this.timeType ? 23 : "auto"
          }
        },
        yAxis: {
          type: "value",
          name: this.data.yName || "",
          left: "20%",
          boundaryGap: [0, "100%"],
          axisLabel: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#315070"
            }
          },
          minInterval: 1,
          splitLine: false
        },
        series: this.data.series
      })
    }
  }
}
</script>
