<template>
  <div>
    <van-popup v-model="vshow" :close-on-click-overlay="true" :style="{'width': '80%', 'border-radius': '4px'}">
      <div class="main">
        <div class="title">资金密码</div>
        <div class="input">
          <input type="password" title=""  v-model="pwd" placeholder="请输入资金密码" @keyup.enter="enter">
        </div>
        <button class="submit" @click="enter">确定</button>
        <div class="forget">
          <span @click="forget">忘记密码?</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>

  import {Popup, Toast} from "vant";

  export default {
    name: "PasswordPopup",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pwd: '',
        vshow: this.value
      }
    },
    components: {
      [Popup.name]: Popup
    },
    watch: {
      value: function (val) {
        this.vshow = val;
      },
      vshow: function (val) {
        this.$emit("input", val);
      }
    },
    methods: {
      enter() {
        if (this.pwd.length <= 0) {
          Toast('请输入支付密码');
          return
        }
        this.$emit('enter', this.pwd);
        this.pwd = null
      },
      forget() {
        this.$router.push('/securityTransPwd')
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
    .submit{
      width: 200px;
      height: 32px;
      margin-top: 24px;
    }
    .forget {
      color: $main-color;
      font-size: 12px;
      margin-top: 12px;
      text-align: right;
    }
  }
</style>
