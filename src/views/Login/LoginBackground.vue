<template>
  <div class="container">
    <img src="../../assets/img/login/login_bg_1.png" alt="" class="star-1">
    <img src="../../assets/img/login/login_bg_2.png" alt="" class="star-2">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "LoginBackground",
    mounted() {
      if (!this.$isH5) {
        this.$el.style.height=document.documentElement.clientHeight + 'px'
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .star-1 {
    position: fixed;
    top: 0;
    right: 0;
    max-width: 100px;
  }

  .star-2 {
    position: absolute;
    left: 0;
    bottom: 0;
    max-width: 60px;
  }

  .container {
    position: relative;
    background: $content-backgroun-color;
    box-sizing: border-box;
  }
</style>
