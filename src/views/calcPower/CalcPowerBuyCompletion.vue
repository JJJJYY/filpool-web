<template>
  <div class="comple">
    <head-nav></head-nav>
    <img src="../../assets/img/succuseful_icon_ok.png" alt="">
    <div class="desc">恭喜您购买完成</div>
    <button class="btn-gradient" @click="$router.go(-1)">继续购买</button>
  </div>
</template>

<script>
  import HeadNav from '@/components/HeadNav';
  export default {
    name: "CalcPowerBuyCompletion",
    components: {
      HeadNav
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .comple {
    background: $content-backgroun-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*height: 100vh;*/
    img {
      display: block;
      width: 180px;
      margin-top: 72px;
    }

    .desc {
      color: $h3-color;
      font-size: 13px;
      margin-top: 14px;
    }

    button {
      width: 80%;
      height: 44px;
      border-radius: 22px;
      margin: 32px 0;
    }
  }
</style>
