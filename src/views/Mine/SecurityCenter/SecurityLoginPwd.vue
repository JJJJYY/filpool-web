<template>
  <div class="form">
    <head-nav></head-nav>
    <div class="form-container page-container">
      <div class="form-item">
        <div class="form-title">当前登录密码</div>
        <div class="form-input">
          <input
            type="password"
            v-model="currPwd"
            title
            placeholder="请输入当前登录密码"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">新登录密码</div>
        <div class="form-input">
          <input
            type="password"
            v-model="newPwd"
            title
            placeholder="请输入登录密码"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-title">确认密码</div>
        <div class="form-input">
          <input
            type="password"
            v-model="newPwd2"
            title
            placeholder="请再次输入登录密码"
          />
        </div>
      </div>
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
          {{ isPhone ? "短信" : "邮箱" }}验证码({{
            isPhone ? userData.phone : userData.email
          }})
        </div>
        <div class="form-input">
          <input
            type="text"
            v-model="smsCode"
            title
            :placeholder="isPhone ? '请输入短信验证码' : '请输入邮箱验证码'"
          />
          <button class="suffix-btn" :disabled="sendding" @click="getSmsCode">
            {{ sendding ? `${interval} S 重新获取` : "获取验证码" }}
          </button>
        </div>
      </div>
      <button class="submit" @click="submit">确认</button>
      <div class="tips">修改登录密码24小时内不可提现</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import md5 from "md5";
import { Toast } from "vant";
import HeadNav from "@/components/HeadNav";
import { modifyPasswordApi, authSendApi } from "@/net/api/userInfoApi";
import { serviceURL } from "@/config";
export default {
  name: "SecurityLoginPwd",
  components: {
    HeadNav,
  },
  data() {
    return {
      currPwd: null,
      newPwd: null,
      newPwd2: null,
      smsCode: null,
      interval: 60,
      sendding: false,
      imgCode: "",
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
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      let newTime = new Date().getTime();
      this.imgCodeUrl = `${serviceURL}/public/ImageCode.php?uuid=${newTime}`;
    },
    async submit() {
      await this.update();
    },
    update() {
      if (!this.newPwd) {
        Toast("请输入新密码");
        return;
      }
      if (this.newPwd !== this.newPwd2) {
        Toast("两次输入的新密码不一致");
        return;
      }
      if (!this.smsCode) {
        Toast("请输入验证码");
        return;
      }
      const postData = {
        oldPassword: md5(this.currPwd),
        password: md5(this.newPwd),
        code: this.smsCode,
      };
      modifyPasswordApi(postData).then((res) => {
        if (res.ret === 200) {
          Toast("密码修改成功,请重新登录");
          window.localStorage.clear();
          this.$store.commit("setUserData", {});
          this.$router.replace({ path: "/login" });
        }
      });
    },
    /*获取验证码*/
    getSmsCode() {
      this.sendding = true;
      const postData = {
        type: this.isPhone ? "phone" : "email",
        imageCaptcha: this.imgCode,
      };
      authSendApi(postData)
        .then((res) => {
          if (res.ret === 200) {
            Toast("验证码已发送请注意查收");
            let timer = setInterval(() => {
              if (this.interval > 0) {
                this.interval = --this.interval;
              } else {
                this.sendding = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        })
        .catch(() => {
          this.sendding = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";
@import "../../../assets/scss/form";
.suffix-btn {
}
</style>
