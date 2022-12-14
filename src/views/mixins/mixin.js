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
      },
    };
  },
  created() {
    this.setUUID();
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
