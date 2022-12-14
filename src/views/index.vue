<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :sm="24" style="padding:5px">
        <div class="cell">
          <el-radio-group v-model="timeType" size="medium" @change="changeTimeType">
            <el-radio-button label="0">{{ $t(`device['Nearly day']`) }}</el-radio-button>
            <el-radio-button label="1">{{ $t(`device['Nearly week']`) }}</el-radio-button>
            <el-radio-button label="2">{{ $t(`device['Nearly month']`) }}</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="line-charts">
      <el-col :sm="24" :md="8" :lg="8" class="line-col">
        <div class="cell">
          <div class="chart-title">
            {{ $t(`dashboard['Terminal Number']`) }}
          </div>
          <DLineChart :timeType="timeType" :dates="dates" :data="staTendency"></DLineChart>
          <DLineChart :timeType="timeType" :dates="dates" :data="apFlowTendency"></DLineChart>
        </div>
      </el-col>
      <el-col :sm="24" :md="8" :lg="8" class="line-col">
        <div class="cell">
          <div class="health">

            <div class="health_grade">
              <div class="health_box">
                <div class="lt border"></div>
                <div class="rt border"></div>
                <div class="lb border"></div>
                <div class="rb border"></div>
                <div class="square" :style="{'borderColor':healthColor}"></div>
              </div>
              <div class="health_result" :style="{'color':healthColor}">{{ health }}</div>
            </div>
          </div>
          <div class="device-desc">
            <div :title="$t(`common['Gateway']`)" class="device-item">
              <svg-icon icon-class="gateway" class="device-svg" />
              <div class="status_content">
                <div>{{ $t(`common['Gateway']`) }}</div>
                <div class="statusBox">
                  <span class="online dot"></span>
                  <span>{{ $t(`common['Online']`) }}</span>：
                  <span v-if="healthStatus.dcme">{{ healthStatus.dcme.on }}</span>
                </div>
                <div class="statusBox">
                  <span class="offline dot"></span>
                  <span>{{ $t(`common['Offline']`) }}</span>：
                  <span v-if="healthStatus.dcme">{{ healthStatus.dcme.off }}</span>
                </div>
              </div>
            </div>
            <div :title="$t(`route['Controller']`)" class="device-item">
              <svg-icon icon-class="controller" class="device-svg" />
              <div class="status_content">
                <div>{{ $t(`route['Controller']`) }}</div>
                <div class="statusBox">
                  <span class="online dot"></span>
                  <span>{{ $t(`common['Online']`) }}</span>：
                  <span v-if="healthStatus.dscc">{{ healthStatus.dscc.on }}</span>
                </div>
                <div class="statusBox">
                  <span class="offline dot"></span>
                  <span>{{ $t(`common['Offline']`) }}</span>：
                  <span v-if="healthStatus.dscc">{{ healthStatus.dscc.off }}</span>
                </div>
              </div>
            </div>
            <div :title="$t(`route['Switch']`)" class="device-item">
              <svg-icon icon-class="switcher" class="device-svg" />
              <div class="status_content">
                <div>{{ $t(`route['Switch']`) }}</div>
                <div class="statusBox">
                  <span class="online dot"></span>
                  <span>{{ $t(`common['Online']`) }}</span>：
                  <span v-if="healthStatus.switchboard">{{ healthStatus.switchboard.on }}</span>
                </div>
                <div class="statusBox">
                  <span class="offline dot"></span>
                  <span>{{ $t(`common['Offline']`) }}</span>：
                  <span v-if="healthStatus.switchboard">{{ healthStatus.switchboard.off }}</span>
                </div>
              </div>
            </div>
            <div :title="$t(`route['AC']`)" class="device-item">
              <svg-icon icon-class="ac" class="device-svg" />
              <div class="status_content">
                <div>{{ $t(`route['AC']`) }}</div>
                <div class="statusBox">
                  <span class="online dot"></span>
                  <span>{{ $t(`common['Online']`) }}</span>：
                  <span v-if="healthStatus.ac">{{ healthStatus.ac.on }}</span>
                </div>
                <div class="statusBox">
                  <span class="offline dot"></span>
                  <span>{{ $t(`common['Offline']`) }}</span>：
                  <span v-if="healthStatus.ac">{{ healthStatus.ac.off }}</span>
                </div>
              </div>
            </div>
            <div :title="$t(`route['AP']`)" class="device-item">
              <svg-icon icon-class="ap" class="device-svg" />
              <div class="status_content">
                <div>{{ $t(`route['AP']`) }}</div>
                <div class="statusBox">
                  <span class="online dot"></span>
                  <span>{{ $t(`common['Online']`) }}</span>：
                  <span v-if="healthStatus.ap">{{ healthStatus.ap.on }}</span>
                </div>
                <div class="statusBox">
                  <span class="offline dot"></span>
                  <span>{{ $t(`common['Offline']`) }}</span>：
                  <span v-if="healthStatus.ap">{{ healthStatus.ap.off }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :md="8" :lg="8" class="line-col">
        <div class="cell">
          <div class="chart-title">
            {{ $t(`dashboard['Terminal authentication status']`) }}
          </div>
          <DLineChart :timeType="timeType" :dates="dates" :data="userTendency"></DLineChart>
          <SLineChart :chartData="activeAp"></SLineChart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="pie-charts">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" class="pie-col">
        <div class="cell">
          <DoughnutChart :data="onlineTime"></DoughnutChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" class="pie-col">
        <div class="cell">
          <DoughnutChart :data="frequency"></DoughnutChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" class="pie-col">
        <div class="cell">
          <DoughnutChart :data="signal"></DoughnutChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" class="pie-col">
        <div class="cell">
          <DoughnutChart :data="alarm"></DoughnutChart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mixin from '@/views/mixins/mixin'
import { parseTime } from '@/utils/common'
import DoughnutChart from '@/components/Charts/DoughnutChart'
import DLineChart from '@/components/Charts/DLineChart'
import SLineChart from '@/components/Charts/SLineChart'
import { getStaStatus, getHealthStatus, getActiveAp, getAlarmMap, getSignalMap, getChannelMap, getOnlineTimeMap } from "@/api/dashboard";
export default {
  name: "Index",
  components: { DLineChart, SLineChart, DoughnutChart },
  mixins: [mixin],
  data() {
    return {
      timeType: "0",
      dates: [],
      staTendency: {
        color: ["#74C1E9", "#F0A62B"],
        legend: ["2.4G", "5G"],
        series: [{ "name": "2.4G", "type": "line", "smooth": true, "symbol": "none", "data": [] },
        { "name": "5G", "type": "line", "smooth": true, "symbol": "none", "data": [] }]
      },
      apFlowTendency: {
        color: ["#74C1E9", "#F0A62B"],
        yName: "Mbps",
        legend: [this.$t(`dashboard['Uplink Rate']`), this.$t(`dashboard['Downlink Rate']`)],
        series: [{ "name": this.$t(`dashboard['Uplink Rate']`), "type": "line", "smooth": true, "symbol": "none", "data": [] },
        { "name": this.$t(`dashboard['Downlink Rate']`), "type": "line", "smooth": true, "symbol": "none", "data": [] }]
      },
      userTendency: {
        color: ["#74C1E9", "#F0A62B"],
        legend: [this.$t(`dashboard['Authenticated']`), this.$t(`dashboard['Terminal Online']`)],
        series: [{ "name": this.$t(`dashboard['Authenticated']`), "type": "line", "smooth": true, "symbol": "none", "data": [] },
        { "name": this.$t(`dashboard['Terminal Online']`), "type": "line", "smooth": true, "symbol": "none", "data": [] }]
      },
      activeAp: {
        title: this.$t(`dashboard['Active devices']`),
        name: this.$t(`dashboard['Active devices']`),
        data: []
      },
      healthStatus: {},
      onlineTime: {
        title: this.$t(`dashboard['Online duration of terminal']`),
        name: this.$t(`dashboard['Online duration']`),
        color: ["#6EBB55", "#00C9CB", "#FF3C6F", "#986FBB"],
        data: []
      },
      frequency: {
        title: this.$t(`dashboard['Frequency Allocation']`),
        color: ["#6EBB55", "#00C9CB", "#FF3C6F", "#986FBB"],
        data: []
      },
      signal: {
        title: this.$t(`dashboard['Signal intensity']`),
        color: ["#6EBB55", "#00C9CB", "#FF3C6F", "#986FBB"],
        data: []
      },
      alarm: {
        title: this.$t(`dashboard['Alarm']`),
        color: ["#007FDC", "#FFA826", "#FF4400", "#BE0000", "#986FBB"],
        data: []
      },
    };
  },
  mounted() {
    this.getList();
    this.timer = setInterval(() => {
      this.getList();
    }, 10000);
  },
  computed: {
    health() {
      if (this.healthStatus.healthNum <= 30) {
        return this.$t(`dashboard['Bad']`)
      } else if (30 <= this.healthStatus.healthNum && this.healthStatus.healthNum <= 70) {
        return this.$t(`dashboard['Good']`)
      } else {
        return this.$t(`dashboard['Excellent']`)
      }
    },
    healthColor(){
      if (this.healthStatus.healthNum <= 30) {
        return "#FF4400"
      } else if (30 <= this.healthStatus.healthNum && this.healthStatus.healthNum <= 70) {
        return "#FFA826"
      } else {
        return "#0069ff"
      }

    }
  },
  methods: {
    async getList() {
      await this.getStaList()
      const healthData = await getHealthStatus(this.listQuery)
      const activeApData = await getActiveAp(this.listQuery)
      const onlineTimeData = await getOnlineTimeMap(this.listQuery)
      const frequencyData = await getChannelMap(this.listQuery)
      const signalData = await getSignalMap(this.listQuery)
      const alarmData = await getAlarmMap(this.listQuery)

      this.activeAp.data = this.formatStaData(activeApData.data)

      this.healthStatus = healthData.data

      this.onlineTime.data = this.formatData(onlineTimeData.data)
      this.frequency.data = this.formatData(frequencyData.data)
      this.signal.data = this.formatData(signalData.data)
      this.alarm.data = this.formatData(alarmData.data)
      this.loading = false;

    },
    async getStaList() {
      const staData = await getStaStatus(this.listQuery)
      this.dates = this.getDates(staData.data.dates)
      this.staTendency.series[0].data = this.formatStaData(staData.data.online24GList)
      this.staTendency.series[1].data = this.formatStaData(staData.data.online5GList)
      this.apFlowTendency.series[0].data = this.formatStaData(staData.data.inflowList)
      this.apFlowTendency.series[1].data = this.formatStaData(staData.data.outflowList)
      this.userTendency.series[0].data = this.formatStaData(staData.data.authList)
      this.userTendency.series[1].data = this.formatStaData(staData.data.onlineList)
    },
    changeTimeType(timetype) {
      this.timeType = timetype
      this.getStaList()
    },
    formatData(data) {
      const that = this
      data && data.forEach((item, i) => {
        if (that.$te(`dashboard['${item.name}']`)) {
          data[i].name = this.$t(`dashboard['${item.name}']`)
        }
      })
      return data
    },
    formatStaData(data) {
      let arr = []
      data && data.forEach((item, i) => {
        if (item === null) {
          arr.push("")
        } else {
          arr.push(item)
        }
      })
      return arr
    },
    getDates(dates) {
      const that = this
      let i = []
      dates.forEach(function (t, n) {
        let l = that.timeFormat(t);
        i.push(l)
      });
      return i
    },
    timeFormat: function (time) {
      if ("2" === this.timeType || "1" === this.timeType) {
        return parseTime(time, "{m}-{d} {h}:{i}")
      }
      return parseTime(time, "{h}:{i}")
    },
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
};
</script>

<style scoped lang="scss">
.line-charts {
  min-height: 650px;
  height: 66%;

  .chart-title {
    font-size: 15px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    position: relative;
  }

  .line-col {
    padding: 5px !important;
    height: 100%;
  }

}

.pie-charts {
  min-height: 200px;

  .pie-col {
    padding: 5px !important;
    height: 33%;
  }
}

.cell {
  background-color: #f4f4f7;
  height: 100%;
  padding: 6px 6px;
  position: relative;
}

.health {
  min-height: 300px;
  position: relative;

  .health_grade {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    margin-top: -75px;

    .health_result {
      width: 100%;
      text-align: center;
      line-height: 150px;
      position: relative;
      font-size: 22px;
      color: #01d5c7;
      font-weight: 700;
    }

    .health_box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      .border {
        position: absolute;
        border-color: #01d5c7;
        border-style: solid;
        width: 18px;
        height: 18px;
      }

      .lt {
        left: 0;
        top: 0;
        border-width: 1px 0 0 1px;
        border-radius: 10px 0 0;
      }

      .rt {
        right: 0;
        top: 0;
        border-width: 1px 1px 0 0;
        border-radius: 0 10px 0;
      }

      .lb {
        left: 0;
        bottom: 0;
        border-width: 0 0 1px 1px;
        border-radius: 0 0 0 10px;
      }

      .rb {
        right: 0;
        bottom: 0;
        border-width: 0 1px 1px 0;
        border-radius: 0 0 10px;
      }

      .square {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-style: solid;
        border-width: 8px;
        // border: 8px solid #0069ff;
        padding: 6px;
        border-radius: 15px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        opacity: .75;
      }

    }
  }
}

.device-desc {
  min-height: 330px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  font-size: 12px;
  color: #324558;

  .device-item {
    cursor: pointer;
    width: 33.333%;

    .device-svg {
      font-size: 30px;
    }

    .status_content {
      width: 120px;
      margin: 0 auto;
    }

    div {
      margin-top: 5px;
    }

    .statusBox {
      text-align: left;
      margin-left: 20px;

      span.dot {
        display: inline-block;
        margin-right: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      span.online {
        background: #22ca90;
      }

      span.offline {
        background: #c92b70;
      }
    }
  }
}
</style>

