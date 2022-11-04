<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-dropdown placement="bottom-start" trigger="click" @command="handleAdd" v-hasPermi="['company:list:add']">
          <el-button type="primary" plain icon="el-icon-plus" size="mini">{{ $t('common.Create') }}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="enterprise">{{ $t('company["Create Enterprise"]') }}
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-plus" command="site">{{ $t('company["Create Site"]') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['company:list:edit']">{{ $t('common.Edit') }}</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['company:list:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>
    <!-- 表格数据 -->
    <el-table v-loading="loading" row-key="id" :data="enterpriseData" lazy :load="load"
      @selection-change="handleSelectionChange" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" :label="$t('common.Name')">
      </el-table-column>
      <el-table-column prop="address" :label="$t('common.Address')">
      </el-table-column>
      <el-table-column prop="deviceonlinesum,devicesum" :label="$t(`common['Device Statistics']`)">
        <template slot-scope="scope">
          {{ scope.row.deviceonlinesum }}/{{ scope.row.devicesum }}
        </template>
      </el-table-column>
      <el-table-column prop="msgCount" :label="$t(`common['SMS(useable/total)']`)">
      </el-table-column>
      <el-table-column prop="status" :label="$t('common.Status')">
      </el-table-column>
      <el-table-column :label="$t('common.Operation')" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']">{{ $t('common.Edit') }}</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']">{{ $t('common.Delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改企业 -->
    <el-dialog :title="enterpriseTitle" :visible.sync="openEnterprise" width="600px" append-to-body>
      <el-form ref="enterpriseForm" :model="enterpriseForm" :rules="rules" label-width="150px">
        <el-form-item :label="$t(`company['Company name']`)" prop="enterprisename">
          <el-input v-model="enterpriseForm.enterprisename" placeholder="" />
        </el-form-item>
        <el-form-item :label="$t(`company['Company address']`)" prop="address">
          <el-input v-model="enterpriseForm.address">
            <i slot="suffix" class="el-icon-map-location" @click="loadMap"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEterprise">{{ $t('common.Confirm') }}</el-button>
        <el-button @click="openEnterprise = false">{{ $t('common.Cancel') }}</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改站点 -->
    <el-dialog :title="siteTitle" :visible.sync="openSite" width="600px" append-to-body>
      <el-form ref="siteForm" :model="siteForm" :rules="rules" label-width="150px">
        <el-form-item :label="$t(`company['Site name']`)" prop="sitename">
          <el-input v-model="siteForm.sitename" placeholder="" />
        </el-form-item>
        <el-form-item :label="$t(`company['Site address']`)" prop="address">
          <el-input v-model="siteForm.address">
            <i slot="suffix" class="el-icon-map-location" @click="loadMap"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSite">{{ $t('common.Confirm') }}</el-button>
        <el-button @click="openSite = false">{{ $t('common.Cancel') }}</el-button>
      </div>
    </el-dialog>
    <!-- 百度地图 -->
    <el-dialog :title="$t('common.Map')" :visible.sync="openMap" destroy-on-close width="60%">
      <map-location ref="map" />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="getAddress">{{ $t('common.Confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MapLocation from "@/components/Map"
import { mapState } from 'vuex'
import {
  getEnterprise,
  getEnterpriseList,
  getSite,
  getSiteList,
  createEnterprise,
  updateEnterprise,
  deleteEnterprise,
  createSite,
  updateSite,
  deleteSite
} from "@/api/company/enterprise"
export default {
  name: "List",
  components: {
    MapLocation
  },
  data() {
    return {
      maps: new Map(),
      childList: new Map,
      loading: false,
      single: false,
      multiple: true,
      enterpriseTitle: "",
      openEnterprise: false,
      enterpriseForm: {},
      siteTitle: "",
      openSite: false,
      siteForm: {},
      openMap: false,
      rules: {
        enterprisename: [
          { required: true, message: this.$t(`company['The name is required.']`), trigger: "blur" }
        ],
        sitename: [
          { required: true, message: this.$t(`company['The name is required.']`), trigger: "blur" }
        ],
      },
      enterpriseData: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        enterpriseuuid: ""
      },
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      this.listQuery.enterpriseuuid = this.enterpriseId
      await getEnterpriseList(this.listQuery).then(response => {
        this.enterpriseData = this.unitFormatData(response.items)
        console.log(this.childList);
        this.childList.clear()
      })
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleAdd(command) {
      if (command === "enterprise") {
        this.mark = "enterprise"
        this.enterpriseForm = {}
        this.enterpriseTitle = this.$t(`company['Create Enterprise']`)
        this.openEnterprise = true
      } else {
        this.mark = "site"
        this.siteForm = {}
        this.siteTitle = this.$t(`company['Create Site']`)
        this.openSite = true
      }
    },
    async handleUpdate(row) {
      if (row.mark == "enterprise") {
        this.mark = "enterprise"
        const response = await getEnterprise(row.id)
        if (response) {
          this.enterpriseForm = response.data
          this.openEnterprise = true
          this.enterpriseTitle = this.$t(`company['Edit Enterprise']`)
        }
      } else {
        this.mark = "site"
        const response = await getSite(row.id)
        if (response) {
          this.siteForm = response.data
          this.openSite = true
          this.siteTitle = this.$t(`company['Edit Site']`)
        }
      }
    },
    loadMap() {
      this.openMap = true
    },
    getAddress() {
      if (this.mark == "enterprise") {
        this.enterpriseForm.lng = this.$refs.map.center.lng
        this.enterpriseForm.lat = this.$refs.map.center.lat
        this.enterpriseForm.address = this.$refs.map.address
      } else {
        this.siteForm.lng = this.$refs.map.center.lng
        this.siteForm.lat = this.$refs.map.center.lat
        this.siteForm.address = this.$refs.map.address
      }
      this.openMap = false
    },
    submitEterprise() {
      this.$refs["enterpriseForm"].validate(valid => {
        if (valid) {
          if (this.enterpriseForm.enterpriseuuid != undefined) {
            updateEnterprise(this.enterpriseForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openEnterprise = false;
              this.getInfo();
            });
          } else {
            createEnterprise(this.enterpriseForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openEnterprise = false;
              this.getInfo();
            });
          }
        }
      })
    },
    submitSite() {
      this.$refs["siteForm"].validate(valid => {
        if (valid) {
          if (this.siteForm.siteuuid != undefined) {
            updateSite(this.siteForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openSite = false;
              this.getInfo();
            });
          } else {
            createSite(this.siteForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openSite = false;
              this.getInfo();
            });
          }
        }
      })
    },
    async handleDelete(row) {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(await function () {
        if (row.mark == "enterprise") {
          return deleteEnterprise(row.id)
        } else {
          return deleteSite(row.id)
        }
      }).then(() => {
        this.getInfo();
        this.$modal.msgSuccess(this.$t(`common['Delete success']`));
      }).catch(() => { });


    },
    // resetData(data) {
    //   const newData = data.map((item) => {
    //     return {
    //       id: item.siteuuid || item.enterpriseuuid,
    //       name: item.sitename || item.enterprisename,
    //       devicesum: item.devicesum,
    //       deviceonlinesum: item.deviceonlinesum,
    //       address: item.address,
    //       msgCount: item.msgCount,
    //       status: item.status,
    //       hasChildren: item.siteuuid ? false : true,
    //       mark: item.siteuuid ? "site" : "enterprise"
    //     }
    //   })
    //   return newData
    // },
    unitFormatData: function (items) {
      return items.forEach(function (e) {
        // t.unitFormatData(item.children);
        e.id = e.enterpriseuuid, e.name = e.enterprisename, e.hasChildren = !0, e.mark = "enterprise"
      }), items
    },
    siteFormatData: function (e, t) {
      let n = [];
      return e.forEach(function (e) {
        e.name = e.sitename, e.mark = "site", e.id = e.siteuuid, e.parent = t, n.push(e)
      }), this.childList.set(t, n), e
    },
    // getChildSelectMap: function (e) {
    //   var t = this.childSelection.get(e);
    //   return t || (t = []), t
    // },
    load(tree, treeNode, resolve) {
      getSiteList(tree.id).then((res) => {
        // resolve(this.resetData(res.data))
        resolve(this.siteFormatData(res.data,tree.id))
      })
    },
  },
  computed: {
    ...mapState({
      currentSite: state => state.enterprise.currentSite
    }),
    enterpriseId: function () {
      return this.currentSite.parentId ? this.currentSite.parentId : this.currentSite.id
    }
  },
  watch: {
    enterpriseId(n, o) {
      n && this.getInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-icon-map-location {
  cursor: pointer;
  color: #409EFF;
  font-size: 18px;
}
</style>