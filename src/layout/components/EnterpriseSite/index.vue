<template>
  <div id="site-container" class="site-container">
    <div class="site-tree-container">
      
    <el-popover placement="bottom-start" width="308" trigger="click" v-model="visible">
      <div class="head-container">
          <div class="head-container">
            <el-input
              v-model="filterSite"
              placeholder="请输入关键字进行搜索"
              clearable
              size="small"
              prefix-icon="el-icon-search"
              style="margin-bottom: 20px"
            />
          </div>
          <el-tree
            :data="list"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            highlight-current
            node-key="id"
            :current-node-key="defaultSite"
            @node-click="handleNodeClick"
          />
      </div>
      <el-input
        slot="reference"
        placeholder="请选择企业/站点"
        prefix-icon="el-icon-menu"
        suffix-icon="el-icon-d-caret"
        size="small"
        readonly="readonly"
        auto-complete="off"
        v-model="site">
        <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
      </el-input>
    </el-popover>
    </div>
  </div>
</template>
<script>
import { enterpriseTreeSelect } from "@/api/system/user";
import cache from "@/plugins/cache";
export default {
  name: 'EnterpriseSite',
  data() {
    return {
      site:"",
      defaultSite:"",
      visible: false,
      filterSite:"",
      defaultProps:{
        children: "children",
        label: "label"
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
  created(){
    this.getEnterpriseTree()
      this.defaultSite = cache.local.get("last_select_site_id")
  },
  // mounted(){
  //   this.$nextTick(()=>{
  //     this.defaultSite = cache.local.get("last_select_site_id")
  //     console.log(this.defaultSite);
  //   })
  // },
  methods: {
    //获取企业列表
    async getEnterpriseTree() {
      const response = await enterpriseTreeSelect()
      this.list = this.filterData(response.data.trees)
      const currentId = cache.local.get("last_select_site_id") || this.list[0].id
      this.getCurrentData(currentId,this.list)
    },
    getCurrentData(id,list){
      for(const i = 0;i<list.length;i++){
        if(list[i].id === id){
          this.$store.dispatch('enterprise/setEnterprise',list[i].id)
          this.$store.dispatch('enterprise/setSite',"")
          cache.local.set("last_select_site_id",list[i].id)
          this.site = list[i].label
          return
        } else {
          for(const j = 0;j<list[i].children.length;j++){
            if(list[i].children[j].id === id){
              this.$store.dispatch('enterprise/setEnterprise',list[i].id)
              this.$store.dispatch('enterprise/setSite',list[i].children[j].id)
              cache.local.set("last_select_site_id",list[i].children[j].id)
              this.site = list[i].children[j].label
              return
            }
          }
        }
      }
    },
    filterData(data){
      let res = [];
      data.forEach((item)=>{
        let children = []
        item.site && item.site.forEach((itemS)=>{
          children.push({"id":itemS.siteuuid,"label":itemS.sitename,})
        })
        res.push({"id":item.enterpriseuuid,"label":item.enterprisename,"children":children})
      })
      return res
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data,node) {
      if(node.parent.data){
        this.$store.dispatch('enterprise/setEnterprise',node.parent.data.id)
        this.$store.dispatch('enterprise/setSite',data.id)
      } else {
        this.$store.dispatch('enterprise/setEnterprise',data.id)
        this.$store.dispatch('enterprise/setSite',"")
      }
      this.site = data.label
      this.visible = false
      this.filterSite = ""
      cache.local.set("last_select_site_id",data.id)
      // this.handleQuery();
    },
  }
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
  .site-tree-container{
    line-height: 30px;
    width: 308px;
    .el-input__inner{
      border-radius: 0px!important;
    }
  }
}
</style>