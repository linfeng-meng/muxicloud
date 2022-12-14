import { mapState } from 'vuex'
import inputFilter from "@/components/TableFilter/input";
import timeFilter from "@/components/TableFilter/time";

export default {
  components: {
    inputFilter, timeFilter
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用删除
      multiple: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      listQuery: {
        asc: "",
        enterpriseUUID: "",
        siteUUID: "",
        orderby: "",
        page: 1,
        size: 50
      },
    };
  },
  created() {
    this.setUUID();
    this.getList();
  },
  methods: {
    setUUID: function () {
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
    // getList() {
    //   this.loading = true;
    // },
    /** 搜索enter操作 */
    handleQuery(query) {
      this.listQuery[query.prop] = query.searchTxt
      this.listQuery.page = 1
      this.getList();
    },
    /** time过滤操作 */
    searchListByTime(query) {
      const searchTime = query.searchTime;
      if (searchTime instanceof Array) {
        this.listQuery.startTime = this.parseTime(searchTime[0])
        this.listQuery.endTime = this.parseTime(searchTime[1])
      } else {
        this.listQuery.startTime = ""
        this.listQuery.endTime = ""
      }
      // this.listQuery.startTime = this.parseTime(query.searchTime[0])
      // this.listQuery.endTime = this.parseTime(query.searchTime[1])
      this.listQuery.page = 1
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.listQuery.page = 1;
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order)
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** 检查是否选中数据 */
    calCheckedIds() {
      if (this.multiple) {
        this.$message({
          type: "warning",
          message: this.$t(`common['Please select at least one record']`)
        })
        return false
      } else {
        return true
      }
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.listQuery.orderBy = column.prop;
      this.listQuery.asc = column.order;
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
      handler: function (newVal) {
        newVal.id && (this.setUUID(), this.getList())
      },
      deep: true
    }
  },
}
