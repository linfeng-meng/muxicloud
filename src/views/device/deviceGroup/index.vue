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
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="removeBatch"
          v-hasPermi="['device:ac:remove']">{{ $t('common.Delete') }}</el-button>
      </el-col>
    </el-row>
    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      :header-cell-class-name="'border-right'">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t(`device['Group Name']`)" prop="name" align="left" />
      <el-table-column :label="$t(`common['Device Statistics']`)" prop="apOnlineTotalNum,apTotalNum" align="left">
        <template slot-scope="scope">
          {{ scope.row.apOnlineTotalNum }}/{{ scope.row.apTotalNum }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.Operation')" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" v-hasPermi="['device:ac:edit']"
            @click="handleUpdate(scope.row)">{{ $t('common.Edit') }}</el-button>
          <el-button v-if="(scope.row.dftFlag != '1')" size="mini" type="text" icon="el-icon-delete"
            v-hasPermi="['device:ac:remove']" @click="handleRemove(scope.row)">{{ $t('common.Delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="getList" :refresh="true" />

    <!-- 添加或修改组 -->
    <el-dialog :title="title" :visible.sync="openGroup" width="500px" append-to-body>
      <el-form ref="groupForm" :model="groupForm" :rules="rules" label-width="100px">
        <el-tabs v-model="activeName" @tab-click="handleClick" size="mini">
          <el-tab-pane :label="$t(`device['Basic Info']`)" name="1">
            <el-form-item :label="$t(`common['Name']`)" prop="name" size="mini">
              <el-input v-model="groupForm.name" placeholder="" :disabled="groupForm.dftFlag == '1'" />
            </el-form-item>
            <el-form-item :label="$t(`company['Site']`)" prop="siteUUID" size="mini">
              <el-input v-if="disabled" v-model="groupForm.siteName" :disabled="disabled">
              </el-input>
              <el-select v-else v-model="groupForm.siteUUID" filterable :placeholder="$t(`common['Enter for search']`)"
                class="dialog-select">
                <el-option v-for="item in siteOptions" :key="item.siteuuid" :label="item.sitename"
                  :value="item.siteuuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane :label="$t(`device['Wireless Parameters']`)" name="2">
            <el-form-item label="AirMatch" prop="airmatch" size="mini">
              <el-switch v-model="groupForm.airmatch" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item :label="$t(`device['AP LED']`)" prop="ledSwitch" size="mini">
              <el-switch v-model="groupForm.ledSwitch" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Radio1 Mode']`)" prop="radio1PhysicalMode" size="mini">
                  <el-select v-model="groupForm.radio1PhysicalMode" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in radio1option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Bandwidth']`)" prop="radio1Bandwidth" size="mini">
                  <el-select v-model="groupForm.radio1Bandwidth" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in bandwidth1option" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Radio2 Mode']`)" prop="radio2PhysicalMode" size="mini">
                  <el-select v-model="groupForm.radio2PhysicalMode" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in radio2option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Bandwidth']`)" prop="radio2Bandwidth" size="mini">
                  <el-select v-model="groupForm.radio2Bandwidth" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in bandwidth2option" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Radio3 Mode']`)" prop="radio3PhysicalMode" size="mini">
                  <el-select v-model="groupForm.radio3PhysicalMode" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in radio2option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t(`device['Bandwidth']`)" prop="radio3Bandwidth" size="mini">
                  <el-select v-model="groupForm.radio3Bandwidth" :placeholder="$t(`common['Please select']`)">
                    <el-option v-for="item in bandwidth2option" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t(`device['Remote Management']`)" name="3">

            <el-form-item :label="$t(`device['Allow Telnet']`)" prop="telnet" size="mini">
              <el-switch v-model="groupForm.telnet" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item :label="$t(`device['Allow SSH']`)" prop="ssh" size="mini">
              <el-switch v-model="groupForm.ssh" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item :label="$t(`device['Allow WEB']`)" prop="web" size="mini">
              <el-switch v-model="groupForm.web" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item :label="$t(`login['Username']`)" prop="username" size="mini" :rules="rules.required">
              <el-input v-model="groupForm.username" :placeholder="$t(`login['Please input your account']`)" />
            </el-form-item>
            <el-form-item :label="$t(`login['Password']`)" prop="password" size="mini" :rules="rules.required">
              <el-input :placeholder="$t(`login['Please input your password']`)" v-model="groupForm.password"
                show-password></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitGroup">{{ $t('common.Confirm') }}</el-button>
        <el-button size="mini" @click="openGroup = false">{{ $t('common.Cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tablemixin from '@/views/mixins/tablemixin'
import { getGroup, getGroupView, createGroup, updateGroup, removeGroupBatch, removeGroup } from "@/api/device/deviceGroup";
import { getSiteList } from "@/api/company/enterprise";
const defaultData = {
  name: "",
  airmatch: "0",
  ledSwitch: "1",
  siteUUID: "",
  telnet: "1",
  ssh: "1",
  web: "1",
  username: "admin",
  password: "admin",
  radio1PhysicalMode: "3",
  radio2PhysicalMode: "7",
  radio3PhysicalMode: "7",
  radio1Bandwidth: "1",
  radio2Bandwidth: "2",
  radio3Bandwidth: "2"
}
export default {
  name: 'DeviceGroup',
  mixins: [tablemixin],
  components: {},
  data() {
    return {
      title: "",
      openGroup: false,
      disabled: false,
      groupForm: {},
      activeName: "1",
      dialogStatus: false,
      rules: {
        name: [
          { required: true, message: this.$t(`common['The field is required.']`), trigger: "blur" }
        ],
        required: [
          { required: true, message: this.$t(`common['The field is required.']`), trigger: "blur" }
        ],
        siteUUID: [
          { required: true, message: this.$t(`common['The field is required.']`), trigger: 'change' }
        ],
      },
      siteOptions: [],
      radio1option: [
        { label: "802.11b", value: "0" },
        { label: "802.11g", value: "1" },
        { label: "802.11ng", value: "2" },
        { label: "802.11axg", value: "3" },
      ],
      radio2option: [
        { label: "802.11a", value: "4" },
        { label: "802.11na", value: "5" },
        { label: "802.11ac", value: "6" },
        { label: "802.11axa", value: "7" },
      ],
      bandwidth1option: [
        { label: "20", value: "1" },
        { label: "40", value: "2" },
      ],
      bandwidth2option: [
        { label: "20", value: "1" },
        { label: "40", value: "2" },
        { label: "80", value: "3" },
      ],
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getList() {
      this.loading = true;
      getGroup(this.listQuery).then(res => {
        this.list = res.data;
        this.total = res.total;
        this.loading = false;
      });
    },
    getSiteInfo() {
      getSiteList(this.listQuery.enterpriseUUID).then(res => {
        this.siteOptions = res.data
      })
    },
    handleCreate() {
      const that = this
      this.activeName = "1"
      this.$refs["groupForm"] && this.$refs["groupForm"].clearValidate()
      this.groupForm = defaultData
      this.dialogStatus = false
      this.disabled = false
      this.title = this.$t(`common['Create']`)
      this.openGroup = true
      getSiteList(this.listQuery.enterpriseUUID).then(res => {
        if (this.listQuery.siteUUID) {
          that.groupForm.siteUUID = this.listQuery.siteUUID
          res.data.forEach((item) => {
            if (item.siteuuid == this.listQuery.siteUUID) {
              that.groupForm.siteName = item.sitename
              that.disabled = true
              return
            }
          })
        }
        this.siteOptions = res.data
      })

    },
    handleUpdate(row) {
      this.activeName = "1"
      this.$refs["groupForm"] && this.$refs["groupForm"].clearValidate()
      getGroupView(row.groupUUID).then(res => {
        this.groupForm = res.data
        this.dialogStatus = true
        this.disabled = true
        this.title = this.$t(`common['Edit']`)
        this.openGroup = true
      })
    },
    removeBatch() {
      let that = this
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        const t = that.listQuery.enterpriseUUID
        const s = that.listQuery.siteUUID
        const i = that.ids;
        return removeGroupBatch({ 'enterpriseUUID': t, 'siteUUID': s, 'groups': i });
      }).then(() => {
        this.$message({
          type: "success",
          message: this.$t("common.Success")
        })
        this.getList();
      }).catch((res) => {
      });
    },
    handleRemove(row) {
      this.$modal.confirm(this.$t(`common['This operation will be permanently deleted. Do you want to continue?']`)).then(function () {
        return removeDevice({ 'groupUUID': row.groupUUID });
      }).then(() => {
        this.$message({
          type: "success",
          message: this.$t("common.Success")
        })
        this.getList();
      }).catch((res) => {
      });
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.groupUUID)
      this.multiple = !selection.length
    },
    submitGroup() {
      this.$refs["groupForm"].validate(valid => {
        if (valid) {
          if (this.dialogStatus) {
            updateGroup(this.groupForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openGroup = false;
              this.getList();
            });
          } else {
            createGroup(this.groupForm).then(response => {
              this.$modal.msgSuccess(this.$t(`common['${response.msg}']`));
              this.openGroup = false;
              this.getList();
            });
          }
        }
      })

    },
  }
}
</script>