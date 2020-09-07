<template>
  <login-background class="container">
    <head-nav bg-color="rgba(0,0,0,0)" :border="false"></head-nav>
    <div class="regist-box page-container">
      <div class="types">
        <div @click="isMobileType = true" class="btn" :class="{ selected: isMobileType }">手机注册</div>
        <div @click="isMobileType = false" class="btn" :class="{ selected: !isMobileType }">邮箱注册</div>
      </div>
      <div class="form">
        <div class="form-container" style="padding-top: 20px;">
          <div class="form-item">
            <div class="form-title">{{isMobileType ? "手机注册" : "邮箱注册"}}</div>
            <div class="form-input">
              <div v-if="isMobileType" @click="showAreaPicker = true"
                   style="align-self: center; padding: 0 12px; border-right: 1px solid #ddd;">+{{countryInfo.code}} <i class="fa fa-sort-down" style="vertical-align: text-top;"></i>
              </div>
              <input type="text" title="" :placeholder="`请输入${isMobileType ? '手机号码' : '邮箱地址'}`" v-model="account">
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">图像验证码</div>
            <div class="form-input">
              <input type="text" title="" placeholder="请输入图像验证码" v-model="imgCode">
              <div @click="getImgCode" class="suffix-btn"
                   style="background: transparent; align-self: center; padding: 0;">
                <img :src="imgCodeUrl" alt="" style="max-width: 120px;">
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">{{isMobileType ? '短信验证码' : '邮箱验证码'}}</div>
            <div class="form-input">
              <input type="text" title="" placeholder="请输入验证码" v-model="accountCode">
              <button class="suffix-btn" @click="getSmsCode">{{isTimer ? duration + "S" : "获取验证码"}}</button>
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">登录密码</div>
            <div class="form-input">
              <!--            <input type="text" title="" placeholder="请输入登录密码" v-model="pwd">-->
              <input :type="isSecurity ? 'password':'text'" title="" placeholder="请设置登录密码" maxlength="18" v-model="pwd">
              <img v-if="!isSecurity" @click="isSecurity = !isSecurity" src="../../assets/img/login/enter_open_eye.png" alt="" class="form-item-security-btn">
              <img v-if="isSecurity" @click="isSecurity = !isSecurity" src="../../assets/img/change_password_icon_close_eye.png" alt="" class="form-item-security-btn">
            </div>
          </div>
          <div class="form-item">
            <div class="form-title">邀请码(选填)</div>
            <div class="form-input">
              <input type="text" title="" placeholder="请输入邀请码" v-model="inviteCode">
            </div>
          </div>
          <div class="deal">
            <!--<div class="deal-icon" :class="{selected: read}" @click="read = !read"></div>
            <div class="intro">我已阅读并同意<a @click="showAircle">《用户协议》</a></div>-->
            <van-checkbox v-model="read" checked-color="#e49c3a" icon-size="13px" shape="square">
              <span style="font-size: 13px;color: #575c62;">我已阅读并同意</span>
              <span style="color: #e49c3a;font-size: 13px;" @click.stop="showAircle">《用户协议》</span>
            </van-checkbox>
          </div>
          <button class="submit" @click="submit">下一步</button>
        </div>
      </div>
    </div>
    <area-select v-model="showAreaPicker" @select="setCountry"/>
    <div class="channelModal" v-if="showChannelModal">
        <img :src="channelData.image" alt="" class="channelImg" @click="closeChannelModal">
    </div>
  </login-background>
</template>

