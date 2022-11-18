import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 数据
      list: [],
      // 查询参数
      listQuery: {
        enterpriseUUID: "",
        siteUUID: "",
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
      handler: function (newVal) {
        newVal.id && (this.setUUID(), this.getList())
      },
      deep: !0
    }
  },
}
