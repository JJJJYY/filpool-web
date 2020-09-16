<template>
  <div>
    <div style="background-color: #fff;">
      <van-nav-bar :title="$route.meta.title" @click-right="recode" @click-left="$router.goBack()">
        <template #right>
          <div style="color: #86929D;">充币记录</div>
        </template>
        <template #left>
          <img
            src="../../assets/img/tibi_icon_return.png"
            style="max-height: 16px;"
            alt
            v-if="!$route.meta.backBtnHidden"
          />
        </template>
      </van-nav-bar>
      <!--<head-nav :title="$route.meta.title" :override-back="true" @back="recode" @clickRight="recode">
        <div slot="right">充币记录</div>
      </head-nav>-->
    </div>
    <div class="currency" @click="selectCurrency">
      <img :src="currAsset.icon" alt class="icon" />
      <div class="name">{{currAssetInfo.asset}}</div>
      <div class="select">切换币种</div>
      <img src="../../assets/img/mine/tab_icon_more.png" alt class="more" />
    </div>
    <div class="main">
      <div class="qr-tip">扫描二维码获取充币地址</div>
      <div class="qr" ref="qrCodeUrl"></div>
      <button class="save btn-gradient" @click="saveImg" v-if="!$isH5">保存二维码至相册</button>
    </div>
    <div class="address-container">
      <div class="title">充币地址</div>
      <div class="address">{{currAssetInfo.address}}</div>
      <div class="copy" :data-clipboard-text="currAssetInfo.address">复制地址</div>
    </div>
    <div class="intro">
      温馨提示：
      <br />
      1、请勿向上述地址充值任何非 {{currAsset.asset}} 资产,否则资产将不可找回;
      <br />2、请选择“ERC20”的链进行充值
      <br />
      3、最小充值数量: {{currAssetInfo.minDeposit || 0}} {{currAsset.asset}} , 小于最小数量的充值将不会上账目无法退回。
      <br />
      4、手续费：{{currAsset.minFee | parseFloatFilter}} {{currAsset.asset}}。
      <br />5、请务必确认电脑及浏览器安全,防止信息被簒改或泄露。
    </div>
  </div>
</template>

<script>
import Toast from "vant/lib/toast";
import QRCode from "qrcodejs2";
import { NavBar, Popup } from "vant";
import Clipboard from "clipboard";
import { saveBase64Img } from "@/utils/utilTools";
import html2canvas from "html2canvas";
//import HeadNav from '@/components/HeadNav';
// import CurrencySelect from "./CurrencySelect";
import { userAddressApi, assetTypeApi } from "@/net/api/userInfoApi";

export default {
  name: "CurrencyTopup",
  components: {
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      currAsset: {},
      currAssetInfo: {},
      // show: true
    };
  },
  created() {
    // let currency = this.$route.query.currency
    // if (currency) {
    //   this.currAssetInfo = currency
    // } else {
    this.loadAllAsset();
    // }
  },
  mounted() {
    this.clipboard = new Clipboard(".copy");
    this.clipboard.on("success", () => {
      Toast("复制成功");
    });
  },
  // watch: {
  // currAsset: function (val) {
  //   const postData = {
  //     asset: val.asset,
  //     blockChain: val.blockChain,
  //   };
  //   userAddressApi(postData).then((res) => {
  //     this.currAssetInfo = res.data;
  //     this.createQr();
  //   });
  //   // this.$http
  //   //   .get("/asset/deposit/address", {
  //   //     asset: val.asset,
  //   //     block_chain: val.blockChain,
  //   //   })
  //   //   .then((response) => {
  //   //     this.currAssetInfo = response.content;
  //   //     this.createQr();
  //   //   });
  // },
  // },
  methods: {
    // 充值地址
    currAssetApi() {
      const postData = {
        asset: this.currAsset.asset,
        blockChain: this.currAsset.blockChain,
      };
      userAddressApi(postData).then((res) => {
        this.currAssetInfo = res.data;
        this.createQr();
      });
    },
    /// 获取全部的币种
    loadAllAsset() {
      assetTypeApi().then((res) => {
        if (res.ret === 200) {
          let asset = null;
          res.data.forEach((val) => {
            if (val.asset === this.$route.query.asset) {
              asset = val;
            }
          });
          this.currAsset = asset;
          this.currAssetApi();
        }
      });
      // this.$http.get("/asset/tokens").then((response) => {
      //   let asset = null;
      //   response.content.forEach((val) => {
      //     if (val.asset === this.$route.query.asset) {
      //       asset = val;
      //     }
      //   });
      //   this.currAsset = asset;
      //   console.log(`当前Asset => ${asset.asset}`);
      //   this.currAssetApi();
      // });
    },
    copy() {
      Toast("复制成功???");
    },
    saveImg() {
      //   /*let base64Str = this.$refs.qrCodeUrl.children[1].src;*/
      //   this.createPicture().then((base64Str) => {
      //     saveBase64Img(base64Str)
      //       .then(() => {
      //         Toast("已保存至相册");
      //       })
      //       .catch((err) => {
      //         Toast(err);
      //       });
      //   });
      // },
      // createPicture() {
      //   return new Promise((resolve) => {
      //     html2canvas(this.$refs.qrCodeUrl, {
      //       backgroundColor: null,
      //       width: 130,
      //       height: 130,
      //     }).then((canvas) => {
      //       let imgData = canvas.toDataURL("image/jpeg");
      //       resolve(imgData);
      //     });
      //   });
    },
    createQr() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.currAssetInfo.address,
        width: 130,
        height: 130,
      });
    },
    selectCurrency() {
      this.$router.replace({
        path: "/selectCurrency",
        query: {
          isTopUp: true,
        },
      });
    },
    recode() {
      this.$router.push({
        path: "/topupExtractRecode",
        query: {
          isTopUp: true,
          asset: this.$route.query.asset,
        },
      });
    },
  },
  beforeDestroy() {
    this.clipboard.destroy();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.currency {
  margin-top: 8px;
  background: $content-backgroun-color;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid $divider-color;

  .icon {
    @include size(20px);
    /*background: red;*/
  }

  .name {
    margin-left: 8px;
    color: $h2-color;
    font-size: 16px;
    flex: 1;
  }

  .select {
    font-size: 14px;
    color: $h2-color;
  }

  .more {
    max-height: 10px;
    margin-left: 8px;
  }
}

.main {
  background: $content-backgroun-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px $divider-color solid;

  .qr-tip {
    margin-top: 32px;
    color: #999;
    font-size: 13px;
  }

  .qr {
    width: 130px;
    height: 130px;
    margin: 24px 0;
  }

  .save {
    height: 40px;
    border-radius: 20px;
    padding: 0 16px;
    margin-bottom: 24px;
    font-size: 14px;
  }
}

.address-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: $content-backgroun-color;

  .title {
    color: $h2-color;
    font-size: 14px;
  }

  .address {
    margin-left: 12px;
    color: $h2-color;
    flex: 1;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .copy {
    display: inline-block;
    border: 0;
    color: $main-color;
    font-size: 12px;
    border-left: 1px $main-color solid;
    padding: 4px 0 4px 16px;
  }
}

.intro {
  margin-top: 8px;
  background: $content-backgroun-color;
  padding: 16px;
  color: $h3-color;
  font-size: 12px;
  line-height: 200%;
}
</style>
