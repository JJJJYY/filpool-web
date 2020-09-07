<template>
  <div class="nav">
    <div class="back" @click="pop">
      <img src="../assets/img/tibi_icon_return.png" alt="" v-show="!backBtnHidden">
    </div>
    <div class="title">
      <h1>{{title}}</h1>
      <!-- <h1>{{$store.state.navBarTitle}}</h1> -->
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    props: {
      title: {
        type: String
      },
      backBtnHidden: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      pop() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  .nav {
    height: 44px;
    background: white;
    display: flex;
    align-items: center;
    padding: 0 8px;
    /*border-bottom: 1px solid #ddd;*/

    .back {
      width: 16%;

      & > img {
        height: 17px;

      }
    }

    .title {
      flex: 1;

      h1 {
        font-weight: bold;
        font-size: 18px;
        text-align: center;
      }
    }

    .right {
      width: 16%;
    }
  }
</style>
