<template>
  <div class="form">
    <head-nav></head-nav>
    <div class="form-container">
      <div class="form-item">
        <div class="form-title">图像验证码</div>
        <div class="form-input">
          <input
            type="text"
            title
            placeholder="请输入图像验证码"
            v-model="imgCode"
          />
          <div
            @click="getImgCode"
            class="suffix-btn"
            style="background: transparent; align-self: center; padding: 0"
          >
            <img
              :src="imgCodeUrl"
              alt="请重新加载"
              style="max-width: 120px; color: black"
            />
          </div>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">
          {{ isPhone ? "原手机号码" : "邮箱" }}({{
            isPhone ? userData.phone : userData.email
          }})
        </div>
        <div class="form-input">
          <input
            type="text"
            v-model="oldPhoneCaptcha"
            placeholder="请输入验证码"
          />
          <button class="suffix-btn" :disabled="sendding1" @click="sendCode1">
            {{ sendding1 ? `${interval1} S 重新获取` : "获取验证码" }}
          </button>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新手机号码</div>
        <div class="form-input">
          <button class="prefix-btn" @click="showAreaPicker = true">
            +{{ countryInfo.code }}
            <i
              class="fa fa-sort-down"
              style="display: inline-block; margin-bottom: 2px"
            ></i>
          </button>
          <input type="text" v-model="phone" placeholder="请输入新手机号码" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">验证码</div>
        <div class="form-input">
          <input
            type="text"
            v-model="newPhoneCaptcha"
            placeholder="请输入短信验证码"
          />
          <button class="suffix-btn" :disabled="sendding2" @click="sendCode2">
            {{ sendding2 ? `${interval2} S 重新获取` : "获取验证码" }}
          </button>
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">绑定手机号24小时内不可提现</div>
    </div>
    <area-select v-model="showAreaPicker" @select="setCountry" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import HeadNav from "@/components/HeadNav";
import AreaSelect from "@/views/Login/AreaSelect";
import { authSendApi, modifyPhoneApi } from "@/net/api/userInfoApi";
import { sendApi } from "@/net/api/loginApi";
import { serviceURL } from "@/config";
export default {
  name: "SecurityMobileModify",
  components: {
    HeadNav,
    AreaSelect,
  },
  data() {
    return {
      phone: "",
      oldPhoneCaptcha: "", // 旧手机验证码
      newPhoneCaptcha: "",
      areaCode: "86",
      sendding1: false,
      interval1: 60,
      sendding2: false,
      interval2: 60,
      showAreaPicker: false,
      countryInfo: {},
      imgCode: "", // 图片验证码
      imgCodeUrl: "",
    };
  },
  computed: {
    ...mapState(["userData"]),
    isPhone() {
      return this.userData.defaultAccount === 0;
    },
  },
  created() {
    console.log(this.userData)
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      let newTime = new Date().getTime();
      this.imgCodeUrl = `${serviceURL}/public/ImageCode.php?uuid=${newTime}`;
    },
    /*设置国家*/
    setCountry(item) {
      this.countryInfo = item;
    },
    /*旧手机或邮箱发送验证码*/
    sendCode1() {
      this.sendding1 = true;
      const postData = {
        type: this.isPhone ? "phone" : "email",
        imageCaptcha: this.imgCode,
      };
      authSendApi(postData)
        .then((res) => {
          if (res.ret === 200) {
            Toast("验证码已发送请注意查收");
            let timer = setInterval(() => {
              if (this.interval1 > 0) {
                this.interval1 = --this.interval1;
              } else {
                this.sendding1 = false;
                clearInterval(timer);
                this.interval1 = 60;
              }
            }, 1000);
          }
        })
        .catch(() => {
          this.sendding1 = false;
          this.interval1 = 60;
        });
    },
    /*新手机发送验证码*/
    sendCode2() {
      this.sendding2 = true;
      const postData = {
        areaCode: this.countryInfo.code,
        type: "phone",
        to: this.phone,
        imageCaptcha: this.imgCode,
      };
      sendApi(postData)
        .then((res) => {
          Toast("验证码已发送请注意查收");
          let timer = setInterval(() => {
            if (this.interval2 > 0) {
              this.interval2 = --this.interval2;
            } else {
              this.sendding2 = false;
              clearInterval(timer);
              this.interval2 = 60;
            }
          }, 1000);
        })
        .catch(() => {
          this.sendding2 = false;
          this.interval2 = 60;
        });
    },
    submit() {
      const postData = {
        oldPhoneCaptcha: this.oldPhoneCaptcha,
        areaCode: this.countryInfo.code,
        phone: this.phone,
        newPhoneCaptcha: this.newPhoneCaptcha,
      };
      modifyPhoneApi(postData).then((res) => {
        if (res.ret === 200) {
          this.$store.dispatch("reloadUserData").then(() => {
            Toast("修改成功");
            this.$router.back();
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";
@import "../../../assets/scss/form";
.fa-sort-down {
  vertical-align: top;
  margin-left: 5px;
}
</style>
