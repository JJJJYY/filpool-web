<template>
  <div>
    <button @click="startTimer">获取验证码</button>
  </div>
</template>

<script>
  export default {
    name: "CountdownBtn",
    data() {
      return {
        time: 5,
        title: '获取验证码',
        disabled: ''
      }
    },
    methods: {
      startTimer() {
        setInterval(function () {
          this.title = `${this.time}S`
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/base";
  @import "../assets/scss/form";

</style>
