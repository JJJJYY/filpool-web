<template>
  <div class="Download">
    <head-nav left-text="首页" @back="back" :overrideBack="true"></head-nav>
    <div class="page-container back">
      <img src="@/assets/img/download/download1.png" class="img1" alt />
      <div class="textBox">
        <img src="@/assets/img/download/download2-2.png" class="img2" alt />
        <img
          src="@/assets/img/download/download2-1.png"
          class="img2"
          style="margin-top: 14px;"
          alt
        />
      </div>
      <div class="content">
        <img src="@/assets/img/download/download3.png" class="img3" alt />
        <button class="download" @click="download">下载APP</button>
      </div>
    </div>
    <div id="modal" v-if="isWeixin">
      <div class="tipsBox">
        <img
          src="@/assets/img/download/download_icon_more.png"
          class="more"
          alt
        />
        <div class="clear"></div>
        <p class="modalText" style="margin-top: 7vw;">请点击右上角...</p>
        <p class="modalText" style="margin-top: 1.2vh;">选择在“浏览器中打开”</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { isiOS, isWeixin } from "@/utils/utilTools";
import { ios, android } from "@/config";
import { downloadApi } from "../net/api/download";

export default {
  name: "Download",
  components: {
    HeadNav
  },
  data() {
    return {
      isWeixin: isWeixin(),
      downloadUrl: ""
    };
  },
  created() {
    let platform = isiOS() ? "iOS" : "android";
    let getData = {
      platform
    };
    downloadApi(getData).then(res => {
      if (res.ret === 200) {
        this.downloadUrl = res.data;
      }
    });
  },
  methods: {
    download() {
      if (isiOS()) {
        window.location.href = this.downloadUrl;
      } else {
        window.open(this.downloadUrl);
      }
    },
    back() {
      /*window.location.href = window.location.origin;*/
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  background-image: url("~@/assets/img/download/download-bg.png");
  background-position: top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-origin: content-box;
  padding-bottom: 0;
  min-height: calc(100vh - 54px);
  overflow: hidden;
}
.img1 {
  width: 26.93vw;
  height: auto;
  margin: 4vw;
  vertical-align: bottom;
}
.img2 {
  width: 72.8vw;
  height: auto;
  margin: 0 4vw;
  vertical-align: bottom;
}
.content {
  position: relative;
  min-height: 60vh;
}
.img3 {
  width: 100vw;
  vertical-align: bottom;
}
.download {
  width: 38vw;
  background: #2559a5ff;
  color: #fff;
  font-size: 4.5vw;
  outline: none;
  border: none;
  height: 10.7vw;
  border-radius: 5.3vw;
  position: absolute;
  left: 4vw;
  bottom: 8vw;
}

#modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  text-align: right;
}
.tipsBox {
  display: inline-block;
  text-align: left;
  color: #fff;
  margin-right: 4.4vw;
  margin-top: 3.65vh;
}
.more {
  width: 6.26vw;
  height: 6.26vw;
  float: right;
  margin-right: 5vw;
}
.more:after {
  display: block;
  content: "123456";
  clear: both;
  width: 100px;
  height: 50px;
  float: right;
}
.modalText {
  font-size: 3.47vw;
}
</style>
