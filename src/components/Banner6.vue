<template>
  <div class="Banner6">
    <div class="swiper-container">
      <swiper :options="swiperOption" class="swiper-wrapper">
        <swiper-slide class="swiper-slide">
          <div class="intro6-item">
            <img src="@/assets/img/home/home_icon_14.png" alt="" class="item-banner">
            <div class="item-title">技术实力强</div>
            <div class="item-dir"></div>
            <div class="item-content">
              FILPool矿池是由IPFS中国社区投资孵化的一家专业 Filecoin矿池，其核心技术团队有着超过十年的分布式存储行业开发经验，在Filecoin各个阶段测试网的测试成绩持续处于行业领先地位。
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="intro6-item">
            <img src="@/assets/img/home/home_icon_16.png" alt="" class="item-banner">
            <div class="item-title">挖矿效率高</div>
            <div class="item-dir"></div>
            <div class="item-content">
              FILPool矿池采用时空云科技独家研发的FILPool矿池采用时空云科技的IPFS深度定制分布式存储服务器“蜘蛛矿机”及分布式存储系统“MineOS”挖矿系统，在Filecoin的挖矿效率、稳定性以及安全性上持续处于行业领先水平。
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="intro6-item">
            <img src="@/assets/img/home/home_icon_15.png" alt="" class="item-banner">
            <div class="item-title">安全有保障</div>
            <div class="item-dir"></div>
            <div class="item-content">
              FILPool矿池由多家知名机构战略投资，收益公开透明，采用独创安全架构有效防范DDoS攻击，拥有十余年大规模IDC机房运维服务经验，提供2倍风险保证金承诺，全面保障用户收益。
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Banner6",
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
            slideToClickedSlide: true,
            width: 400
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/base";
  .Banner6{
    width: 100vw;
    overflow-x: hidden;
    background-color: #fff;
    margin: 16px 0;
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
  }
  .swiper-slide-active,.swiper-slide-duplicate-active{
  }

  .intro6 {
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 16px;
      color: $h1-color;
      margin-top: 12px;
      font-weight: bold;
    }

    .subtitle {
      margin-top: 8px;
      font-size: 12px;
      color: $h2-color;
    }

    &-item {
      margin-top: 18px;
      .item-banner {
        height: 120px;
      }

      .item-title {
        margin: 16px auto 0;
        text-align: left;
      }

      .item-dir {
        background: $main-color;
        height: 4px;
        width: 28px;
        margin: 12px 0;
      }

      .item-content {
        max-width: 160px;
        line-height: 150%;
        text-align: justify;
        font-size: 13px;
        color: $h2-color;
      }
    }
  }
</style>