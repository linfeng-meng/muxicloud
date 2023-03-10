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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
    setOptions({ ratios, dates } = {}) {
      this.chart.setOption({
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#344C67",
            fontSize: "12",
            // margin: 23,
            rotate: "45" //标签倾斜的角度
          },
          data: dates,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: "value",
          name: this.$t("device.Occupancy"),
          // nameGap: 25, //y轴name与横纵坐标轴线的间距
          nameTextStyle: {
            color: "#4F5D79"
          },
          splitLine: {
            lineStyle: {
              color: ["#E4EBF1"]
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value} %'
          },
          min: 0,
          max: 100
        },
        series: [{
          // name: 'expected', 
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: ratios,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        ]
      })
    }
  }
}
</script>
