<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:operlog:remove']">{{$t('common.Delete')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean"
          v-hasPermi="['monitor:operlog:remove']">{{$t('common.Clear')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['monitor:operlog:export']">{{$t('common.Export')}}</el-button>
      </el-col>
    </el-row>

    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      :default-sort="defaultSort" @sort-change="handleSortChange"
      :header-cell-class-name="'border-right'">
      <el-table-column type="selection" width="55" align="center" v-hasPermi="['monitor:operlog:remove']"/>
      <el-table-column class-name="column-search-cell" prop="creatorName" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t('logs.Operator')" queryKey="creatorName" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column :label="$t('logs.Content')" align="left" prop="logMsg" sortable>
      </el-table-column>
      <el-table-column class-name="column-search-cell" align="left" prop="logTime"
        width="180" sortable>
        <template slot="header">
          <time-filter :titleName="$t(`common['Update time']`)" queryKey="logTime" @search-list="searchListByTime">
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
import { operlogList, delOperlog, cleanOperlog } from "@/api/monitor/log";
export default {
  name: "Operlog",
  mixins:[tablemixin],
  data() {
    return {
      // 默认排序
      defaultSort: { prop: 'logTime', order: 'descending' },
      // 查询参数

      listQuery: {
        asc: "",
        creatorName: "",
        startTime: "",
        endTime: "",
        enterpriseUUID: "",
        siteUUID: "",
        orderby: "",
        page: 1,
        size: 10
      },
    };
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.loading = true;
      operlogList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.loading = false;
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.id || this.ids;
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return delOperlog(operIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Delete success']`));
      }).catch(() => { });
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return cleanOperlog();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t(`common['Clear success']`));
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('log/operlog/export', {
        ...this.listQuery
      }, `operlog_${new Date().getTime()}.xlsx`)
    }
  },
};
</script>

