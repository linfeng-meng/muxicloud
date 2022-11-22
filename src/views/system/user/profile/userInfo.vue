<template>
  <el-form ref="form" :model="user" label-width="80px">
    <el-form-item :label="$t('user.Account')">
      <!-- <el-input v-model="user.username" maxlength="30" /> -->
      <span>{{ user.username }}</span>
    </el-form-item>
    <el-form-item :label="$t('user.Name')" prop="contact">
      <span class="user-text">{{ user.contact }}</span>
      <el-button size="mini" type="primary">{{$t('common.Edit')}}</el-button>
    </el-form-item>
    <el-form-item :label="$t('user.Phone')" prop="phoneNum">
      <!-- <el-input v-model="user.phoneNum" maxlength="11" size="mini" /> -->
      <span class="user-text">{{ user.phoneNum }}</span>
      <el-button v-if="user.phoneNum" size="mini" type="danger">{{$t('user.Unbind')}}</el-button>
      <el-button v-else size="mini" type="primary">{{$t('user.Bind')}}</el-button>
    </el-form-item>
    <el-form-item :label="$t('user.Email')" prop="email">
      <!-- <el-input v-model="user.email" maxlength="50" size="mini" /> -->
      <!-- <el-input v-model="user.email" maxlength="50" size="mini" /> -->
      <span class="user-text">{{ user.email }}</span>
      <el-button v-if="user.email" size="mini" type="danger">{{$t('user.Unbind')}}</el-button>
      <el-button v-else size="mini" type="primary">{{$t('user.Bind')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // submit() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       updateUserProfile(this.user).then(response => {
    //         this.$modal.msgSuccess("修改成功");
    //       });
    //     }
    //   });
    // },
    // close() {
    //   this.$tab.closePage();
    // }
  }
};
</script>
<style lang="scss" scoped>
.el-form {
  max-width: 500px;

  .user-text {
    display: inline-block;
    width: 250px;
  }
}
</style>
