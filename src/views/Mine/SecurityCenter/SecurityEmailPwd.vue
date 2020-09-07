<template>
  <div class="form">
    <head-nav></head-nav>
    <div class="form-container">
      <div class="form-item">
        <div class="form-title">{{isPhone?'手机号码':'原邮箱'}}({{isPhone?userData.phone:userData.email}})</div>
        <div class="form-input">
          <input type="text" v-model="oldEmailCaptcha" placeholder="请输入验证码">
          <button class="suffix-btn" :disabled="sendding1" @click="sendCode1">{{sendding1?`${interval1} S
            重新获取`:'获取验证码'}}
          </button>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新邮箱地址</div>
        <div class="form-input">
          <input type="text" v-model="email" placeholder="请输入新邮箱地址">
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新邮箱验证码</div>
        <div class="form-input">
          <input type="text" v-model="newEmailCaptcha" placeholder="请输入新邮箱验证码">
          <button class="suffix-btn" :disabled="sendding2" @click="sendCode2">{{sendding2?`${interval2} S 重新获取`:'获取验证码'}}</button>
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">修改绑定邮箱24小时内不可提现</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {Toast} from "vant";
  import HeadNav from '@/components/HeadNav';
  export default {
    name: "SecurityEmailPwd",
    components: {
      HeadNav
    },
    data() {
      return {
        email: "",
        oldEmailCaptcha: "",
        newEmailCaptcha: "",
        areaCode: "86",
        sendding1: false,
        interval1: 60,
        sendding2: false,
        interval2: 60,
      }
    },
    computed: {
      ...mapState(["userData"]),
      isPhone() {
        return this.userData.defaultAccount === 0
      }
    },
    methods: {
      /*旧手机或邮箱发送验证码*/
      sendCode1() {
        this.sendding1 = true;
        this.$http.post('/message/send', {
          type: this.isPhone ? "phone" : "email",
          option: '/setting/kyc2/modify_email',
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
      /*新邮箱接收验证码*/
      sendCode2() {
        this.sendding2 = true;
        this.$http.post('/message/access/send', {
          type: "email",
          email: this.email,
          apiKey: this.userData.apiKey,
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
      submit() {
        this.$http.post('/setting/kyc2/modify_email', {
          email: this.email,
          oldEmailCaptcha: this.oldEmailCaptcha,
          newEmailCaptcha: this.newEmailCaptcha,
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
</style>
