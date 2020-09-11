<template>
  <div class="cell">
    <div class="header">
      <img :src="item.icon" alt class="icon" />
      <div class="name">{{item.asset}}</div>
      <div class="recode"></div>
      <!-- <img src="../../assets/img/mine/tab_icon_more.png" alt="" class="more">-->
    </div>
    <div class="hr"></div>
    <div class="amount">
      <div class="amount-total">
        <div class="amount-title">总资产</div>
        <div class="amount-value">{{getTotal(item)}}</div>
      </div>
      <div class="amount-total">
        <div class="amount-title">可用</div>
        <div class="amount-value">{{item.available}}</div>
      </div>
      <div class="amount-total">
        <div class="amount-title">冻结余额</div>
        <div class="amount-value">{{item.frozen}}</div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="btns">
      <div class="icon-btn" :class="{gray: item.deposit !== 1}" @click="topup()">
        <img src="../../assets/img/mine/user_center_icon_chongbi.png" alt class="icon" />
        <span class="title">充币</span>
      </div>
      <div class="btns-hr"></div>
      <div class="icon-btn" :class="{gray: item.withdraw !== 1}" @click="extract()">
        <img src="../../assets/img/mine/user_center_icon_tibi.png" alt class="icon" />
        <span class="title">提币</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Decimal } from "decimal.js";
export default {
  name: "MyAssetCell",
  props: {
    item: Object,
  },
  methods: {
    topup() {
      if (this.item.deposit === 1) {
        this.$emit("topup");
      }
    },
    extract() {
      if (this.item.withdraw === 1) {
        this.$emit("extract");
      }
    },
    getTotal(item) {
      return Decimal.add(item.available, item.frozen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.cell {
  background: $content-backgroun-color;
  margin-top: 8px;
  padding: 16px;
  .header {
    display: flex;
    align-items: center;
    .icon {
      @include size(22px);
      /*background: red;*/
    }
    .name {
      margin-left: 8px;
      color: $h1-color;
      font-size: 16px;
      font-weight: bold;
    }
    .recode {
      font-size: 14px;
      color: $h3-color;
      margin: 0 12px;
      text-align: right;
      flex: 1;
    }
    .more {
      height: 10px;
    }
  }
  .hr {
    background: $divider-color;
    margin: 16px 0;
    height: 1px;
  }
  .amount {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    .amount-total {
      display: flex;
      flex-direction: column;
      padding: 0 8px;
      .amount-title {
        color: $h3-color;
        font-size: 13px;
      }
      .amount-value {
        color: $h1-color;
        font-size: 14px;
        margin-top: 12px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .btns {
    display: flex;
    margin-top: 22px;
    align-items: center;
    .btns-hr {
      height: 24px;
      width: 1px;
      background: $divider-color;
    }
    .icon-btn {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      &.gray {
        filter: grayscale(1);
      }
      .icon {
        @include size(16px);
        /*background: red;*/
      }
      .title {
        margin-left: 12px;
        font-weight: bold;
        font-size: 15px;
        color: $main-color;
      }
    }
  }
}
</style>
