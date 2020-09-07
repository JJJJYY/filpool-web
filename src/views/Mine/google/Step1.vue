<template>
    <div class="Step1">
      <div class="bindText bindText_1">
        1、在手机上下谷歌验证器（Google Authenticator) APP，请用手机直接扫描下方二维码下载谷歌验证器
      </div>
      <div class="qrCodeBox">
        <div id="googleCode"></div>
      </div>
      <div class="bindText bindText_2">
        2、如果您无法扫描二维码，请直接在各大应用商店或使用手机浏览器搜索谷歌验证器搜索“谷歌验证器”下载 App
      </div>
      <div class="btnBox">
        <button class="stepBtn submit" style="margin-top: 40px;" @click="submit">下一步</button>
      </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { isAndroid, appStore, googlePlay } from '@/utils/utilTools';
export default {
  name: "Step1",
  mounted() {
    let url = isAndroid()?googlePlay:appStore;
    new QRCode('googleCode', {
      width: 120,
      height: 120,
      text: url
    });
  },
  methods: {
    submit () {
      this.$emit("setStep", 2);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base.scss";
@import "~@/assets/scss/form.scss";
.Step1{
  font-size: 12px;
  line-height: 18px;
  .bindText{
    color: $h3-color;
  }
  .qrCodeBox{
    text-align: center;
    padding: 44px 0;
  }
}
#googleCode{
  display: inline-block;
  min-height: 120px;
}
.btnBox{
  /*position: absolute;
  bottom: 34px;
  left: 0;
  right: 0;*/
  text-align: center;
}

</style>