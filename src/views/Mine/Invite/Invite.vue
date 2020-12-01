<template>
  <div class="page" :style="{ backgroundColor: 'rgba(0,0,0,0)' }">
    <head-nav bgcolor="rgba(0,0,0,0)"></head-nav>
    <div class="container page-container">
      <div class="main">
        <div class="h1">邀请好友 一起赚钱</div>
        <div class="h2">邀请好友下载APP,获取超高奖励</div>
        <div class="code-title">专属邀请码</div>
        <div class="code-container" id="copy-code" @click="copyCode">
          <div class="code">{{ item.invitationCode }}</div>
          <img
            style="height: 18px; margin-left: 8px;"
            src="../../../assets/img/invite/invitation_code_icon_copy.png"
            alt
          />
        </div>
        <button class="btn-gradient invite-btn" @click="toInvite">
          立即邀请
        </button>
        <div class="invite-desc">
          您已邀请人数
          <span>{{ item.inviteCount }}</span> ，购买算力人数
          <span>{{ item.purchaseCount }}</span
          >，累计获得 <span>{{ item.usdtReward }}</span
          >佣金
        </div>
        <div class="hr"></div>
        <div class="flow-title">邀请流程</div>
        <div class="flow-container">
          <div class="flow-item">
            <img
              class="flow-item-icon"
              src="../../../assets/img/invite/invitation_icon_1.png"
              alt
            />
            <div class="flow-item-desc">
              发送邀请
              <br />给好友
            </div>
          </div>
          <img
            class="flow-item-arrow"
            src="../../../assets/img/invite/invitation_icon_4.png"
            alt
          />
          <div class="flow-item">
            <img
              class="flow-item-icon"
              src="../../../assets/img/invite/invitation_icon_2.png"
              alt
            />
            <div class="flow-item-desc">
              好友下载
              <br />APP
            </div>
          </div>
          <img
            class="flow-item-arrow"
            src="../../../assets/img/invite/invitation_icon_4.png"
            alt
          />
          <div class="flow-item">
            <img
              class="flow-item-icon"
              src="../../../assets/img/invite/invitation_icon_3.png"
              alt
            />
            <div class="flow-item-desc">
              输入您的
              <br />邀请码
            </div>
          </div>
        </div>
      </div>
      <div class="reward">
        <div class="reward-header" @click="reward">
          <div>我的奖励</div>
          <img src="../../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div style="padding: 0 16px;">
          <div class="reward-icon-flow">
            <img
              src="../../../assets/img/invite/invitation_icon_1(1).png"
              alt
            />
            <img
              src="../../../assets/img/invite/invitation_icon_2(1).png"
              alt
            />
            <img
              src="../../../assets/img/invite/invitation_icon_3(1).png"
              alt
            />
          </div>
          <div class="reward-progress-container">
            <div class="reward-progress">
              <div
                class="reward-progress-high gradient"
                :style="{ width: currentLevelProgress + '%' }"
              ></div>
            </div>
            <img
              class="reward-progress-dot"
              :src="
                dotHighlight[0]
                  ? require('../../../assets/img/invite/user_center_icon_1.png')
                  : require('../../../assets/img/invite/user_center_icon_2.png')
              "
              alt
            />
            <img
              class="reward-progress-dot"
              :src="
                dotHighlight[1]
                  ? require('../../../assets/img/invite/user_center_icon_1.png')
                  : require('../../../assets/img/invite/user_center_icon_2.png')
              "
              alt
            />
            <img
              class="reward-progress-dot"
              :src="
                dotHighlight[2]
                  ? require('../../../assets/img/invite/user_center_icon_1.png')
                  : require('../../../assets/img/invite/user_center_icon_2.png')
              "
              alt
            />
          </div>
          <div class="reward-progress-num">
            <span class="reward-progress-num-item">8TB</span>
            <span class="reward-progress-num-item">96TB</span>
            <span class="reward-progress-num-item">480TB</span>
          </div>
        </div>
        <div class="hr"></div>
        <div class="reward-intro">
          <div class="reward-intro-item">
            <div class="reward-intro-item-title">累计邀请人数：</div>
            <div class="reward-intro-item-val">
              {{ item.inviteCount | parseFloatFilter }} 人
            </div>
          </div>
          <div class="reward-intro-item">
            <div class="reward-intro-item-title">累计购买人数：</div>
            <div class="reward-intro-item-val">
              {{ item.purchaseCount | parseFloatFilter }} 人
            </div>
          </div>
          <div class="reward-intro-item">
            <div class="reward-intro-item-title">累计推广数量：</div>
            <div class="reward-intro-item-val">
              {{ item.filpReward | parseFloatFilter }} TB
            </div>
          </div>
          <div class="reward-intro-item">
            <div class="reward-intro-item-title">累计获取佣金：</div>
            <div class="reward-intro-item-val">
              {{ item.usdtReward | parseFloatFilter }} USDT
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="showShare"
      :style="{ width: '100%' }"
      position="bottom"
      closeable
    >
      <InviteSharePopup
        @save="showInviteImg"
        @copy="copyInviteUrl"
        :inviteInfo="item"
      />
    </van-popup>
    <div class="inviteBox" v-if="showImg" @click="showImg = false">
      <img class="inviteImgData" :src="imageData" alt />
      <span class="downloadBtn" @click="saveToGallery" v-if="!$isH5"
        >保存至相册</span
      >
    </div>
    <div class="inviteImg" id="qrCodeUrl" ref="qrCodeUrl" />
    <img class="inviteImg" id="test1" />
  </div>
