<template>
  <div class="item">
    <div @click="toDetail" v-if="progress">
      <div class="name">
        <h3>{{ goodData.name }}</h3>
        <span class="state">{{ goodData.highlight }}</span>
      </div>
      <p class="subtitle">{{ goodData.slogan }}</p>
      <div class="intro">
        <div class="intro-item">
          <span class="intro-item-title">挖矿币种</span>
          <span class="intro-item-value">{{ goodData.weightAsset }}</span>
        </div>
        <div class="intro-item">
          <span class="intro-item-title">结算周期</span>
          <span class="intro-item-value">{{ goodData.settlementPeriod }}</span>
        </div>
        <div class="intro-item">
          <span class="intro-item-title">合约期限</span>
          <span class="intro-item-value"
            >{{ goodData.contractDuration }}天</span
          >
        </div>
        <div class="intro-item">
          <span class="intro-item-title">技术服务费</span>
          <span class="intro-item-value"
            >{{ goodData.serviceChargeRate * 100 }}%</span
          >
        </div>
      </div>
      <div class="handler">
        <div class="handler-amount">
          <span style="font-size: 24px;">{{ goodData.price * amount }}</span>
          <span style="font-size: 18px;">USDT</span>
        </div>
        <div style="flex: 1;"></div>
        <AddSubtractBox v-model="amount" :limit="goodData.minLimit" />
        <div style="color: #575c62; font-size: 12px; margin-left: 12px;">
          {{ goodData.unit }}
        </div>
      </div>
      <van-progress
        class="vanProgress"
        color="linear-gradient(to right, #f18c2e, #fbae4e)"
        :percentage="progress"
      />
    </div>
    <div class="hr" />
    <a
      class="btn-gradient"
      :class="{ gray: goodData.status !== 1 }"
      @click="enterPay(goodData)"
      >{{ this.statusBtnTitle(goodData.status) }}</a
    >
    <span class="tag">{{ goodData.tag }}</span>
  </div>
</template>

<script>
import AddSubtractBox from "@/components/AddSubtractBox";
import { Progress } from "vant";
export default {
  props: {
    goodData: {
      default: () => ({})
    }
  },
  components: {
    AddSubtractBox,
    [Progress.name]: Progress
  },
  data() {
    return {
      amount: this.goodData.minLimit || 1,
      progress: 0
    };
  },
  watch: {
    goodData: function() {
      console.log(this.goodData);
      this.amount = this.goodData.minLimit;
      this.progress =
        Math.floor(
          ((this.goodData.quantity - this.goodData.remainingQuantity) /
            this.goodData.quantity) *
            100 *
            100
        ) / 100;
    }
  },
  created() {
    if (this.goodData.id) {
      this.progress =
        Math.floor(
          ((this.goodData.quantity - this.goodData.remainingQuantity) /
            this.goodData.quantity) *
            100 *
            100
        ) / 100;
    }
  },
  methods: {
    enterPay(x) {
      if (x.status !== 1) {
        return;
      }
      let data = Object.assign(this.goodData, { amount: this.amount });
      this.$emit("select", data); // 点击购买弹框
    },
    statusBtnTitle(status) {
      switch (status) {
        case 1:
          return "立即购买";
        case 2:
          return "未开始";
        case 3:
          return "已结束";
      }
    },
    // 商品详情
    toDetail() {
      if (this.goodData.status === 1) {
        this.$router.push({
          path: `/rate_detail/${this.goodData.id}/${this.amount}`
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";

.item {
  margin-bottom: 8px;
  padding: 16px;
  background: $content-backgroun-color;
  /*margin-top: 12px;*/
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  .name {
    display: flex;
    align-items: center;

    h3 {
      color: $h1-color;
      font-size: 15px;
      font-weight: bold;
      margin: 0;
    }

    span {
      background: $main-color;
      font-size: 11px;
      padding: 2px 4px;
      border-radius: 2px;
      color: white;
      margin-left: 6px;
    }
  }

  .subtitle {
    margin-top: 6px;
    font-size: 12px;
    color: $h3-color;
  }

  .intro {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 6px;
    &-item {
      display: flex;
      margin-top: 12px;

      &-title {
        font-size: 14px;
        color: $h3-color;
      }

      &-value {
        font-size: 14px;
        color: $h1-color;
        margin-left: 6px;
      }
    }
  }

  .handler {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    &-amount {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      color: $main-color;
    }
  }

  .hr {
    margin: 18px 0;
    background: $divider-color;
    height: 0.5px;
  }

  $btn-height: 34px;

  a.btn-gradient {
    display: inline-block;
    border-radius: 12px;
    height: $btn-height;
    line-height: $btn-height;
    border-radius: $btn-height / 2;
    font-size: 15px;
    text-align: center;
    padding: 0 24px;
    color: #fff;
    align-self: flex-end;
    &.gray {
      background: #999;
    }
  }

  .tag {
    color: #fff;
    font-size: 11px;
    padding: 4px 6px;
    background: $main-color;
    position: absolute;
    border-radius: 0 0 0 2px;
    top: 0;
    right: 0;
  }
}

.disabled-btn {
  background: #ccc;
}
.vanProgress {
  display: flex;
  margin-top: 20px;
}
</style>
