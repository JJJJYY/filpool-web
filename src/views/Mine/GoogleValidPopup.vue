<template>
  <div>
    <van-popup v-model="isShow" :close-on-click-overlay="true" :style="{'width': '80%', 'border-radius': '4px'}">
      <div class="main">
        <div class="title">谷歌验证</div>
        <div class="input">
          <input type="number" title="" v-model="pwd" placeholder="请输入Google验证码" @keyup.enter="enter">
        </div>
        <div style="text-align: center;">
          <button class="submit" @click="enter">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {Popup, Toast} from "vant";

  export default {
    name: "GoogleValidPopup",
    props: {
      value: Boolean
    },
    data() {
      return {
        isShow: this.value,
        pwd: ''
      }
    },
    components: {
      [Popup.name]: Popup
    },
    watch: {
      value: function (val) {
        this.isShow = val;
      },
      isShow: function (val) {
        this.$emit("input", val);
      }
    },
    methods: {
      enter() {
        if (this.pwd.length <= 0) {
          Toast('请输入Google验证码')
          return
        }
        this.$emit('enter', this.pwd)
        this.pwd = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .main {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 22px;

    .title {
      color: $h2-color;
      font-size: 17px;
      text-align: center;
    }

    .input {
      border: 1px solid $divider-color;
      margin-top: 12px;
      font-size: 14px;
      padding: 0 8px;

      & > input {
        height: 34px;
        display: block;
        width: 100%;

        &::placeholder {
          color: #ccc;
        }
      }
    }
  }
  .submit{
    width:220px;
    height:40px;
    background:linear-gradient(90deg,rgba(241,138,45,1) 0%,rgba(252,177,80,1) 100%);
    border-radius:44px;
    margin-top: 24px;
  }
</style>
