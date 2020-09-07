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
              <input type="text" title="" placeholder="输入手机号码或邮箱" v-model="account">
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">图片验证码</div>
            <div class="form-input">
              <input type="text" title="" placeholder="请输入图片验证码" v-model="imgCode">
              <div @click="getImgCode" class="suffix-btn"
                   style="background: transparent; align-self: center; padding: 0;">
                <img :src="imgCodeUrl" alt="" style="max-width: 120px;">
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">验证码</div>
            <div class="form-input">
              <input type="text" title="" placeholder="请输入验证码" v-model="code">
              <button class="suffix-btn" @click="getCode">{{isTimer ? duration + "S" : "获取验证码"}}</button>
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
  import {Toast} from "vant";
  //import {v4} from 'uuid';
  import { serviceURL } from '@/config';
  import HeadNav from "@/components/HeadNav";
  //import {setCookie, getCookie} from '@/utils/utilTools';

  export default {
    name: "ForgetPwd",
    components: {
      LoginBackground,
      HeadNav
    },
    data() {
      return {
        account: '',
        code: '',
        imgCode: '',
        imgCodeUrl: '',
        isTimer: false,
        duration: 60,
        areaCode: '86'
      }
    },
    created() {
      //this.$cookies.set('APP_COOKIE', `${v4()}`)
      this.uuid = "";
      this.getImgCode();
      //this.$http.get("http://47.106.109.98:9001/auth/access/captcha")
      /*this.$http.get('/auth/access/captcha').then(() => {
        alert('???????')
      }).catch(() => {
        alert(7777)
      })*/
    },
    mounted() {
      /*let request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('get', `${serviceURL}/auth/access/captcha`, true);
      request.setRequestHeader('APP_COOKIE', getCookie("APP_COOKIE"));
      request.onreadystatechange = (e) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
          let src = URL.createObjectURL(request.response);
          console.log(src)
          console.log(e)
        }
      };
      request.send(null);*/
    },
    methods: {
      submit() {
        if (this.account.length === 0) {
          return
        }
        if (this.code.length === 0) {
          return
        }
        this.$router.push({
          path: '/resetPwd',
          query: {
            account: this.account,
            code: this.code,
            areaCode: this.areaCode,
            imageCode: this.imgCode,
            type: this.isMobile() ? 'phone' : 'email',
          }
        })
      },
      getImgCode() {
        this.uuid = new Date().getTime();
        this.imgCodeUrl = `${serviceURL}/auth/access/captcha?uuid=${this.uuid}`;
        /*let request = new window.plus.net.XMLHttpRequest();
        let app_cookie = Math.random().toString();

        setCookie("APP_COOKIE", app_cookie);
        request.responseType = 'blob';
        request.open('get', `${serviceURL}/auth/access/captcha`, true);
        request.setRequestHeader('APP_COOKIE', app_cookie);

        request.withCredentials = true;
        request.onreadystatechange = () => {
          alert(request.responseText);
          if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            let imgURL = URL.createObjectURL(request.response);
            this.imgCodeUrl = imgURL;
          }
        };
        request.send(null);*/
        /*console.log(serviceURL)
        let app_cookie = Math.random().toString();
        setCookie("APP_COOKIE", app_cookie);
        this.$http.get("/auth/access/captcha", {} , {
          responseType: 'blob',
          headers: {
            "APP_COOKIE": app_cookie
          }
        }).then((data) => {
          alert(JSON.stringify(data));
          let imgURL = URL.createObjectURL(data);
          this.imgCodeUrl = imgURL;
        }).catch((res) => {
          alert(res + '????????')
        })*/
        //this.imgCodeUrl = `${serviceURL}auth/access/captcha?v=${v4()}`
      },
      getCode() {
        if (this.account.length === 0) {
          Toast("请输入正确的邮箱或手机号码")
          return
        }
        if (this.imgCode.length === 0) {
          Toast("请输入图像验证码")
          return
        }
        //let uuid = getCookie("APP_COOKIE");
        this.$http.post(`/message/access/send?uuid=${this.uuid}`, {
          areaCode: this.areaCode,
          phone: this.account,
          imageCaptcha: this.imgCode,
          type: this.isMobile() ? 'phone' : 'email',
          email: this.account,
          purpose: 2
        }).then(data => {
          this.startTimer();
          console.log(data)
        }).finally()
      },
      isMobile() {
        return /^[1]([3-9])[0-9]{9}$/.test(this.account)
      },
      startTimer() {
        if (this.isTimer) {
          return
        }
        this.isTimer = true
        let timer = setInterval(() => {
          this.duration -= 1
          if (this.duration <= 0) {
            this.isTimer = false
            this.duration = 60
            clearInterval(timer)
          }
        }, 1000)
      },
    }
    /*beforeDestroy() {
      delCookie("APP_COOKIE");
    }*/
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";
  @import "../../assets/scss/form";

  .container {
    .forget-box{
      display: flex;
      flex-direction: column;
      padding: 0 24px;
    }
    .form-container {
      padding: 32px 0;
    }
    .title{
      font-size: 20px;
      font-weight: bold;
      color: #24375E;
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
