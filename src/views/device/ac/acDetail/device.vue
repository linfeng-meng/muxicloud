<template>
  <div class="app-container">
    <el-table ref="tables" v-loading="loading" :data="list" @filter-change="filterHandler"
      @sort-change="handleSortChange" :header-cell-class-name="'border-right'">
      <el-table-column column-key="status" :label="$t('common.Status')" align="left" prop="status" sortable
        :filters="[{ text: $t(`common['Online']`), value: '2' },
        { text: $t(`common['Offline']`), value: '1' }]" :filter-multiple="false" :formatter="statusFormat">
      </el-table-column>
      <el-table-column :label="$t('common.Name')" prop="name" align="left" sortable>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="sn" align="left" sortable>
        <template slot="header">
          <input-filter :titleName="$t('common.SN')" queryKey="sn" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column class-name="column-search-cell" prop="mac" align="left"  sortable>
        <template slot="header">
          <input-filter :titleName="$t('common.MAC')" queryKey="mac" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column>
      <el-table-column :label="$t('device.Model')" prop="modelName" align="left" sortable>
      </el-table-column>
      <el-table-column :label="$t('device.Channel')" prop="channel" align="left" sortable>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" :refresh="true" @refresh-method="getList"/>

  </div>
</template>

<script>
import tablemixin from '@/views/mixins/tablemixin'
import { deviceList } from "@/api/device/ac";
export default {
  name: "Devicelog",
  mixins: [tablemixin],
  data() {
    return {
      // 查询参数
      listQuery: {
        asc: "",
        enterpriseUUID: "",
        siteUUID: "",
        mac: "",
        sn: "",
        status: "",
        orderby: "",
        page: 1,
        size: 50
      },
    };
  },
  methods: {
    /** 查询 */
    getList() {
      this.loading = true;
      deviceList(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.total;
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
    /** 状态重置 */
    statusFormat(row, column) {
      const status = row.status
      switch (status) {
        case '0':
          return this.$t(`common['Offline']`)
        case '1':
          return this.$t(`common['Online']`)
        default:
          return this.$t(`common['Unknow']`)
      }
    },
  },
};
</script>

