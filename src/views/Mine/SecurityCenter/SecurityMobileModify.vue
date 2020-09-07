<template>
  <div class="form">
    <head-nav></head-nav>
    <div class="form-container">
      <div class="form-item">
        <div class="form-title">{{isPhone?'原手机号码':'邮箱'}}({{isPhone?userData.phone:userData.email}})</div>
        <div class="form-input">
          <input type="text"  v-model="oldPhoneCaptcha" placeholder="请输入验证码">
          <button class="suffix-btn" :disabled="sendding1" @click="sendCode1">{{sendding1?`${interval1} S 重新获取`:'获取验证码'}}</button>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新手机号码</div>
        <div class="form-input">
          <button class="prefix-btn"  @click="showAreaPicker = true">+{{countryInfo.code}}<i class="fa fa-sort-down" style="display: inline-block; margin-bottom: 2px;"></i></button>
          <input type="text" v-model="phone" placeholder="请输入新手机号码">
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">验证码</div>
        <div class="form-input">
          <input type="text" v-model="newPhoneCaptcha" placeholder="请输入短信验证码">
          <button class="suffix-btn" :disabled="sendding2" @click="sendCode2">{{sendding2?`${interval2} S 重新获取`:'获取验证码'}}</button>
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">绑定手机号24小时内不可提现</div>
    </div>
    <area-select v-model="showAreaPicker" @select="setCountry"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import {Toast} from "vant";
  import HeadNav from '@/components/HeadNav';
  import AreaSelect from "@/views/Login/AreaSelect";

  export default {
    name: "SecurityMobileModify",
    components: {
      HeadNav,
      AreaSelect
    },
    data () {
      return {
        phone: "",
        oldPhoneCaptcha: "",
        newPhoneCaptcha: "",
        areaCode: "86",
        sendding1: false,
        interval1: 60,
        sendding2: false,
        interval2: 60,
        showAreaPicker: false,
        countryInfo: {}
      }
    },
    computed: {
      ...mapState(["userData"]),
      isPhone () {
        return this.userData.defaultAccount === 0
      }
    },
    methods: {
      /*设置国家*/
      setCountry (item) {
        this.countryInfo = item;
      },
      /*旧手机或邮箱发送验证码*/
      sendCode1 () {
        this.sendding1 = true;
        this.$http.post('/message/send', {
          type: this.isPhone?"phone":"email",
          option: '/setting/kyc1/modify_phone',
          purpose: 2
        }).then(() => {
          Toast('验证码已发送请注意查收');
          let timer = setInterval(() => {
            if (this.interval1 > 0) {
              this.interval1 = --this.interval1;
            } else {
              this.sendding1 = false;
              clearInterval(timer);
              this.interval1 = 60;
            }
          }, 1000);
        }).catch(() => {
          this.sendding1 = false;
          this.interval1 = 60;
        });
      },
      /*新手机发送验证码*/
      sendCode2 () {
        this.sendding2 = true;
        this.$http.post('/message/access/send', {
          type: "phone",
          phone: this.phone,
          apiKey: this.userData.apiKey,
          areaCode: "86",
          purpose: 1
        }).then(() => {
          Toast('验证码已发送请注意查收');
          let timer = setInterval(() => {
            if (this.interval2 > 0) {
              this.interval2 = --this.interval2;
            } else {
              this.sendding2 = false;
              clearInterval(timer);
              this.interval2 = 60;
            }
          }, 1000);
        }).catch(() => {
          this.sendding2 = false;
          this.interval2 = 60;
        });
      },
      submit () {
        this.$http.post('/setting/kyc1/modify_phone', {
          phone: this.phone,
          oldPhoneCaptcha: this.oldPhoneCaptcha,
          newPhoneCaptcha: this.newPhoneCaptcha,
          areaCode: this.countryInfo.code,
          type: this.isPhone?'phone':'email'
        }).then(() => {
          this.$store.dispatch("reloadUserData").then(() => {
            Toast("修改成功");
            this.$router.back();
          });
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/base";
  @import "../../../assets/scss/form";
  .fa-sort-down{
    vertical-align: top;
    margin-left: 5px;
  }
</style>
