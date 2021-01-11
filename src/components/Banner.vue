<template>
  <div class="Banner">
    <swiper class="swiper" :options="swiperOption" ref="bannerSwiper">
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
        <img class="banner-item" :src="item.image" alt />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { createWebview } from "@/utils/utilTools";
import { pcOrigin, commonHash } from "@/config";
import { getGeneralBannerApi } from "../net/api/homeApi";
let vm = null;
export default {
  name: "Banner",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      bannerList: [],
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          click: function() {
            vm.handleClick(this.realIndex);
          }
        }
      }
    };
  },
  created() {
    this.getBanner();
    vm = this;
  },
  methods: {
    getBanner() {
      getGeneralBannerApi().then(res => {
        this.bannerList = res.data;
        this.$nextTick(() => {
          if (this.$refs.bannerSwiper) {
            this.$refs.bannerSwiper.swiperInstance.loopCreate();
          }
        });
      });
    },
    handleClick(index) {
      let url = this.bannerList[index].content;
      let linkObj = document.createElement("a");
      linkObj.href = url;

      let useHash = false;
      commonHash.forEach(item => {
        if (linkObj.hash.indexOf(item) === 0) {
          useHash = true;
        }
      });
      if (useHash) {
        this.$router.push({
          path: linkObj.hash.replace("#", "")
        });
        return;
      }
      if (this.$isH5) {
        window.location.href = url;
      } else {
        //this.openByWebview(url);
        window.plus.runtime.openURL(url);
      }
    },
    openByWebview(url) {
      let webview = createWebview(url, "filpcoin", { titleText: "filpcoin" });
      webview.show("slide-in-right");
      this.$store.commit("setWebview", webview);
    }
  }
};
</script>

<style lang="scss" scoped>
.Banner {
  position: relative;
  background-color: #fff;
  /*padding-top: 32px;*/
  min-height: 32vw;
  .swiper {
    height: auto;
    .swiper-slide {
      height: 130px;
    }
  }
}
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.banner-item {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
.swiper-pagination {
  /deep/.swiper-pagination-bullet {
    margin-right: 5px;
  }
}
</style>
