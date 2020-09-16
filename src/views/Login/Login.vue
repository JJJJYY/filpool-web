<template>
  <login-background class="container" style="overflow: hidden;">
    <!--<div class="back" @click="backToHome">
      <img src="../../assets/img/tibi_icon_return.png" alt="">
    </div>-->
    <head-nav :overrideBack="true" :border="false" @back="backToHome" bgcolor="rgba(0,0,0,0)"></head-nav>
    <div class="login-box page-container">
      <img src="../../assets/img/login/login_icon_logo.png" alt class="logo" />
      <div class="logo-title">FlLPool.io</div>
      <div class="form">
        <div class="form-item">
          <img src="../../assets/img/login/login_icon_user.png" alt class="form-item-icon" />
          <input type="text" title placeholder="请输入手机号或邮箱地址" v-model="account" />
        </div>
        <div class="form-item" style="margin-top: 50px;">
          <img src="../../assets/img/login/login_icon_password.png" alt class="form-item-icon" />
          <input
            :type="isSecurity ? 'password':'text'"
            title
            placeholder="请输入密码"
            v-model="pwd"
            v-scroll-to-view
          />
          <img
            v-if="!isSecurity"
            @click="isSecurity = !isSecurity"
            src="../../assets/img/login/enter_open_eye.png"
            alt
            class="form-item-security-btn"
          />
          <img
            v-if="isSecurity"
            @click="isSecurity = !isSecurity"
            src="../../assets/img/change_password_icon_close_eye.png"
            alt
            class="form-item-security-btn"
          />
        </div>
      </div>
      <div class="forget-pwd" @click="$router.push('/forgetPwd')">忘记密码?</div>
      <button class="submit btn-gradient" @click="login" :disabled="loading">
        <span v-if="!loading">登录</span>
        <van-loading v-else size="24px" color="#fff" class="flex-box">
          <span style="color: #fff;font-size: 15px;">登录中...</span>
        </van-loading>
      </button>
      <div class="tips" @click="$router.push('/register')">
        没有账号,
        <a>立即注册</a>
      </div>
    </div>
  </login-background>
</template>

<script>
//import HeadNav from '@/components/HeadNav';
import LoginBackground from "@/views/Login/LoginBackground";
import md5 from "md5";
import { Toast, Loading } from "vant";
import { delCookie } from "@/utils/utilTools";
import HeadNav from "@/components/HeadNav";
//import corsRequest from '@/utils/corsRequest';
import { getLoginApi } from "../../net/api/loginApi";

export default {
  name: "Login",
  components: {
    LoginBackground,
    [Loading.name]: Loading,
    HeadNav,
  },
  data() {
    return {
      isSecurity: true,
      account: "",
      pwd: "",
      loading: false,
    };
  },
  created() {
    delCookie("APP_COOKIE");
  },
  methods: {
    login() {
      if (this.account === "" || this.password === "") {
        Toast("请输入账号密码");
        return;
      }
      this.loading = true;
      const postData = {
        account: this.account,
        password: md5(this.pwd),
      };
      getLoginApi(postData)
        .then((res) => {
          this.$store.dispatch("reloadUserData").then(() => {
            this.$router.push({ path: "/" });
          });
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    backToHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.back {
  position: fixed;
  top: 32px;
  padding: 8px 16px;
  img {
    width: 7px;
  }
}

.container {
  overflow-y: hidden;
  min-height: 100vh;
  .login-box {
    display: flex;
    flex-direction: column;
    padding: 0 32px;
  }
  .logo {
    align-self: center;
    width: 68px;
    margin-top: 50px;
  }

  .logo-title {
    margin-top: 16px;
    align-self: center;
    font-size: 16px;
    font-weight: bold;
    color: $h1-color;
  }

  .form {
    margin-top: 32px;
    font-size: 14px;

    input::placeholder {
      color: #ccc;
    }

    &-item {
      border: 1px $main-color solid;
      height: 44px;
      border-radius: 22px;
      display: flex;
      flex-direction: row;
      padding: 0 14px;
      align-items: center;
      margin-top: 12px;

      &-icon {
        height: 18px;
      }

      & > input {
        flex: 1;
        margin: 0 12px;
      }

      &-security-btn {
        width: 20px;
      }
    }
  }

  .forget-pwd {
    align-self: flex-end;
    font-size: 12px;
    color: $h3-color;
    margin: 16px 0;
  }

  .submit {
    align-self: center;
    width: 80%;
    height: 44px;
    border-radius: 22px;
    margin-top: 5vh;
    /deep/.van-loading__text {
      vertical-align: middle;
    }
  }

  .tips {
    font-size: 13px;
    align-self: center;
    margin-top: 16px;
    color: $h3-color;

    a {
      color: $main-color;
    }
  }
}
</style>