<script>
  import LoginBackground from "@/views/Login/LoginBackground";
  import {Popup, Toast, Checkbox} from "vant";
  import AreaSelect from "./AreaSelect";
  //import {v4} from 'uuid'
  import HeadNav from "@/components/HeadNav";
  import {createWebview, isH5 } from "@/utils/utilTools";
  import { serviceURL } from '@/config';
  import { getCookie } from '@/utils/utilTools';

  export default {
    name: "Register",
    components: {
      HeadNav,
      AreaSelect,
      LoginBackground,
      [Checkbox.name]: Checkbox,
      [Popup.name]: Popup,
    },
    data() {
      return {
        isMobileType: true,
        imgCodeUrl: ``,
        showAreaPicker: false,
        countryInfo: {},
        area: '86',         ///< 区号
        read: false,      ///< 用户协议是否已读
        account: '',    ///< 账号
        imgCode: '',    ///< 图形验证码
        accountCode: '',///< 账号验证码
        pwd: '',        ///< 登录密码
        inviteCode: this.$route.params.inviteCode, ///< 邀请码
        duration: 60,   ///< 倒计时
        isTimer: false,  ///< 是否在倒计时,
        isSecurity: true,
        channelData: {},
        showChannelModal: false
      }
    },
    created() {
      /// 设置Cookie
      //this.$cookies.set('APP_COOKIE', `${v4()}`)
      //setCookie("APP_COOKIE", Math.random().toString());
      this.uuu = this.imgCodeUrl;
      this.uuid = "";
      this.getImgCode();
      if (isH5) {
        this.checkChannel();
      }
    },
    watch: {
      imgCodeUrl: function () {
        // this.$cookies.remove('APP_COOKIE')
      }
    },
    methods: {
      checkChannel() {
        let channel = this.$route.query.channel;
        this.$http.post('/general/access/getByChannel', {channel: channel}).then((res) => {
          if (res.data.data.length > 0) {
            this.channelData = res.data.data[0];
            this.showChannelModal = true;
          }
        })
      },
      closeChannelModal() {
        this.showChannelModal = false;
        let channel = this.$route.query.channel;
        this.$http.post("/general/access/download", {channel: channel, uuid: this.channelData.id})
      },
      submit() {
        if (this.account.length === 0) {
          Toast("请输入正确的邮箱或手机号码")
          return
        }
        if (this.account.length === 0 || this.imgCode.length === 0 || this.accountCode.length === 0 || this.pwd.length === 0) {
          Toast("请填写完整信息")
          return;
        }
        /*if (!this.inviteCode) {
          Toast("请输入邀请码");
          return;
        }*/
        if (this.read === false) {
          Toast("请阅读并同意用户协议")
          return;
        }

        this.$router.push({
          path: '/setTransPwd',
          query: {
            account: this.account,
            imgCode: this.imgCode,
            accountCode: this.accountCode,
            pwd: this.pwd,
            inviteCode: this.inviteCode,
            area: this.countryInfo.code,
            type: this.isMobileType?'phone':'email'
          }
        })
      },
      getImgCode() {
        this.uuid = new Date().getTime();
        this.imgCodeUrl = `${serviceURL}/auth/access/captcha?uuid=${this.uuid}`;
        /*let request = new XMLHttpRequest();
        let app_cookie = Math.random().toString();

        setCookie("APP_COOKIE", app_cookie);
        request.responseType = 'blob';
        request.open('get', `${serviceURL}/auth/access/captcha`, true);
        request.setRequestHeader('APP_COOKIE', app_cookie);

        request.withCredentials = true;
        request.onreadystatechange = () => {
          if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            let imgURL = URL.createObjectURL(request.response);
            this.imgCodeUrl = imgURL;
          }
        };
        request.send(null);*/
        /*this.imgCodeUrl = `${this.uuu}?v${Math.random()}`*/
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
      getSmsCode() {
        if (this.account.length === 0) {
          Toast("请输入正确的邮箱或手机号码")
          return
        }
        if (this.imgCode.length === 0) {
          Toast("请输入图像验证码")
          return
        }
        this.$http.post(`/message/access/send?uuid=${this.uuid}`, {
          'areaCode': this.countryInfo.code,
          'phone': this.isMobileType?this.account:null,
          'imageCaptcha': this.imgCode,
          'type': this.isMobileType ? 'phone' : 'email',
          'email': this.isMobileType?null:this.account,
          'purpose': 1
        }, {
          headers: {
            "APP_COOKIE": getCookie("APP_COOKIE")
          }
        }).then(data => {
          this.startTimer()
          console.log(data)
        })
      },
      /*设置国家*/
      setCountry (item) {
        this.countryInfo = item;
      },
      /*查看用户协议*/
      showAircle () {
        this.$router.push({
          path: "/ServiceDetail"
        });
        /*let url = 'https://www.filpool.io/user/xieyi.html';
        if (this.$isH5) {
          //window.location.href = url;
          this.$router.push({
            path: '/openIframe',
            query: {
              title: '',
              url: url
            }
          })
        } else {
          let webview = createWebview(url, 'xieyi', {titleText: '用户协议'});
          webview.show('slide-in-right');
          this.$store.commit("setWebview", webview);
        }*/
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";
  @import "../../assets/scss/form";

  .container {

  }
  .regist-box{
    padding: 0 8px;
  }
  .types {
    padding: 32px 16px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .btn {
      color: $h3-color;
      font-size: 14px;
      margin-right: 12px;
    }

    .selected {
      color: $h1-color;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .deal {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;

    .deal-icon {
      @include size(12px);
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 2px;
    }

    .selected {
      background: $main-color;
    }

    .intro {
      font-size: 12px;
      color: $h1-color;
      margin-left: 6px;

      a {
        color: $main-color;
      }
    }


  }

  .form-item-security-btn {
    max-width: 18px;
    align-self: center;
    margin-right: 8px;
  }
  .channelModal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    .channelImg{
      width: 70%;
      margin: auto;
    }
  }
</style>
