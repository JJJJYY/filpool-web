<template>
  <div class="pay">
    <head-nav></head-nav>
    <div class="payinfo">
      <span class="pay-title">订单金额</span>
      <p class="amount">$ {{ $route.query.amount | parseFloatFilter }} USDT</p>
      <div class="time">
        倒计时
        <van-count-down style="display: inline-block;" :time="time" />
      </div>
      <p class="pay-type">支付方式</p>
      <div class="hr"></div>
      <div class="pay-type-list">
        <img src="../../assets/img/pay_icon_usdt.png" alt class="icon" />
        <p class="pay-type-name">
          USDT支付(余额 {{ usdt.recharge | parseFloatFilter }} USDT)
        </p>
        <img src="../../assets/img/pay_icon_ok.png" alt />
      </div>
    </div>
    <button class="btn-gradient" @click="enter">确认付款</button>
    <PasswordPopup
      v-model="isShowPwdPopup"
      v-if="isShowPwdPopup"
      @enter="enterPassword"
    />
  </div>
</template>

<script>
import PasswordPopup from "./PasswordPopup";
import md5 from "md5";
import { CountDown } from "vant";
import HeadNav from "@/components/HeadNav";
import { myBalanceApi, confirmOrderApi } from "../../net/api/userInfoApi";

export default {
  name: "CalcPay",
  data() {
    return {
      isShowPwdPopup: false,
      usdt: {},
      time: 15 * 60 * 1000
    };
  },
  created() {
    this.loadData();
  },
  components: {
    HeadNav,
    PasswordPopup,
    [CountDown.name]: CountDown
  },
  methods: {
    enter() {
      this.isShowPwdPopup = true;
    },
    enterPassword(str) {
      const postData = {
        id: this.$route.query.id,
        operation: 1,
        payPwd: md5(str)
      };
      confirmOrderApi(postData).then(res => {
        if (res.ret === 200) {
          this.$router.replace({
            path: "/countPayCompletion"
          });
        }
      });
    },
    /// 获取余额
    loadData() {
      myBalanceApi().then(res => {
        this.usdt = res.data.filter(x => x.asset === "USDT")[0];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.pay {
  background: $background-color;
  display: flex;
  flex-direction: column;

  .payinfo {
    margin-top: 12px;
    padding: 12px 16px;
    background: $content-backgroun-color;
    align-items: center;
    text-align: center;

    .pay-title {
      color: $h2-color;
      font-size: 14px;
      margin-top: 30px;
    }

    .amount {
      color: $main-color;
      font-size: 20px;
      margin-top: 14px;
      font-weight: bold;
    }

    .time {
      color: $h3-color;
      font-size: 12px;
    }

    .pay-type {
      text-align: left;
      margin-top: 24px;
      color: $h2-color;
      font-size: 14px;
    }

    .hr {
      background: $divider-color;
      height: 1px;
      margin: 12px 0;
    }

    .pay-type-list {
      display: flex;
      align-items: center;

      .icon {
        width: 23px;
      }

      .pay-type-name {
        flex: 1;
        text-align: left;
        color: $h3-color;
        margin: 6px 12px 6px 12px;
        font-size: 15px;
      }

      img {
        width: 15px;
      }
    }
  }

  .btn-gradient {
    align-self: center;
    height: 44px;
    border-radius: 22px;
    width: 80%;
    margin-top: 80px;
  }
}
</style>
