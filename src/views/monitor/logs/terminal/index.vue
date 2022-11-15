<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:termlog:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean"
          v-hasPermi="['monitor:termlog:remove']">{{ $t('common.Clear') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['monitor:termlog:export']">{{ $t('common.Export') }}</el-button>
      </el-col>
    </el-row>

    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      :default-sort="defaultSort" @sort-change="handleSortChange" :header-cell-class-name="'border-right'">
      <el-table-column type="selection" width="55" align="center" v-hasPermi="['monitor:termlog:remove']" />
      <el-table-column class-name="column-search-cell" prop="username" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t('logs.Operator')" queryKey="username" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="usermac" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t(`logs['Terminal MAC']`)" queryKey="usermac" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="userip" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t(`logs['Terminal IP']`)" queryKey="userip" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" align="left" prop="onlineTime" sortable>
        <template slot="header" slot-scope="scope">
          <time-filter :titleName="$t(`logs['Online time']`)" queryKey="onlineTime" @search-list="searchListByTime">
          </time-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" align="left" prop="offlineTime" sortable>
        <template slot="header">
          <time-filter :label="$t(`logs['Offline time']`)" :titleName="$t(`logs['Offline time']`)"
            queryKey="offlineTime" @search-list="searchListByTime">
          </time-filter>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" />

  </div>
</template>

<script>
import tablemixin from '@/views/mixins/tablemixin'
import { termlogList, delTermlog, cleanTermlog } from "@/api/monitor/log";
export default {
  name: "Termlog",
  mixins:[tablemixin],
  data() {
    return {
      // 默认排序
      defaultSort: { prop: 'onlineTime', order: 'descending' },
      // 查询参数

      listQuery: {
        asc: "",
        enterpriseUUID: "",
        siteUUID: "",
        username: "",
        userip: "",
        usermac: "",
        onlineStartTime: "",
        onlineEndTime: "",
        offlineStartTime: "",
        offlineEndTime: "",
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
      termlogList(this.addDateRange(this.listQuery, this.dateRange)).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** time过滤操作 */
    searchListByTime(query) {
      if (query.prop == "onlineTime") {
        this.listQuery.onlineStartTime = this.parseTime(query.searchTime[0])
        this.listQuery.onlineEndTime = this.parseTime(query.searchTime[1])
      } else {
        this.listQuery.offlineStartTime = this.parseTime(query.searchTime[0])
        this.listQuery.offlineEndTime = this.parseTime(query.searchTime[1])
      }
      this.listQuery.page = 1
      this.getList();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.id || this.ids;
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return delTermlog(operIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Delete success']`));
      }).catch(() => { });
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return cleanTermlog();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Clear success']`));
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('log/termlog/export', {
        ...this.listQuery
      }, `termnaillog_${new Date().getTime()}.xlsx`)
    }
  },
};
</script>

