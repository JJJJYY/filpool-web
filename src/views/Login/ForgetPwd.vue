<template>
  <login-background class="container">
    <!--<div class="h1">忘记密码</div>-->
    <head-nav bg-color="rgba(0,0,0,0)" :border="false"></head-nav>
    <div class="forget-box page-container">
      <h3 class="title">忘记密码</h3>
      <div class="h2">请重置您的登录密码</div>
      <div class="form">
        <div class="form-container">
          <div class="form-item">
            <div class="form-title">输入手机号码或邮箱</div>
            <div class="form-input">
              <input type="text" title placeholder="输入手机号码或邮箱" v-model="account" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">图像验证码</div>
            <div class="form-input">
              <input type="text" title placeholder="请输入图像验证码" v-model="imgCode" />
              <div
                @click="getImgCode"
                class="suffix-btn"
                style="background: transparent; align-self: center; padding: 0;"
              >
                <img :src="imgCodeUrl" alt style="max-width: 120px;" />
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">验证码</div>
            <div class="form-input">
              <input type="text" title placeholder="请输入验证码" v-model="code" />
              <button
                class="suffix-btn"
                @click="getCode"
                :disabled="isTimer"
              >{{ isTimer ? duration + "S" : "获取验证码" }}</button>
            </div>
          </div>
          <button @click="submit" class="submit">下一步</button>
        </div>
      </div>
    </div>
  </login-background>
</template>

<script>
import LoginBackground from "@/views/Login/LoginBackground";
import { Toast } from "vant";
//import {v4} from 'uuid';
import { serviceURL } from "@/config";
import HeadNav from "@/components/HeadNav";
//import {setCookie, getCookie} from '@/utils/utilTools';
import { sendApi } from "@/net/api/loginApi";

export default {
  name: "ForgetPwd",
  components: {
    LoginBackground,
    HeadNav,
  },
  data() {
    return {
      account: "",
      code: "",
      imgCode: "",
      imgCodeUrl: "",
      isTimer: false,
      duration: 60,
      areaCode: "86",
    };
  },
  created() {
    this.uuid = "";
    this.getImgCode();
  },
  methods: {
    submit() {
      if (this.account.length === 0) {
        return;
      }
      if (this.code.length === 0) {
        return;
      }
      this.$router.push({
        path: "/resetPwd",
        query: {
          account: this.account,
          code: this.code,
          areaCode: this.areaCode,
          type: this.isMobile() ? "phone" : "email",
        },
      });
    },
    getImgCode() {
      let newTime = new Date().getTime();
      this.imgCodeUrl = `${serviceURL}/public/ImageCode.php?uuid=${newTime}`;
    },
    getCode() {
      if (this.account.length === 0) {
        Toast("请输入正确的邮箱或手机号码");
        return;
      }
      if (this.imgCode.length === 0) {
        Toast("请输入图像验证码");
        return;
      }
      const postData = {
        to: this.account,
        type: this.isMobile() ? "phone" : "email",
        imageCaptcha: this.imgCode,
      };
      sendApi(postData).then((res) => {
        if (res.ret === 200) {
          Toast("验证码已发送");
          this.startTimer();
        }
      });
    },
    isMobile() {
      return /^[1]([3-9])[0-9]{9}$/.test(this.account);
    },
    startTimer() {
      if (this.isTimer) {
        return;
      }
      this.isTimer = true;
      let timer = setInterval(() => {
        this.duration -= 1;
        if (this.duration <= 0) {
          this.isTimer = false;
          this.duration = 60;
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";
@import "../../assets/scss/form";

.container {
  .forget-box {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
  }
  .form-container {
    padding: 32px 0;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #24375e;
    margin-top: 20px;
  }
  .h1 {
    font-size: 24px;
    font-weight: bold;
    color: $h1-color;
    margin-top: 32px;
  }

  .h2 {
    font-size: 14px;
    color: $h3-color;
    margin-top: 12px;
  }
}
</style>
