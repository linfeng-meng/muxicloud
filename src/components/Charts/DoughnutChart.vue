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
      default: '200px'
    },
    data: {
      type: Object,
      default: {}
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
    data: {
      handler(newVal) {
        newVal && this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      var legends = [];
      this.data.data.forEach((item) => {
        legends.push(item.name)
      });
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: this.data.title || "",
          x: "5%",
          y: "10px",
          show: true,
          textStyle: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "15"
          },
          // padding: [25, 0, 0, 0]
        },
        color: this.data.color,
        legend: {
          show: true,
          x: "61%",
          y: "center",
          orient: "vertical",
          align: "left",
          data: legends
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: this.data.name || this.data.title || "",
          type: "pie",
          radius: ['40%', '70%'],
          center: ["35%", "60%"],
          itemStyle: {
            borderRadius: 20,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
          },
          data: this.data.data
        }],
      })
    }
  }
}
</script>
