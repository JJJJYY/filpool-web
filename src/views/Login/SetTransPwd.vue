<template>
  <login-background>
    <head-nav bg-color="rgba(0,0,0,0)"></head-nav>
    <div class="current-box">
      <div class="h1">设置资金密码</div>
      <div class="h2">仅支持字母、数字和标点符号，最少8位， 不能使用空格
      </div>
      <div class="form">
        <div class="form-container">
          <div class="form-item">
            <div class="form-title">资金密码</div>
            <div class="form-input">
              <input :type="isSecurity ? 'password':'text'" title="" placeholder="请设置新密码" maxlength="18" v-model="payPwd">
              <!--            <img class="security" src="../../assets/img/login/enter_open_eye.png" alt="">-->
              <img v-if="!isSecurity" @click="isSecurity = !isSecurity" src="../../assets/img/login/enter_open_eye.png" alt="" class="form-item-security-btn">
              <img v-if="isSecurity" @click="isSecurity = !isSecurity" src="../../assets/img/change_password_icon_close_eye.png" alt="" class="form-item-security-btn">
            </div>
          </div>
          <button @click="submit" class="submit">完成注册</button>
        </div>
      </div>
    </div>
  </login-background>
</template>

<script>
  import LoginBackground from "@/views/Login/LoginBackground";
  import md5 from 'md5'
  import {Toast} from "vant";
  import HeadNav from "@/components/HeadNav";
  import { isH5 } from "@/utils/utilTools";
  //import {getCookie} from "@/utils/utilTools";

  export default {
    name: "SetTransPwd",
    components: {
      HeadNav,
      LoginBackground
    },
    data() {
      return {
        payPwd: '',
        isSecurity: true
      }
    },
    methods: {
      submit() {
        if (this.payPwd.length === 0) {
          Toast("请填写支付密码");
          return
        }

        let reqObj = {};
        if (this.$route.query.type === 'phone') {
          reqObj = {areaCode: this.$route.query.area, phone: this.$route.query.account, type: "phone"};
        } else {
          reqObj = {email: this.$route.query.account, type: "email"};
        }
        this.$http.post('/auth/access/register', {
          ...reqObj,
          'password': md5(this.$route.query.pwd),
          'payPwd': md5(this.payPwd),
          'invitationCode': this.$route.query.inviteCode,
          'phoneCaptcha': this.$route.query.accountCode
        }).then(() => {
          Toast('注册成功');
          this.$router.replace({path: isH5?'/download':'/login'});
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";
  @import "../../assets/scss/form";

  .container {
    .current-box{
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

  .form-item-security-btn {
    height: 12px;
    max-width: 18px;
    align-self: center;
    margin-right: 8px;
  }
</style>
