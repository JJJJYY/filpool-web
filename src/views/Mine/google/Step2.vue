<template>
  <div class="Step2">
    <div class="bindText bindText_1">1、用谷歌验证器 App 扫描一下二维码获取您的谷歌验证码</div>
    <div class="qrCodeBox">
      <div id="googleCode"></div>
    </div>
    <div class="bindText bindText_2">2、如果您无法扫描二维码，您还可以选择”手动添加”的方式获取谷歌验证码</div>
    <div class="keyBox">
      <span>密钥：{{gaSecret.secret}}</span>
      <div class="keyImgBox copyBtn" :data-clipboard-text="gaSecret.secret">
        <img src="@/assets/img/mine/invitation_icon_copy.png" class="copy" alt />
      </div>
    </div>
    <div class="btnBox">
      <button class="stepBtn submit" style="margin-top: 40px;" @click="submit">下一步</button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { Toast } from "vant";
import Clipboard from "clipboard";
import { createGaApi } from "@/net/api/userInfoApi";
export default {
  name: "Step2",
  props: {
    actionType: {
      type: String,
      default: "",
    },
    googleInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      gaSecret: {},
    };
  },
  created() {
    this.getGa().then(() => {
      this.drawCode();
    });
  },
  mounted() {
    this.clipboard = new Clipboard(".copyBtn");
    this.clipboard.on("success", () => {
      Toast("复制成功");
    });
  },
  methods: {
    getGa() {
      return new Promise((resolve) => {
        if (this.actionType === "modify") {
          this.gaSecret = this.googleInfo;
          resolve();
        } else {
          createGaApi().then((res) => {
            this.gaSecret = res.data;
            resolve();
          });
          // this.$http.get("/setting/ga").then((res) => {
          //   console.log(res);
          //   this.gaSecret = res.content;
          //   resolve();
          // });
        }
      });
    },
    drawCode() {
      new QRCode("googleCode", {
        width: 120,
        height: 120,
        text: this.gaSecret.url,
      });
    },
    submit() {
      this.$emit("setStep", 3);
    },
  },
  beforeDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base.scss";
@import "~@/assets/scss/form.scss";
.Step2 {
  font-size: 12px;
  line-height: 18px;
  .bindText {
    color: $h3-color;
  }
  .qrCodeBox {
    text-align: center;
    padding: 44px 0;
  }
}
#googleCode {
  display: inline-block;
  min-height: 120px;
}
.keyBox {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: $h3-color;
  margin-top: 10px;
  margin-left: 18px;
}
.keyImgBox {
  padding: 8px;
}
.copy {
  width: 12px;
  font-size: 13px;
  margin-left: 12px;
}
.btnBox {
  /*position: absolute;
    bottom: 34px;
    left: 0;
    right: 0;*/
  text-align: center;
}
</style>