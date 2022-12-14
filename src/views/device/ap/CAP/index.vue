<template>
  <div class="app-container">
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleCreate"
          v-hasPermi="['device:ac:add']">{{
              $t('common.Create')
          }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="acRemoveBatch"
          v-hasPermi="['device:ac:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-rank" size="mini" :disabled="multiple" @click="openAC = true"
          v-hasPermi="['device:ac:add']">{{
              $t('common.Move')
          }}</el-button>
      </el-col>
      <el-dropdown trigger="click" v-hasPermi="['device:ac:add']" @command="moreCommand">
        <el-button type="info" plain icon="el-icon-menu" size="mini">{{
            $t('common.More')
        }}</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-refresh-right" command="acReboot">{{ $t('device.Reboot') }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-upload2" command="acUpdata">{{ $t('device.Upgrade') }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-link" command="acCloudupload">{{ $t(`device['Remote Connect']`) }}
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-upload" command="handelControl">{{ $t(`device['Cloud Service Control']`) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row> -->
    <my-table :selection="true" :columns="columns" :list="list" @table-event="tableEvent"></my-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" :refresh="true" />

  </div>
</template>
<script>
import MyTable from '@/components/Table/MyTable'
// import tablemixin from '@/views/mixins/tablemixin'
import { getCAPList } from "@/api/device/ap";
export default {
  name: 'AC',
  components: {
    MyTable
  },
  // mixins: [tablemixin],
  data() {
    return {
      columns: [{
        text: this.$t("common.Status"),
        key: "status",
        align: "left",
        checked: true,
        field: true,
        width: 70,
        filters: [{
          text: this.$t("common.Online"),
          value: 1
        },
        {
          text: this.$t("common.Offline"),
          value: 0
        }],
        bindHtml: "statusHtml",
        htmlTip: "statusTip",
        filterMultiple: false
      },
      // {
      //   text: this.$t("device.apName"),
      //   key: "name",
      //   align: "left",
      //   checked: true,
      //   field: true,
      //   width: 180,
      //   filters: "FILTER_TXT",
      //   sort: "custom",
      //   tooltip: true,
      //   doClick: "showDetail"
      // },
      {
        text: this.$t("common.SN"),
        key: "sn",
        align: "left",
        checked: true,
        field: true,
        width: 220,
        filters: "FILTER_TXT",
        sort: "custom"
      },
      {
        text: this.$t("common.IP"),
        key: "ip",
        align: "left",
        checked: false,
        field: true,
        width: 140,
        filters: "FILTER_TXT",
        sort: "custom"
      },
      {
        text: this.$t("common.MAC"),
        key: "mac",
        align: "left",
        checked: false,
        field: true,
        width: 160,
        filters: "FILTER_TXT"
      },
      {
        text: this.$t("device.Channel"),
        key: "trueChannel",
        align: "left",
        checked: true,
        field: true,
        filters: "FILTER_TIME",
        width: 130
      },
      {
        text: this.$t(`device['2.4G Channel Utilization']`),
        key: "radio1Utilization",
        align: "left",
        checked: false,
        field: true,
        width: 190,
        sort: "custom"
      },
      {
        text: this.$t(`device['5G Channel Utilization']`),
        key: "radio2Utilization",
        align: "left",
        checked: false,
        field: true,
        width: 190,
        sort: "custom"
      },
      // {
      //   text: this.$t("device.radio3_channel"),
      //   key: "radio3Utilization",
      //   align: "left",
      //   checked: false,
      //   field: true,
      //   width: 190,
      //   sort: "custom"
      // },
      {
        text: this.$t("device.Power"),
        key: "truePower",
        align: "left",
        checked: false,
        field: true,
        width: 130
      },
      {
        text: this.$t("device.Model"),
        key: "modelName",
        align: "left",
        checked: true,
        field: true,
        width: 180,
        tooltip: true,
        filters: "FILTER_TXT",
        sort: "custom"
      },
      {
        text: this.$t(`route['Device Group']`),
        key: "groupName",
        align: "left",
        checked: false,
        field: true,
        width: 150,
        tooltip: true
      },
      {
        text: this.$t("common.Version"),
        key: "version",
        align: "left",
        checked: false,
        field: true,
        width: 200,
        tooltip: true,
        filters: "FILTER_TXT",
        sort: "custom"
      },
      {
        text: this.$t(`device['Usage Mode']`),
        key: "workMode",
        align: "left",
        checked: true,
        field: true,
        width: 150,
        filters: [{
          text: this.$t(`device['Dial-up Mode']`),
          value: 2
        },
        {
          text: this.$t(`device['Bridge Pattern']`),
          value: 3
        },
        {
          text: this.$t(`device['Routing Pattern']`),
          value: 1
        }],
        filterMultiple: false
      },
      {
        text: this.$t(`device['IP Address']`),
        key: "ipAdress",
        align: "left",
        checked: false,
        field: true,
        width: 200,
        tooltip: true
      },
      // {
      //   text: this.$t("device.termNum"),
      //   key: "clientNum",
      //   align: "left",
      //   checked: true,
      //   field: true,
      //   width: 110,
      //   sort: "custom",
      //   bindHtml: "termNumHtml"
      // },
      {
        text: this.$t(`dashboard['Online duration']`),
        key: "onlineTime",
        align: "left",
        checked: false,
        field: true,
        width: 160,
        tooltip: true,
        sort: "custom"
      },
      {
        text: this.$t("device.Position"),
        key: "location",
        align: "left",
        checked: false,
        field: true,
        tooltip: true,
        width: 200
      },
      {
        text: this.$t(`device['Upgrade Status']`),
        key: "upgradeStatus",
        align: "left",
        checked: true,
        field: true,
        width: 120,
        filters: [{
          text: this.$t(`device['Upgrading']`),
          value: 1
        },
        {
          text: this.$t(`device['Upgrade Successed']`),
          value: 2
        },
        {
          text: this.$t(`device['Upgrade Failed']`),
          value: 3
        }],
        filterMultiple: false
      },
      {
        text: this.$t("common.Operation"),
        key: "operation",
        align: "left",
        checked: true,
        field: false,
        width: 90,
        button: [{
          type: "edit",
          roleKey: "cap_update"
        },
        {
          type: "delete",
          roleKey: "cap_delete"
        }]
      }],
      list: [],
      total: 0,
      listQuery: {
        asc: "",
        ip: "",
        mac: "",
        sn: "",
        name: "",
        publicIp: "",
        enterpriseUUID: "",
        siteUUID: "",
        status: "",
        orderby: "",
        page: 1,
        size: 50,
        upgradeStatus: "",
        enableImcloud: ""
      },
      updataData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      getCAPList(this.listQuery).then(response => {
        this.list = response.items;
        this.total = response.total;
        this.loading = false;
      });
    },
    tableEvent (params) {
      const func = params.funcName
      const arg = params.param;
      "undefined" !== typeof this[func] && this[func](arg)
    },
    sortChange(params){
      console.log(params);
    },
    searchList (params) {
      this.listQuery[params.prop] = params.searchTxt
      this.getList()
    },
    searchListByTime (params) {
      const searchTime = params.searchTime;
      if (searchTime instanceof Array) {
        this.listQuery.startTime = this.parseTime(searchTime[0])
        this.listQuery.endTime = this.parseTime(searchTime[1])
      } else {
        this.listQuery.startTime = ""
        this.listQuery.endTime = ""
      }
      this.listQuery.page = 1
      this.getList();
    },
  }

}
</script>