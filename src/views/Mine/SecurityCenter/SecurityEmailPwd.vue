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
          {{ isEmail ? "原邮箱" : "手机号码" }}({{
            isEmail ? userData.email : userData.phone
          }})
        </div>
        <div class="form-input">
          <input
            type="text"
            v-model="oldEmailCaptcha"
            placeholder="请输入验证码"
          />
          <button class="suffix-btn" :disabled="sendding1" @click="sendCode1">
            {{
              sendding1
                ? `${interval1} S
            重新获取`
                : "获取验证码"
            }}
          </button>
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新邮箱地址</div>
        <div class="form-input">
          <input type="text" v-model="email" placeholder="请输入新邮箱地址" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新邮箱验证码</div>
        <div class="form-input">
          <input
            type="text"
            v-model="newEmailCaptcha"
            placeholder="请输入新邮箱验证码"
          />
          <button class="suffix-btn" :disabled="sendding2" @click="sendCode2">
            {{ sendding2 ? `${interval2} S 重新获取` : "获取验证码" }}
          </button>
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">修改绑定邮箱24小时内不可提现</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import HeadNav from "@/components/HeadNav";
import { authSendApi, modifyEmailApi } from "@/net/api/userInfoApi";
import { sendApi } from "@/net/api/loginApi";
import { serviceURL } from "@/config";
export default {
  name: "SecurityEmailPwd",
  components: {
    HeadNav,
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
      imgCode: "", // 图片验证码
      imgCodeUrl: "",
    };
  },
  computed: {
    ...mapState(["userData"]),
    isEmail() {
      return this.userData.defaultAccount === 1; // 0是手机，1 是邮箱
    },
  },
  created() {
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      let newTime = new Date().getTime();
      this.imgCodeUrl = `${serviceURL}/public/ImageCode.php?uuid=${newTime}`;
    },
    /*旧手机或邮箱发送验证码*/
    sendCode1() {
      this.sendding1 = true;
      const postData = {
        type: this.isEmail ? "email" : "phone",
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
    /*新邮箱接收验证码*/
    sendCode2() {
      this.sendding2 = true;
      const postData = {
        type: "email",
        to: this.email,
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
        oldEmailCaptcha: this.oldEmailCaptcha,
        email: this.email,
        emailCaptcha: this.newEmailCaptcha,
      };
      modifyEmailApi(postData).then((res) => {
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
</style>
