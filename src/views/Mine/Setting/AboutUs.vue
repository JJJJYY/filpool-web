<template>
  <div class="main">
    <head-nav></head-nav>
    <div v-html="content" class="content page-container"></div>
  </div>
</template>

<script>
  import HeadNav from "@/components/HeadNav";

  export default {
    name: "AboutUs",
    components: {
      HeadNav
    },
    data() {
      return {
        content: ""
      }
    },
    created() {
      this.getContent();
    },
    methods: {
      getContent() {
        this.$http.get('/general/access/bottom', {key: "about"}).then((res) => {
            this.content = res.content;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
    .content{
      padding-top: 20px;
      overflow: auto;
      box-sizing: border-box;
    }
  }
</style>
