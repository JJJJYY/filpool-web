<template>
    <div class="OpenIframe">
      <head-nav :title="$route.query.title"></head-nav>
      <iframe :src="$route.query.url" frameborder="0" style="width: 100%;"></iframe>
    </div>
</template>

<script>
    import HeadNav from "@/components/HeadNav";

    export default {
        name: "OpenIframe",
        components: {
          HeadNav
        },
        data() {
          return {

          }
        }
    }
</script>

<style lang="scss" scoped>

</style>