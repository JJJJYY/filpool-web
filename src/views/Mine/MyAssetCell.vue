<template>
  <div class="cell">
    <div class="cellMy" :style="{ background: this.bgc }">
      <div class="title">
        <div class="flex">
          <p><img :src="item.appIcon" class="icon" alt="" /></p>
          <p class="margin">
            {{ item.type ? `${item.asset}(${item.type})` : item.asset }}
          </p>
        </div>
        <div class="jump" @click="handleJump">
          <p>资产明细</p>
          <p class="margin">>></p>
        </div>
      </div>
      <div class="sum">
        <p>总资产：</p>
        <p class="sum-num">{{ getTotal(item.myAsset) | parseFloatFilter }}</p>
      </div>
    </div>
    <div class="asset">
      <div class="asset-usable" v-for="(i, index) in item.myAsset" :key="index">
        <div class="asset-usable-div">
          <p class="asset-usable-text" @click="availableAssets">
            {{ i.isAsset }}
          </p>
          <p
            class="asset-usable-query"
            @click="handleIcon(i.icon)"
            v-if="i.icon"
          >
            <span>?</span>
          </p>
        </div>
        <p class="asset-usable-num">{{ i.num | parseFloatFilter }}</p>
      </div>
      <!-- 提示 -->
      <van-overlay :show="overlayShow" @click="overlayShow = false" @click.stop>
        <div class="wrapper">
          <p class="block">{{ thisText }}</p>
        </div>
      </van-overlay>
    </div>
    <div class="jump-b">
      <div
        :style="{ color: this.bColor }"
        class="get-b"
        :class="{ gray: item.deposit !== 1 }"
        @click="topup()"
      >
        充币
      </div>
      <div class="xian"></div>
      <div
        :style="{ color: this.bColor }"
        class="get-b"
        :class="{ gray: item.withdraw !== 1 }"
        @click="extract()"
      >
        提币
      </div>
    </div>
  </div>
</template>

<script>
import { Decimal } from "decimal.js";
import { Overlay } from "vant";
export default {
  name: "MyAssetCell",
  components: {
    "van-overlay": Overlay
  },
  props: {
    item: Object,
    myAsset: Array,
    bgc: String,
    bColor: String
  },
  data() {
    return {
      overlayShow: false,
      thisText: "" // 提示
    };
  },
  // created() {
  //   console.log(this.item);
  // },
  methods: {
    availableAssets() {
      this.$router.push({
        path: "/availableAssets",
        query: {
          asset: this.item.asset
        }
      });
    },
    handleIcon(val) {
      this.thisText = val;
      this.overlayShow = true;
    },
    handleJump() {
      this.$router.push({
        path: "/assetDetails",
        query: {
          asset: this.item.asset
        }
      });
    },
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
      const myMoney = [];
      for (let i = 0; i < item.length; i++) {
        const val = item[i].num;
        myMoney.push(new Decimal(val));
      }
      return eval(myMoney.join("+"));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";
.gray {
  color: #a7a7a7 !important;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 90%;
  height: 30px;
  border-radius: 8px;
  text-align: center;
  line-height: 30px;
  background-color: #fff;
}
.cell {
  background: $content-backgroun-color;
  margin: 0 10px;
  border-radius: 8px;
  .cellMy {
    padding: 12px;
    border-radius: 8px 8px 0 0;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .flex {
        margin-left: 10px;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        .margin {
          margin-left: 8px;
        }
        .icon {
          width: 27px;
          height: 27px;
        }
      }
      .jump {
        display: flex;
        align-items: center;
        .margin {
          margin-left: 8px;
        }
      }
    }
    .sum {
      display: flex;
      align-items: baseline;
      margin: 10px 0 10px 10px;
      color: #fff;
      .sum-num {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
  .asset {
    display: flex;
    justify-content: space-around;
    margin-top: 14px;
    position: relative;
    .asset-usable {
      text-align: center;
      position: relative;
      .asset-usable-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .asset-usable-query {
          transform: scale(0.7);
          border: 1px solid #999999;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          font-size: 12px;
          // margin-left: 3px;
          span {
            color: #999999;
          }
        }
        .asset-usable-text {
          color: #666666;
        }
      }

      .asset-usable-num {
        margin-top: 5px;
        font-weight: 600;
      }
    }
  }
  .jump-b {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;
    padding: 0 36px 18px 36px;
    .get-b {
      font-size: 14px;
    }
    .xian {
      width: 1px;
      height: 14px;
      background-color: #ededed;
    }
  }
}
</style>