</template>

<script>
import InviteSharePopup from "./InviteSharePopup";
import QRCode from "qrcodejs2";
import { Popup, Toast } from "vant";
import Clipboard from "clipboard";
import HeadNav from "@/components/HeadNav";
import { downloadImg, saveBase64Img } from "@/utils/utilTools";
import { distributionDetailApi } from "@/net/api/userInfoApi";
import html2canvas from "html2canvas";
import { serviceURL } from "@/config";

export default {
  name: "Invite",
  components: {
    HeadNav,
    InviteSharePopup,
    [Popup.name]: Popup
  },
  data() {
    return {
      item: {},
      showShare: false,
      currentLevelProgress: 0,
      dotHighlight: [false, false, false],
      showImg: false,
      imageSrc: require("@/assets/img/back.png"),
      imageData: null
    };
  },
  mounted() {
    this.loadData();
    /// 复制邀请码
    new Clipboard("#copy-code", {
      text: () => this.item.invitationCode
    }).on("success", () => Toast("复制成功"));
  },
  methods: {
    toInvite() {
      this.showShare = true;
    },
    copyCode() {},
    copyInviteUrl() {
      this.showShare = false;
    },
    showInviteImg() {
      this.showShare = false;
      this.showImg = true;
      this.createQr();
    },
    reward() {
      this.$router.push("/inviteReward");
    },
    loadData() {
      let Host = "";
      if (!this.$isH5) {
        Host = serviceURL;
      }
      distributionDetailApi().then(res => {
        if (res.ret === 200) {
          this.item = res.data;
          new QRCode(
            "qrCodeUrl",
            {
              text: `${window.location.host}${Host}/#/register/${this.item.invitationCode}`,
              width: 110,
              height: 110
            },
            1000
          );
        }
      });
    },
    calcLevel() {
      let currentReward = this.item.totalPurchase / 1000;
      let currentProgress = 0;
      if (currentReward < 8) {
        currentProgress = currentReward / 8;
        this.dotHighlight = [false, false, false];
      } else if (currentReward >= 8 && currentReward < 96) {
        currentProgress = 16.6 + (((currentReward - 8) / (96 - 8)) * 100) / 3;
        this.dotHighlight = [true, false, false];
      } else if (currentReward >= 96 && currentReward <= 480) {
        currentProgress = 50 + (((currentReward - 96) / (480 - 96)) * 100) / 3;
        this.dotHighlight = [true, true, false];
      } else if (currentReward > 480) {
        currentProgress = 100;
        this.dotHighlight = [true, true, true];
      }
      this.currentLevelProgress = currentProgress;
    },
    createQr() {
      // 绘图
      var canvas = document.createElement("canvas");
      let self = this;
      html2canvas(document.getElementById("qrCodeUrl")).then(canvas2 => {
        var img = document.createElement("img");
        img.src = self.imageSrc;
        img.onload = function() {
          canvas.height = img.height;
          canvas.width = img.width;
          var cx = canvas.getContext("2d");
          cx.drawImage(img, 0, 0);

          cx.drawImage(canvas2, 60, 1194, 110, 110);
          let imgData = canvas.toDataURL("image/png");
          self.imageData = imgData;
        };
      });
    },
    //保存到相册
    saveToGallery() {
      // const link = document.createElement("a");
      // link.href = URL.createObjectURL(
      //   this.convertBase64UrlToFile(this.imageData)
      // );
      // link.download = "FILPool.jpeg";
      // link.click();
      // URL.revokeObjectURL(link.href);
      saveBase64Img(this.imageData)
        .then(() => {
          Toast("已保存到相册");
        })
        .catch(err => {
          Toast(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";
.container {
  background: transparent url("../../../assets/img/mine/invitation_bg_1.png")
    no-repeat;
  background-size: cover;
}

.hr {
  background: $divider-color;
  height: 1px;
  margin: 24px 0;
}

.main {
  margin: 8px 12px;
  border-radius: 6px;
  background: $content-backgroun-color;
  display: flex;
  flex-direction: column;

  .h1 {
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: $main-color;
  }

  .h2 {
    margin-top: 12px;
    font-size: 14px;
    text-align: center;
    color: $main-color;
  }

  .code-title {
    margin-top: 34px;
    color: $h1-color;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  .code-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    align-self: center;

    .code {
      font-size: 26px;
      font-weight: bold;
    }
  }

  .invite-btn {
    align-self: center;
    @include size(148px, 40px);
    border-radius: 20px;
    margin-top: 32px;
  }

  .invite-desc {
    text-align: center;
    color: $h3-color;
    font-size: 12px;
    margin-top: 18px;

    span {
      color: $main-color;
    }
  }

  .flow-title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

  .flow-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px;

    .flow-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-icon {
        @include size(42px);
      }

      &-desc {
        font-size: 12px;
        line-height: 120%;
        color: $h3-color;
        margin-top: 8px;
        text-align: center;
      }

      &-arrow {
        height: 8px;
      }
    }
  }
}

.reward {
  background: $content-backgroun-color;
  margin: 8px 12px 0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  .reward-header {
    display: flex;
    color: $h2-color;
    font-size: 13px;
    padding: 13px 12px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px $divider-color solid;

    img {
      height: 10px;
    }
  }

  .reward-icon-flow {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    img {
      @include size(34px);
    }
  }

  .reward-progress-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 8px;
    position: relative;

    .reward-progress {
      background: #ddd;
      position: absolute;
      height: 6px;
      border-radius: 3px;
      top: calc(50% - 3px);
      left: 0;
      right: 0;

      &-high {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 85%;
        border-radius: 3px;
      }

      &-dot {
        max-height: 16px;
        z-index: 1;
      }
    }
  }

  .reward-progress-num {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: $h2-color;
    margin-top: 6px;
    font-size: 13px;
  }

  .reward-intro {
    display: flex;
    flex-direction: column;
    padding: 0 16px;

    &-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 16px;

      &-title {
        color: $h3-color;
        font-size: 13px;
      }

      &-val {
        color: $h2-color;
        font-size: 14px;
      }
    }
  }
}
.inviteBox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .inviteImgData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80vh;
  }
  .downloadBtn {
    width: 120px;
    line-height: 32px;
    background-color: #2559a5ff;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    border-radius: 4px;
    text-align: center;
    color: #fff;
    z-index: 9999;
  }
}
.page-hidden {
  overflow: hidden;
}
.inviteImg {
  position: absolute;
  top: -110px;
  z-index: -1;
  width: 110px;
  height: 110px;
}
.image-size {
  width: 750px;
  height: 1334px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;

  .qr {
    width: 110px;
    height: 110px;
    position: absolute;
    left: 60px;
    top: 1194px;
  }
}
</style>
