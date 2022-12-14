<template>
  <el-table ref="tables" :data="list" @selection-change="selectionChange" @filter-change="filterHandler"
    @sort-change="handleSortChange" :header-cell-class-name="'border-right'">
    <el-table-column v-if="selection" type="selection" width="55" align="center" />
    <el-table-column v-for="(item) in tableColumns" :key="item.key" :label="item.text"
      :class-name="item.filters ? 'column-search-cell' : ''" :prop="item.key" :align="item.align" :sortable="item.sort"
      :filters="Array.isArray(item.filters) ? item.filters : null" :filter-multiple="item.filterMultiple"
      :formatter="Array.isArray(item.filters) ? ((row) => columnFormat(row[item.key], item.filters)) : null"
      :width="item.trueWidth">
      <!-- <template v-if="Array.isArray(item.filters)" slot-scope="scope">
        <span v-for="v in item.filters" :key="v.value" v-if="v.value == scope.row[item.key]">
          {{v.text}}
        </span> 
      </template> -->
      <template v-if="item.filters == 'FILTER_TXT'" slot="header">
        <input-filter :titleName="item.text" :queryKey="item.key" @search-list="searchList">
        </input-filter>
      </template>
      <template v-if="item.filters == 'FILTER_TIME'" slot="header">
        <time-filter :titleName="item.text" :queryKey="item.key" @search-list="searchListByTime">
        </time-filter>
      </template>
    </el-table-column>
    <!-- <el-table-column column-key="status" :label="$t('common.Status')" align="left" prop="status" sortable :filters="[{ text: $t(`common['Online']`), value: '1' },
    { text: $t(`common['Offline']`), value: '0' }]" :filter-multiple="false" :formatter="statusFormat">
    </el-table-column>
    <el-table-column class-name="column-search-cell" prop="name" align="left" sortable>
      <template slot="header">
        <input-filter :titleName="$t('common.Name')" queryKey="name" @search-list="handleQuery">
        </input-filter>
      </template>
      <template slot-scope="scope">
        <el-link type="primary" @click="openDetail(scope.row.deviceUUID)">{{ scope.row.name }}</el-link>
      </template>
    </el-table-column>

    <el-table-column class-name="column-search-cell" prop="sn" align="left" sortable>
      <template slot="header">
        <input-filter :titleName="$t('common.SN')" queryKey="sn" @search-list="handleQuery">
        </input-filter>
      </template>
    </el-table-column>
    <el-table-column :label="$t(`device['AP Num']`)" prop="apTotal" align="left" sortable />
    <el-table-column column-key="status" :label="$t(`device['Upgrade Status']`)" align="left" prop="status" sortable
      :filters="[{ text: $t(`device['Upgrading']`), value: '1' },
      { text: $t(`device['Upgrade Successed']`), value: '2' },
      { text: $t(`device['Upgrade Failed']`), value: '3' }]" :filter-multiple="false" :formatter="upgradeFormat">
    </el-table-column>

    <el-table-column column-key="enableImcloud" :label="$t(`device['Cloud Service Control']`)" align="left"
      prop="enableImcloud" sortable :filters="[{ text: $t(`common['Enable']`), value: '1' },
      { text: $t(`common['Disable']`), value: '0' }]" :filter-multiple="false" :formatter="cloudFormat">
    </el-table-column>
    <el-table-column :label="$t('common.Operation')" width="180">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" v-hasPermi="['device:ac:edit']"
          @click="handleUpdate(scope.row)">{{ $t('common.Edit') }}</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" v-hasPermi="['device:ac:remove']"
          @click="acRemove(scope.row)">{{ $t('common.Delete') }}</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>
<script>
import inputFilter from "@/components/Table/TableFilter/input";
import timeFilter from "@/components/Table/TableFilter/time";
export default {
  components: {
    inputFilter, timeFilter
  },
  props: {
    offHeight: {
      type: Number,
      default: -1
    },
    fixHeight: {
      type: Number,
      default: -1
    },
    radiovalue: {
      type: String
    },
    lazy: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    radioselect: {
      type: Boolean,
      default: false
    },
    rowClickEnable: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    },
    columns: {
      type: Array
    },
    listQuery: {
      type: Object,
      default:
        function () {
          return {}
        }
    },
    timerQuery: {
      type: Object,
      default:
        function () {
          return {}
        }
    },
    scrollWidth: {
      type: Boolean,
      default:
        false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    tableColumns() {
      var columnsArr = [];
      return this.columns.forEach(function (item) {
        item.checked && (item.trueWidth = item.width, columnsArr.push(item))
      }), columnsArr
    }

  },
  methods: {
    selectionChange: function (selection) {
      this.selectList = selection
    },
    columnFormat(value, filtertext) {
      let text = ""
      filtertext.forEach(v => {
        if (v.value == value) {
          text = v.text
        }
      })
      return text
    },
    filterHandler(column) {
      const queryKey = Object.keys(column)[0];
      console.log(queryKey);
      this.$emit("table-event", {
        funcName: "fileterStatus",
        param: column
      })
    },
    handleSortChange(e) {
      this.$emit("table-event", {
        funcName: "sortChange",
        param: e
      })
    },
    searchList(e) {
      this.$emit("table-event", {
        funcName: "searchList",
        param: e
      })
    },
    searchListByTime(e) {
      this.timerQuery[e.prop] = e.searchTime,
        this.$emit("table-event", {
          funcName: "searchListByTime",
          param: e
        })
    },
  }

}
</script>