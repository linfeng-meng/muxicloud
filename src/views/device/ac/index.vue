<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleCreate"
          v-hasPermi="['device:ac:add']">{{
              $t('common.Create')
          }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="acRemoveBatch"
          v-hasPermi="['device:ac:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-rank" size="mini" :disabled="multiple" @click="openAC = true"
          v-hasPermi="['device:ac:add']">{{
              $t('common.Move')
          }}</el-button>
      </el-col>
      <el-dropdown trigger="click" v-hasPermi="['device:ac:add']" @command="moreCommand">
        <el-button type="info" plain icon="el-icon-menu" size="mini">{{
            $t('common.More')
        }}</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-refresh-right" command="acReboot">{{ $t('device.Reboot') }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-upload2" command="acUpdata">{{ $t('device.Upgrade') }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-link" command="acCloudupload">{{ $t(`device['Remote Connect']`) }}
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-upload" command="handelControl">{{ $t(`device['Cloud Service Control']`) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>

    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      @filter-change="filterHandler" @sort-change="handleSortChange" :header-cell-class-name="'border-right'">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column column-key="status" :label="$t('common.Status')" align="left" prop="status" sortable :filters="[{ text: $t(`common['Online']`), value: '1' },
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
      </el-table-column>
      <!-- <el-table-column class-name="column-search-cell" prop="sitename" align="left" width="200" sortable>
        <template slot="header">
          <input-filter :titleName="$t(`company['Site name']`)" queryKey="sitename" @search-list="handleQuery">
          </input-filter>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" :refresh="true" />

    <!-- ???????????????ac -->
    <el-dialog :title="acTitle" :visible.sync="openAC" width="500px" append-to-body>
      <el-form ref="acForm" :model="acForm" :rules="rules" label-width="100px">
        <el-form-item :label="$t(`common['Name']`)" prop="name" size="mini">
          <el-input v-model="acForm.name" placeholder="" />
        </el-form-item>
        <el-form-item :label="$t(`common['SN']`)" prop="sn" size="mini">
          <el-input v-model="acForm.sn" :disabled="disabled">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t(`company['Site']`)" prop="siteUUID" size="mini">
          <el-input v-if="disabled" v-model="acForm.siteName" :disabled="disabled">
          </el-input>
          <el-select v-else v-model="acForm.siteUUID" filterable :placeholder="$t(`common['Enter for search']`)"
            class="dialog-select">
            <el-option v-for="item in updataData" :key="item.siteuuid" :label="item.sitename" :value="item.siteuuid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`device['Position']`)" prop="location" size="mini">
          <el-input v-model="acForm.location">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitAC">{{ $t('common.Confirm') }}</el-button>
        <el-button size="mini" @click="openAC = false">{{ $t('common.Cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tablemixin from '@/views/mixins/tablemixin'
import { getACList, getACView, deviceRestart, createDevice, updateDevice, removeDeviceBatch, removeDevice } from "@/api/device/ac";
import { getSiteList } from "@/api/company/enterprise";
export default {
  name: 'AC',
  mixins: [tablemixin],
  data() {
    return {
      acTitle: "",
      openAC: false,
      acForm: {},
      disabled: false,
      rules: {
        name: [
          { required: true, message: this.$t(`company['The name is required.']`), trigger: "blur" }
        ],
        sn: [
          { required: true, message: this.$t(`common['The field is required.']`), trigger: "blur" }
        ],
        siteUUID: [
          { required: true, message: this.$t(`common['The field is required.']`), trigger: 'change' }
        ],
      },
      listQuery: {
        asc: "",
        ip: "",
        mac: "",
        sn: "",
        name: "",
        publicIp: "",
        enterpriseUUID: "",
        siteUUID: "",
        status: "",
        orderby: "",
        page: 1,
        size: 50,
        upgradeStatus: "",
        enableImcloud: ""
      },
      updataData: []
    }
  },
  methods: {
    getList() {
      this.loading = true;
      getACList(this.listQuery).then(response => {
        this.list = response.items;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** ???????????? */
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
    /** ?????????????????? */
    upgradeFormat(row, column) {
      const upgradeStatus = row.upgradeStatus
      switch (upgradeStatus) {
        case 0:
          return ''
        case 1:
          return this.$t(`device['Upgrading']`)
        case 2:
          return this.$t(`device['Upgrade Successed']`)
        case 3:
          return this.$t(`device['Upgrade Failed']`)
        default:
          return this.$t(`common['Unknow']`)
      }
    },
    /** ????????????????????? */
    cloudFormat(row, column) {
      const enableImcloud = row.enableImcloud
      switch (enableImcloud) {
        case 0:
          return this.$t(`common['Disable']`)
        case 1:
          return this.$t(`common['Enable']`)
        default:
          return this.$t(`common['Unknow']`)
      }
    },
    /** ???????????? */
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
    openDetail(id) {
      this.$router.push({
        name: 'AcDetail',
        query: {
          id: id
        }
      })
    },
    /** ????????????????????? */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.deviceUUID)
      this.multiple = !selection.length
    },
    /** ???????????? */
    moreCommand(command) {
      "undefined" !== typeof this[command] && this[command]()
    },
    handleCreate() {
      this.$refs.acForm && this.$refs.acForm.clearValidate()
      this.acForm = {}
      this.disabled = false
      this.acTitle = this.$t(`common['Create']`)
      this.openAC = true
      getSiteList(this.listQuery.enterpriseUUID).then(res => {
        this.updataData = res.data
      })
    },
    handleUpdate(row) {
      getACView(row.deviceUUID).then(res => {
        this.acForm = res.data
        this.disabled = true
        this.acTitle = this.$t(`common['Edit']`)
        this.openAC = true
      })
    },
    /** ??????????????? */
    submitAC() {
      this.$refs["acForm"].validate(valid => {
        if (valid) {
          if (this.disabled) {
            updateDevice(this.acForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openAC = false;
              this.getList();
            });
          } else {
            createDevice(this.acForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openAC = false;
              this.getList();
            });
          }
        }
      })
    },
    /** ?????? */
    acRemoveBatch() {
      let that = this
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        const t = that.listQuery.enterpriseUUID
        const s = that.listQuery.siteUUID
        const i = that.ids;
        return removeDeviceBatch({ 'enterpriseUUID': t, 'siteUUID': s, 'devices': i });
      }).then(() => {
        this.$message({
          type: "success",
          message: this.$t("common.Success")
        })
        this.getList();
      }).catch((res) => {
      });
    },
    acRemove(row) {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return removeDevice({ 'deviceUUID': row.deviceUUID });
      }).then(() => {
        this.$message({
          type: "success",
          message: this.$t("common.Success")
        })
        this.getList();
      }).catch((res) => {
      });
    },
    /** ?????? */
    acReboot() {
      let that = this
      if (!this.calCheckedIds()) {
        return false
      }
      this.$modal.confirm(this.$t(`common['Are you sure to restart these devices?']`)).then(function () {
        const t = that.listQuery.enterpriseUUID
        const s = that.listQuery.siteUUID
        const i = that.ids;
        return deviceRestart({ 'enterpriseUUID': t, 'siteUUID': s, 'devices': i });
      }).then(() => {
        that.$message({
          type: "success",
          message: this.$t("common.Success")
        })
        this.getList();
      }).catch((res) => {
      });
    },
  }
}
</script>