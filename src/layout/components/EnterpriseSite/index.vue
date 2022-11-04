<template>
  <div id="site-container" class="site-container">
    <div class="site-tree-container">

      <el-popover placement="bottom-start" width="308" trigger="click" v-model="visible">
        <div class="head-container">
          <div class="head-container">
            <el-input v-model="filterSite" :placeholder="$t(`common['Please input search key']`)" clearable size="small" prefix-icon="el-icon-search"
              style="margin-bottom: 20px" />
          </div>
          <el-tree :data="options" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode"
            ref="tree" default-expand-all highlight-current node-key="id" :current-node-key="selected"
            @node-click="changeSite" />
        </div>
        <el-input slot="reference" :placeholder="$t(`company['Please select an enterprise/site']`)" prefix-icon="el-icon-menu" suffix-icon="el-icon-d-caret"
          size="small" readonly="readonly" auto-complete="off" v-model="site">
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-popover>
    </div>
  </div>
</template>
<script>
import cache from "@/plugins/cache";
import { mapState } from 'vuex'
export default {
  name: 'EnterpriseSite',
  data() {
    return {
      visible: false,
      filterSite: "",
      defaultProps: {
        children: "children",
        label: "name"
      },
      list: []
    }
  },
  watch: {
    filterSite: {
      handler(val) {
        this.$refs.tree.filter(val);
      },
    }
  },
  created() {
    //获取企业列表
    this.list = this.$store.getters.enterpriseSiteList
  },
  methods: {
    getCurrentData(id, list) {
      for (const i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          this.$store.dispatch('enterprise/setEnterprise', list[i].id)
          this.$store.dispatch('enterprise/setSite', "")
          cache.local.set("last_select_site_id", list[i].id)
          this.site = list[i].name
          return
        } else {
          for (const j = 0; j < list[i].children.length; j++) {
            if (list[i].children[j].id === id) {
              this.$store.dispatch('enterprise/setEnterprise', list[i].id)
              this.$store.dispatch('enterprise/setSite', list[i].children[j].id)
              cache.local.set("last_select_site_id", list[i].children[j].id)
              this.site = list[i].children[j].name
              return
            }
          }
        }
      }
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 节点单击事件
    changeSite(data) {
      this.$store.dispatch("enterprise/changeSite", {
        currentSite: data,
        redirect: !0
      })
    },
  },
  computed: {
    ...mapState({
      currentSite: state => state.enterprise.currentSite,
      siteTreeFresh: state => state.enterprise.siteTreeFresh,
    }),
    //默认选中的站点name
    site: function () {
      return this.currentSite.name
    },
    //默认选中的站点id
    selected: function () {
      return this.currentSite.id
    },
    //重构企业/站点树形结构
    options: function () {
      let options = []
      return this.list && this.list instanceof Array && this.list.length > 0 && this.list.forEach(function (item) {
        let listArr = []
        if (item.site && item.site instanceof Array && item.site.length > 0) {
          item.site.forEach(function (childItem) {
            listArr.push({
              parentId: childItem.enterpriseuuid,
              id: childItem.siteuuid,
              name: childItem.sitename
            })
          })
        }
        let s = {
          parentId: 0,
          id: item.enterpriseuuid,
          name: item.enterprisename,
          children: listArr
        };
        options.push(s)
      }), options
    }
  },
  watch: {
    siteTreeFresh: function (e) {
      e && this.freshSiteTree()
    }
  },
}
</script>
<style lang="scss" scoped>
.site-container {
  height: 40px;
  width: 100%;
  padding: 5px 15px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .site-tree-container {
    line-height: 30px;
    width: 308px;

    .el-input__inner {
      border-radius: 0px !important;
    }
  }
}
</style>