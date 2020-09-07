<template>
  <div class="form">
    <head-nav></head-nav>
    <div class="form-container">
      <div class="form-item">
        <div class="form-title">新资金密码</div>
        <div class="form-input">
          <input type="password" v-model="password" placeholder="请输入资金密码">
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">确认密码</div>
        <div class="form-input">
          <input type="password" v-model="password2" placeholder="再次输入资金密码">
        </div>

      </div>
      <div class="form-item">
        <div class="form-title">{{isPhone?'手机号码':'原邮箱'}}({{isPhone?userData.phone:userData.email}})</div>
        <div class="form-input">
          <input type="text" v-model="phoneCaptcha" placeholder="请输入验证码">
          <button class="suffix-btn" :disabled="sendding1" @click="sendCode1">{{sendding1?`${interval1} S 重新获取`:'获取验证码'}}</button>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">谷歌验证码</div>
        <div class="form-input">
          <input type="text" v-model="gaCaptcha" placeholder="请输入谷歌验证码">
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">修改资金密码24小时内不可提现</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {Toast} from "vant";
  import md5 from 'md5';
  import HeadNav from '@/components/HeadNav';
  export default {
    name: "SecurityTransPwd",
    components: {
      HeadNav
    },
    data () {
      return {
        password: "",
        password2: "",
        phoneCaptcha: "",
        gaCaptcha: "",
        areaCode: "86",
        sendding1: false,
        interval1: 60,
        sendding2: false,
        interval2: 60,
      }
    },
    computed: {
      ...mapState(["userData"]),
      isPhone () {
        return this.userData.defaultAccount === 0
      }
    },
    methods: {
      /*旧手机或邮箱发送验证码*/
      sendCode1 () {
        this.sendding1 = true;
        this.$http.post('/message/send', {
          type: this.isPhone?"phone":"email",
          option: '/setting/modify/pay_pwd',
        }).then(() => {
          Toast('验证码已发送请注意查收');
          let timer = setInterval(() => {
            if (this.interval1 > 0) {
              this.interval1 = --this.interval1;
            } else {
              this.sendding1 = false;
              clearInterval(timer);
            }
          }, 1000);
        }).catch(() => {
          this.sendding1 = false;
        });
      },
      submit () {
        if (this.password !== this.password2) {
          Toast("两次输入的密码不一致");
          return;
        }
        this.$http.post('/setting/modify/pay_pwd', {
          phoneCaptcha: this.phoneCaptcha,
          payPwd: md5(this.password),
          gaCaptcha: this.gaCaptcha,
          phone: this.userData.phone,
          email: this.userData.email,
          type: this.isPhone?'phone':'email'
        }).then(() => {
          Toast("修改成功");
          this.$router.goBack();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/base";
  @import "../../../assets/scss/form";


</style>
