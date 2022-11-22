<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item :label="$t(`user['Current password']`)" prop="oldPassword">
      <el-input v-model="user.oldPassword" :placeholder="$t(`user['Current password']`)" type="password" show-password/>
    </el-form-item>
    <el-form-item :label="$t(`user['New password']`)" prop="newPassword">
      <el-input v-model="user.newPassword" :placeholder="$t(`user['Password length 6-32 Bits']`)" type="password" show-password/>
    </el-form-item>
    <el-form-item :label="$t(`user['Confirm password']`)" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" :placeholder="$t(`user['Confirm password']`)" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">{{$t('common.Save')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error(this.$t(`login['The passwords entered are inconsistent']`)));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: this.$t(`common['Cannot be empty']`), trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: this.$t(`common['Cannot be empty']`), trigger: "blur" },
          { min: 6, max: 32, message: this.$t(`user['Password length 6-32 Bits']`), trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: this.$t(`common['Cannot be empty']`), trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
            this.$modal.msgSuccess(this.$t('common.Success'));
          });
        }
      });
    },
  }
};
</script>
