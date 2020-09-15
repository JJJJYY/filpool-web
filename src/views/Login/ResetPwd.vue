<template>
  <login-background>
    <head-nav bg-color="rgba(0,0,0,0)" :border="false"></head-nav>
    <div class="reset-box page-container">
      <div class="h1">请重置登录密码</div>
      <div class="h2">仅支持字母、数字和标点符号，最少8位， 不能使用空格</div>
      <div class="form">
        <div class="form-container">
          <div class="form-item">
            <div class="form-title">设置密码</div>
            <div class="form-input">
              <input :type="enablePwd ? 'text' : 'password'" placeholder="请设置新密码" v-model="pwd" />
              <img
                v-if="!enablePwd"
                class="security"
                src="../../assets/img/login/change_password_icon_open_eye.png"
                style="width: 18px;"
                alt
                @click="enablePwd = true"
              />
              <img
                v-else
                class="security"
                src="../../assets/img/login/enter_open_eye.png"
                alt
                @click="enablePwd = false"
              />
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">确认密码</div>
            <div class="form-input">
              <input :type="enablePwd2 ? 'text' : 'password'" placeholder="请再次确认密码" v-model="pwd2" />
              <img
                v-if="!enablePwd2"
                class="security"
                src="../../assets/img/login/change_password_icon_open_eye.png"
                style="width: 18px;"
                alt
                @click="enablePwd2 = true"
              />
              <img
                v-else
                class="security"
                src="../../assets/img/login/enter_open_eye.png"
                alt
                @click="enablePwd2 = false"
              />
            </div>
          </div>
          <button @click="submit" class="submit">完成</button>
        </div>
      </div>
    </div>
  </login-background>
</template>

<script>
import LoginBackground from "@/views/Login/LoginBackground";
import { Toast } from "vant";
import md5 from "md5";
import HeadNav from "@/components/HeadNav";
//import {getCookie} from "@/utils/utilTools";
import { resetPasswordApi } from "@/net/api/loginApi";
export default {
  name: "ResetPwd",
  components: {
    HeadNav,
    LoginBackground,
  },
  data() {
    return {
      pwd: "",
      enablePwd: false,
      pwd2: "",
      enablePwd2: false,
    };
  },
  methods: {
    submit() {
      // let account = this.$route.query.account
      // let code = this.$route.query.code
      if (this.pwd !== this.pwd2) {
        Toast("两次输入的密码不一致");
        return;
      }
      let reqObj = {};
      let querys = this.$route.query;
      if (querys.type === "phone") {
        reqObj = {
          areaCode: querys.areaCode,
          phone: querys.account,
          phoneCaptcha: querys.code,
        };
      } else {
        reqObj = { email: querys.account, emailCaptcha: querys.code };
      }
      const postData = {
        account: this.$route.query.account,
        password: md5(this.pwd),
        code: this.$route.query.code,
      };
      resetPasswordApi(postData).then((res) => {
        Toast("密码重置成功");
        this.$router.replace({ path: "/login" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";
@import "../../assets/scss/form";

.container {
  .reset-box {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
  }
  .form-container {
    padding: 32px 0;
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

  .security {
    height: 12px;
    align-self: center;
    margin-right: 12px;
  }
}
</style>
