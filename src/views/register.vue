<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">
        <img :src="logo" class="sidebar-logo" />
      </h3>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" type="text" auto-complete="off" :placeholder="$t('login.Username')">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          ref="password"
          :type="passwordType"
          auto-complete="off"
          :placeholder="$t('login.password')"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <svg-icon
            slot="suffix"
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            class="el-input__icon input-icon"
            @click="showPwd('passwordType')"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          ref="repassword"
          :type="repasswordType"
          auto-complete="off"
          :placeholder="$t('login.ConfirmPass')"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <svg-icon
            slot="suffix"
            :icon-class="repasswordType === 'password' ? 'eye' : 'eye-open'"
            class="el-input__icon input-icon"
            @click="showPwd('repasswordType')"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="registerForm.code"
          auto-complete="off"
          :placeholder="$t('login.captcha')"
          style="width: 63%"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img"/>
        </div>
      </el-form-item>
      <el-form-item class="service">
        <el-checkbox v-model="tos" class="cicle-far" />
        <span>{{$t('login["I have read and agreed to comply"]')}}
          <el-button type="text" @click="open('privacy')">{{$t('login["Privacy services"]')}}</el-button>、<el-button type="text" @click="open('clause')">{{$t('login["Terms of service"]')}}</el-button>
        </span>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleRegister"
        >
          <span v-if="!loading">{{$t('login.register')}}</span>
          <span v-else>{{$t('login.registering')}}</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/login'">{{$t('login.toLogin')}}</router-link>
        </div>
      </el-form-item>
      <!--  底部  -->
      <div class="footer">
        <div class="lang">
          <lang-select></lang-select>
        </div>
        <copy-right></copy-right>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg, register } from "@/api/login";
import logoSvg from '@/assets/logo/logo.svg'
import CopyRight from '@/components/CopyRight'
import LangSelect from '@/components/LangSelect'
import privacy from '@/utils/privacy'

export default {
  name: "Register",
  components:{ CopyRight, LangSelect },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error(this.$t('login["The passwords entered are inconsistent"]')));
      } else {
        callback();
      }
    };
    return {
      logo:logoSvg,
      tos: false,
      passwordType:'password',
      repasswordType:'password',
      codeUrl: "",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: ""
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: this.$t('login["Please input your account"]') },
          { min: 2, max: 20, message: this.$t('common["Length must be between s% and s%"]').replace(/(\w*)s%(.*)s%(\w*)/g,"$1 2 $2 20"), trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: "blur", message: this.$t('login["Please input your password"]') },
          { min: 5, max: 20, message: this.$t('common["Length must be between s% and s%"]').replace(/(\w*)s%(.*)s%(\w*)/g,"$1 5 $2 20"), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: this.$t('login["Please input your password again"]') },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
        code: [{ required: true, trigger: "change", message: this.$t('login["Please input verification code"]') }]
      },
      loading: false,
      captchaEnabled: false
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    showPwd(v) {
      if (v === 'passwordType') {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      } else {
        if (this.repasswordType === 'password') {
          this.repasswordType = ''
        } else {
          this.repasswordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.repassword.focus()
        })
      }
    },
    open(value) {
      this.$alert(privacy[value]['content'], privacy[value]['name'], {
        confirmButtonText: this.$t('common.Confirm'),
        dangerouslyUseHTMLString: true,
        customClass: 'privacy',
        callback: action => {}
      })
    },
    getCode() {
      getCodeImg().then(res => {
        // this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if(!this.tos){
            this.$message({
              message: this.$t('login["Please read the laws and regulations first"]'),
              type: 'warning'
            })
            return
          }
          this.loading = true;
          register(this.registerForm).then(res => {
            const username = this.registerForm.username;
            this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).then(() => {
              this.$router.push("/login");
            }).catch(() => {});
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          })
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.service{
  .el-button + .el-button{
    margin: 0!important
  }
}
.privacy {
  width:460px;

  .el-message-box__content{
    max-height: 440px;
    overflow-y: auto;
  }
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  position:absolute;
  left: 10%;
  height: 100%;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 38px;
}
.footer {
  padding: 0 25px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  .lang{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
