<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="6" :xl="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t(`device['Memory Usage']`) }}</span>
          </div>
          <div id="mem-pie-chart">
            <pie-chart :usage="data.usage" />
            <!-- <el-progress type="circle" :percentage="data.usage" :color="colors"></el-progress> -->
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :xl="20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t(`device['Memory Usage Trend']`) }}</span>
          </div>
          <div id="mem-line-chart">
            <div class="nearly">
              <el-radio-group v-model="timeType" size="medium" @change="changeTimeType">
                <el-radio-button label="1">{{ $t(`device['Nearly day']`) }}</el-radio-button>
                <el-radio-button label="2">{{ $t(`device['Nearly week']`) }}</el-radio-button>
                <el-radio-button label="3">{{ $t(`device['Nearly month']`) }}</el-radio-button>
              </el-radio-group>
            </div>
            <line-chart :chart-data="data" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PieChart from '@/components/Charts/PieChart'
import LineChart from '@/components/Charts/LineChart'
import { memoryPerformance } from "@/api/device/ac";
export default {
  components: { PieChart, LineChart },
  data() {
    return {
      charts1: "",
      data: {},
      timeType: "1",
      colors: [
        { color: '#6f7ad3', percentage: 20 },
        { color: '#1989fa', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#e6a23c', percentage: 80 },
        { color: '#f56c6c', percentage: 100 }
      ],
      // 查询参数
      listQuery: {
        enterpriseUUID: "",
        siteUUID: "",
        deviceUUID: "",
        timeType: "1"
      },
    };
  },
  created() {
    this.setUUID();
    this.getList();
  },
  methods: {
    getList() {
      memoryPerformance(this.listQuery).then(response => {
        this.data = response.data;
        // this.setChart(response.data.usage)
      });
    },

    // setChart: function (t) {
    //   var e = this.getOption1(t);
    //   if (this.charts1) this.charts1.setOption(e, !0);
    //   else {
    //     var i = c.a.init(document.getElementById("pie-chart"));
    //     i.setOption(e, !0),
    //       this.charts1 = i
    //   }
    // },
    changeTimeType(timetype) {
      this.timeType = timetype
      this.listQuery.timeType = this.timeType
      this.getList()
    },
    setUUID() {
      this.listQuery.deviceUUID = this.$route.query.id
      if (1 === this.currentSite.type) {
        this.listQuery.enterpriseUUID = this.currentSite.id
        this.listQuery.siteUUID = ""
      } else if (2 === this.currentSite.type) {
        this.listQuery.enterpriseUUID = this.currentSite.parentId
        this.listQuery.siteUUID = this.currentSite.id
      } else {
        this.listQuery.enterpriseUUID = ""
        this.listQuery.siteUUID = ""
      }
    },
    backList() {
      this.$router.push("/device/ac")
    },
    /** time过滤操作 */
    searchListByTime(query) {
      this.listQuery.startTime = this.parseTime(query.searchTime[0])
      this.listQuery.endTime = this.parseTime(query.searchTime[1])
      this.listQuery.page = 1
      this.getList();
    },
  },
  computed: {
    ...mapState({
      currentSite: state => state.enterprise.currentSite,
    }),
  },
  watch: {
    currentSite: {
      handler(newVal) {
        newVal.id && this.backList()
      },
      deep: true
    }
  },
}
</script>
<style lang="scss">
#mem-pie-chart {
  text-align: center;
}
</style>