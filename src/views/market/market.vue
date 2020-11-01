<template>
  <div class="market">
    <HeadNav></HeadNav>
    <div class="market-centent">
      <div class="centent">
        <div class="centent-detail">
          <div class="centent-detail-text">
            <img :src="fileCoin.logo" alt="" />
          </div>
          <div class="centent-detail-num FIL">{{ fileCoin.sign }}</div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">市值</div>
          <div class="centent-detail-num">
            {{ numUnit(fileCoin.marketValue) }}
          </div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">最新价（￥）</div>
          <div class="centent-detail-num">{{ fileCoin.currentPrice }}</div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">24H涨跌幅</div>
          <div
            class="centent-detail-num"
            v-if="fileCoin.changePercent > 0"
            :style="{ color: '#1B9F24FF' }"
          >
            +{{ fileCoin.changePercent }}%
          </div>
          <div class="centent-detail-num" v-if="fileCoin.changePercent === 0">
            {{ fileCoin.changePercent }}%
          </div>
          <div
            class="centent-detail-num"
            v-if="fileCoin.changePercent < 0"
            :style="{ color: '#C53939FF' }"
          >
            {{ fileCoin.changePercent }}%
          </div>
        </div>
      </div>
      <div class="market-list">
        <div class="list">
          <div class="td">币种</div>
          <div
            class="tl list-flex"
            v-for="(i, index) in quotationList"
            :key="index"
          >
            <img :src="i.logo" alt="" />
            <p>{{ i.sign }}</p>
          </div>
        </div>
        <div class="list">
          <div class="td">市值</div>
          <div class="tl" v-for="(i, index) in quotationList" :key="index">
            {{ numUnit(i.marketValue) }}
            <!-- {{ i.marketValue }} -->
          </div>
        </div>
        <div class="list">
          <div class="td">最新价（￥）</div>
          <div class="tl" v-for="(i, index) in quotationList" :key="index">
            {{ i.currentPrice }}
          </div>
        </div>
        <div class="list">
          <div class="td">24H涨跌幅</div>
          <div class="tl" v-for="(i, index) in quotationList" :key="index">
            <van-button
              :style="{ width: '100%', background: '#1B9F24FF', color: '#fff' }"
              size="mini"
              v-if="i.changePercent > 0"
            >
              +{{ i.changePercent }}%
            </van-button>
            <van-button
              :style="{ width: '100%', background: '#9D9A9AFF', color: '#fff' }"
              size="mini"
              v-if="i.changePercent === 0"
            >
              {{ i.changePercent }}%
            </van-button>
            <van-button
              :style="{ width: '100%', background: '#C53939FF', color: '#fff' }"
              size="mini"
              v-if="i.changePercent < 0"
            >
              {{ i.changePercent }}%
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <FootBox></FootBox>
  </div>
</template>
<script>
import FootBox from "@/components/FootBox";
import HeadNav from "@/components/HeadNav";
import { Button } from "vant";
import { quotationApi } from "@/net/api/userInfoApi";
export default {
  components: {
    FootBox,
    HeadNav,
    [Button.name]: Button
  },
  data() {
    return {
      fileCoin: {},
      quotationList: []
    };
  },
  created() {
    quotationApi().then(res => {
      this.fileCoin = res.data.fileCoin;
      this.quotationList = res.data.quotationList;
    });
  },
  methods: {
    // 转换单位方法
    numUnit(num) {
      let f = parseFloat(num);
      let data = this.unitConvert(f);
      return data.num + data.unit;
    },
    unitConvert(num) {
      let moneyUnits = ["元", "万元", "亿元", "万亿"];
      let dividend = 10000;
      let curentNum = num;
      //转换数字
      let curentUnit = moneyUnits[0];
      //转换单位
      for (let i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i];
        if (this.strNumSize(curentNum) < 5) {
          break;
        }
        curentNum = curentNum / dividend;
      }
      let m = { num: 0, unit: "" };
      m.num = curentNum.toFixed(2);
      m.unit = curentUnit;
      return m;
    },
    strNumSize(tempNum) {
      let stringNum = tempNum.toString();
      let index = stringNum.indexOf(".");
      let newNum = stringNum;
      if (index != -1) {
        newNum = stringNum.substring(0, index);
      }
      return newNum.length;
    }
  }
};
</script>
<style lang="scss" scoped>
.market-centent {
  padding: 0 15px;
  .centent {
    padding: 14px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .centent-detail {
      text-align: center;
      color: #333333;
      .FIL {
        font-weight: bold !important;
      }
      .centent-detail-text {
        height: 22px;
        line-height: 22px;
      }
      .centent-detail-num {
        margin-top: 12px;
        font-size: 14px;
        font-weight: 500;
      }
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
  .market-list {
    display: flex;
    justify-content: space-between;
    color: #666666;
    margin-top: 20px;
    .list {
      .tl {
        display: flex;
        align-items: center;
        height: 60px;
        color: #333333;
        font-size: 14px;
        font-weight: 500;
      }
      .list-flex {
        img {
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
