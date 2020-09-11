<template>
  <div class="GoogleCheck">
    <div class="bindText bindText_1">1、请先验证原谷歌验证码</div>
    <div class="inputBox" style="margin-top: 40px;">
      <p style="margin-bottom: 8px;">谷歌验证码</p>
      <input type="text" class="code" v-model="gaCaptcha" placeholder="请输入谷歌验证码" />
    </div>
    <div class="btnBox">
      <button class="stepBtn submit" style="margin-top: 40px;" @click="check">下一步</button>
    </div>
  </div>
</template>

<script>
import { checkOldGaApi } from "@/net/api/userInfoApi";
export default {
  name: "GoogleCheck",
  data() {
    return {
      gaCaptcha: "",
    };
  },
  methods: {
    check() {
      const postData = {
        captcha: this.gaCaptcha,
      };
      checkOldGaApi(postData).then((res) => {
        if (res.ret === 200) {
          this.$emit("setStep", 2, res.data);
        }
      });
      // this.$http
      //   .get("/setting/ga/check_old_ga", {
      //     captcha: this.gaCaptcha,
      //   })
      //   .then((res) => {
      //     this.$emit("setStep", 2, res.content);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base.scss";
@import "~@/assets/scss/form.scss";
.GoogleCheck {
  font-size: 12px;
  line-height: 18px;
  .bindText {
    color: $h3-color;
  }
  .code {
    border: 1px solid #ddd;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .btnBox {
    position: absolute;
    bottom: 34px;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>