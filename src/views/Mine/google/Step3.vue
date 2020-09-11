<template>
  <div class="Step3">
    <div class="bindText bindText_1">1、输入谷歌验证码，绑定谷歌验证</div>
    <div class="inputBox" style="margin-top: 40px;">
      <p>谷歌验证码</p>
      <input
        type="text"
        class="code"
        v-model="gaCaptcha"
        placeholder="请输入谷歌验证码"
        style="margin-top: 8px;"
      />
    </div>
    <div class="btnBox">
      <button
        class="stepBtn submit"
        style="margin-top: 40px;"
        @click="bind"
      >{{actionType==='modify'?'修改谷歌验证':'开启谷歌验证'}}</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { bindGaApi } from "../../../net/api/userInfoApi";
export default {
  name: "Step3",
  props: {
    actionType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      gaCaptcha: "",
    };
  },
  methods: {
    bind() {
      const postData = {
        captcha: this.gaCaptcha,
      };
      bindGaApi(postData).then((res) => {
        if (res.ret === 200) {
          console.log(res);
          let text = this.actionType === "modify" ? "修改成功" : "绑定成功";
          Toast(text);
          this.$store.dispatch("reloadUserData");
          this.$router.push({
            path: "/securityCenter",
          });
        }
      });
      // let url =
      //   this.actionType === "modify"
      //     ? "/setting/ga/rebind"
      //     : "/setting/bind_ga/check";
      // this.$http
      //   .post(url, {
      //     captcha: this.gaCaptcha,
      //   })
      //   .then(() => {
      //     let text = this.actionType === "modify" ? "修改成功" : "绑定成功";
      //     Toast(text);
      //     this.$store.dispatch("reloadUserData");
      //     this.$router.push({
      //       path: "/securityCenter",
      //     });
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base.scss";
@import "~@/assets/scss/form.scss";
.Step3 {
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