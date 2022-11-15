<template>
  <div class="overview-wrapper">

    <div class="map-view-wrapper box-shadow-base">

      <map-location :search="false" :markerdata="siteData"></map-location>
    </div>
    <div class="view-data-wrapper box-shadow-base">
      <el-scrollbar class="left-scrollbar">
        <el-table v-loading="loading" :data="list" highlight-current-row :row-class-name="tableRowClassName" @row-click="handleClick">

          <el-table-column :label="$t(`route['Enterprise/Site']`)" prop="name" width="120" />
          <el-table-column :label="$t('common.Address')" prop="address" :show-overflow-tooltip="true" width="150" />
          <el-table-column :label="$t(`common['Device Statistics']`)" prop="statistics" :show-overflow-tooltip="true"
            width="150" />
          <el-table-column :label="$t('common.Status')" align="center" width="100"></el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { getAllSite,getMonitorData } from "@/api/monitor/overview"
import MapLocation from "@/components/Map"
export default {
  components:{
    MapLocation
  },
  data() {
    return {
      total: 0,
      list: [],
      loading: false,
      siteData:[]
    }
  },
  created() {
    this.getSite()
    this.getList()
  },
  methods: {
    handleClick(row){
      console.log(row);
    },
    getSite(){
      getAllSite().then((res)=>{
        this.siteData = res.data
      })
    },
    getList() {
      this.loading = true
      getMonitorData().then((res) => {
        this.list = res.items
        this.loading = false
      })
    },
    tableRowClassName({ row }) {
      if (row.key == "true") {
        return 'hasChild';
      }
      return '';
    }
  }

}
</script>
<style lang="scss">
.overview-wrapper {
  height: 100%;

  .map-view-wrapper {
    position: absolute;
    width: calc(100% - 565px);
    height: 100%;
    -webkit-transition: width, .28s;
    transition: width, .28s;
    padding: 10px;
    background: #fff;
  }

  .view-data-wrapper {
    position: absolute;
    right: 0;
    padding: 10px;
    width: 550px;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    -webkit-transition: width, .28s;
    transition: width, .28s;

    .el-table tr.hasChild > td.el-table__cell {
      background-color: #f2f1f5 !important;
    }
  }
  .el-table__row {
    cursor: pointer;
  }

}
</style>