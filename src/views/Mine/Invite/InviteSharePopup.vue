<template>
  <div class="main">
    <div class="title">分享好友</div>
    <div class="btn-group">
      <div class="btn" @click="$emit('save')">
        <img
          src="../../../assets/img/invite/invitation_icon_save.png"
          alt
          class="img"
        />
        <div class="title">我的专属海报</div>
      </div>
      <div class="btn copy" :data-clipboard-text="clipboardText">
        <img
          src="../../../assets/img/invite/invitation_icon_copy.png"
          alt
          class="img"
        />
        <div class="title">复制链接</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Clipboard from "clipboard";
import { pcOrigin } from "@/config";

export default {
  name: "InviteSharePopup",
  props: {
    inviteInfo: {
      default: () => ({}),
    },
  },
  computed: {
    clipboardText() {
      return `${window.location.host}/#/register/${this.inviteInfo.invitationCode}`;
    },
  },
  mounted() {
    /// 复制邀请码
    this.clipboard = new Clipboard(".copy");
    this.clipboard.on("success", () => {
      Toast("复制成功");
      this.$emit("copy");
    });
  },
  beforeDestroy() {
    this.clipboard.destroy();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";

.main {
  padding: 8px 26px 24px;
  background: $content-backgroun-color;

  .title {
    text-align: center;
    color: $h1-color;
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    padding: 0 32px;

    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;

      .img {
        width: 53px;
      }

      .title {
        margin-top: 16px;
      }
    }
  }
}
</style>
