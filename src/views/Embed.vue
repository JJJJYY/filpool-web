<template>
  <div>
    <iframe ref="main" src="https://m.baidu.com" frameborder="0" class="main"></iframe>
  </div>
</template>

<script>
  export default {
    name: "Embed",
    data() {
      return {
        url: 'https://m.baidu.com'
      }
    },
    watch: {
      url(val) {
        this.$refs.main.contentWindow.location.replace(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    display: block;
    border: 0;
    height: 100%;
    width: 100%;
  }
</style>
