<template>
  <div class="Banner5">
    <div class="swiper-container">
      <swiper :options="swiperOption" class="swiper-wrapper">
        <swiper-slide class="swiper-slide">
          <div class="intro5-item">
            <img class="intro5-img" src="@/assets/img/home/home_picture_2.png" alt="">
            <div class="intro5-item-text">
              <div class="title">全球IDC机房节点布局</div>
              <div class="subtitle">共享全球挖矿收益</div>
              <div class="title">保证724小时供电</div>
              <div class="subtitle">UPS不间断电源系统</div>
              <div class="title">企业级光纤宽带专线</div>
              <div class="subtitle">快速稳定</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="intro5-item">
            <img class="intro5-img" src="@/assets/img/home/home_picture_3.png" alt="">
            <div class="intro5-item-text">
              <div class="title">专业运维团队</div>
              <div class="subtitle">全方位运维服务</div>
              <div class="title">企业级安全防护</div>
              <div class="subtitle">保障服务器安全及用户资产</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="intro5-item">
            <img class="intro5-img" src="@/assets/img/home/home_picture_4.png" alt="">
            <div class="intro5-item-text">
              <div class="title">硬件软件及时升級</div>
              <div class="subtitle">先人一步抢占挖矿先机</div>
              <div class="title">智能报价系统</div>
              <div class="subtitle">自动调整参数挖矿效率更高</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "Banner5",
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
          slideToClickedSlide: true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/base";

  .Banner5 {
    background-color: #fff;
    margin: 12px 0;
    padding: 40px 0;
    text-align: left;
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
  }

  .swiper-slide-active, .swiper-slide-duplicate-active {
    transform: scale(1);
  }


  .intro5 {
    padding: 12px;
    position: relative;

    &-item {
      width: 188px;
      height: 276px;
      position: relative;

      &-text {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        bottom: 0;
        padding: 10px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 0 0 12px 12px;

        .title {
          color: $h3-color;
          font-size: 10px;
          margin-top: 14px;
          text-align: left;
        }

        .subtitle {
          color: #ddd;
          font-size: 13px;
          margin-top: 4px;
          text-align: left;
        }
      }
    }

    &-img {
      /*width: 188px;*/
      /*height: 276px;*/
      width: 188px;
      min-height: 276px;
      /*position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;*/
      z-index: -1;
    }
  }
</style>
