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
    usage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
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
  watch: {
    usage: {
      handler(newVal) {
        newVal && this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        color: ["#69D28F", "#E4EBF1"],
        graphic: [{
          type: "group",
          top: "middle",
          left: "center",
          id: "data",
          children: [{
            type: "text",
            id: "current",
            top: 0,
            style: {
              text: `${this.$t("common.Used")}${this.usage}%`,
              font: 'bolder 1.2em "Microsoft YaHei", sans-serif',
              fill: "#69D28F",
              textAlign: "center"
            }
          }]
        }],
        series: [{
          // name: this.$t("common.used"),
          // name: "123123123",
          type: "pie",
          radius: ["50%", "70%"],
          hoverAnimation: !1,
          avoidLabelOverlap: !1,
          showSymbol: "none",
          label: {
            show: !1,
            position: "center"
          },
          labelLine: {
            show: !0
          },
          data: [{
            value: this.usage,
            itemStyle: {
              normal: {
                color: "#69D28F"
              },
              emphasis: {
                color: "#69D28F"
              }
            }
          },
          {
            value: 100 - this.usage,
            itemStyle: {
              normal: {
                color: "#E4EBF1"
              },
              emphasis: {
                color: "#E4EBF1"
              }
            }
          }]
        }]
      })
    }
  }
}
</script>
