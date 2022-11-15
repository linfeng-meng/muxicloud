<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:devicelog:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean"
          v-hasPermi="['monitor:devicelog:remove']">{{ $t('common.Clear') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['monitor:devicelog:export']">{{ $t('common.Export') }}</el-button>
      </el-col>
    </el-row>

    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      @filter-change="filterHandler" :default-sort="defaultSort" @sort-change="handleSortChange"
      :header-cell-class-name="'border-right'">
      <el-table-column type="selection" width="55" align="center" v-hasPermi="['monitor:devicelog:remove']" />
      <el-table-column column-key="type" :label="$t('common.Type')" align="left" prop="type" width="200" sortable
        :filters="[{ text: 'AP', value: '1' },
        { text: 'AC', value: '2' },
        { text: $t('route.Gateway'), value: '3' },
        { text: $t('route.Switch'), value: '4' },
        { text: 'CAP', value: '5' },
        { text: $t('route.Controller'), value: '6' },
        { text: 'MESH', value: '7' }]" :formatter="typeFormat">
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="sn" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t('common.SN')" queryKey="sn" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="mac" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t('common.MAC')" queryKey="mac" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="ip" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t('common.IP')" queryKey="ip" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="sitename" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t(`company['Site name']`)" queryKey="sitename" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column column-key="status" :label="$t('common.Status')" align="left" prop="status" width="100" sortable
        :filters="[{ text: $t(`common['Online']`), value: '2' },
        { text: $t(`common['Offline']`), value: '1' }]" :filter-multiple="false" :formatter="statusFormat">
      </el-table-column>
      <el-table-column class-name="column-search-cell" align="left" prop="createtime" sortable>
        <template slot="header">
          <time-filter :titleName="$t(`common['Update time']`)" queryKey="createtime" @search-list="searchListByTime">
          </time-filter>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" :refresh="true"/>

  </div>
</template>

<script>
import tablemixin from '@/views/mixins/tablemixin'
import { devicelogList, delDevicelog, cleanDevicelog } from "@/api/monitor/log";
export default {
  name: "Devicelog",
  mixins:[tablemixin],
  data() {
    return {
      // 默认排序
      defaultSort: { prop: 'createtime', order: 'descending' },
      // 查询参数
      listQuery: {
        asc: "",
        enterpriseUUID: "",
        siteUUID: "",
        sitename: "",
        startTime: "",
        endTime: "",
        ip: "",
        mac: "",
        sn: "",
        status: "",
        type: null,
        orderby: "",
        page: 1,
        size: 50
      },
    };
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.loading = true;
      devicelogList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 过滤操作 */
    filterHandler(column) {
      const queryKey = Object.keys(column)[0];
      if (column[queryKey].length > 0) {
        this.listQuery[queryKey] = column[queryKey]
      } else {
        this.listQuery[queryKey] = null
      }
      this.listQuery.page = 1
      this.getList();
    },
    /** 类型重置 */
    typeFormat(row, column) {
      const type = row.type
      switch (type) {
        case '1':
          return "AP"
        case '2':
          return  "AC"
        case '3':
          return this.$t(`route['Gateway']`)
        case '4':
          return this.$t(`route['Switch']`)
        case '5':
          return this.$t('CAP')
        case '6':
          return this.$t(`route['Controller']`)
        case '7':
          return this.$t(`MESH`)
        default:
          return this.$t(`common['Unknow']`)
      }
    },
    /** 状态重置 */
    statusFormat(row, column) {
      const type = row.type
      switch (type) {
        case '1':
          return this.$t(`common['Offline']`)
        case '2':
          return this.$t(`common['Online']`)
        default:
          return this.$t(`common['Unknow']`)
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.id || this.ids;
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return delDevicelog(operIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Delete success']`));
      }).catch(() => { });
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return cleanDevicelog();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Clear success']`));
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('log/termlog/export', {
        ...this.listQuery
      }, `devicelog_${new Date().getTime()}.xlsx`)
    }
  },
};
</script>

