<template>
  <div class="market">
    <HeadNav></HeadNav>
    <div class="market-centent">
      <div class="centent">
        <div class="centent-detail">
          <div class="centent-detail-text">
            <img src="@/assets/img/market/fil.png" alt="" />
          </div>
          <div class="centent-detail-num FIL">FIL</div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">市值</div>
          <div class="centent-detail-num">40.01亿</div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">最新价（￥）</div>
          <div class="centent-detail-num">243.37</div>
        </div>
        <div class="centent-detail">
          <div class="centent-detail-text">24H涨跌幅</div>
          <div class="centent-detail-num">+56.57%</div>
        </div>
      </div>
      <div class="market-list">
        <div class="list">
          <div class="td">币种</div>
          <div class="tl list-flex">
            <img src="../../assets/img/tab_icon_home_normal.png" alt="" />
            <p>BTC</p>
          </div>
          <div class="tl list-flex">
            <img src="../../assets/img/tab_icon_home_normal.png" alt="" />
            <p>BTC</p>
          </div>
          <div class="tl list-flex">
            <img src="../../assets/img/tab_icon_home_normal.png" alt="" />
            <p>BTC</p>
          </div>
          <div class="tl list-flex">
            <img src="../../assets/img/tab_icon_home_normal.png" alt="" />
            <p>BTC</p>
          </div>
          <div class="tl list-flex">
            <img src="../../assets/img/tab_icon_home_normal.png" alt="" />
            <p>BTC</p>
          </div>
        </div>
        <div class="list">
          <div class="td">市值</div>
          <div class="tl">1.69万亿</div>
          <div class="tl">1.69万亿</div>
          <div class="tl">1.69万亿</div>
          <div class="tl">1.69万亿</div>
          <div class="tl">1.69万亿</div>
        </div>
        <div class="list">
          <div class="td">最新价（￥）</div>
          <div class="tl">901017.68</div>
          <div class="tl">901017.68</div>
          <div class="tl">901017.68</div>
          <div class="tl">901017.68</div>
          <div class="tl">901017.68</div>
        </div>
        <div class="list">
          <div class="td">24H涨跌幅</div>
          <div class="tl">
            <van-button type="primary" size="mini">-56.57%</van-button>
          </div>
          <div class="tl">
            <van-button type="primary" size="mini">-56.57%</van-button>
          </div>
          <div class="tl">
            <van-button type="primary" size="mini">-56.57%</van-button>
          </div>
          <div class="tl">
            <van-button type="primary" size="mini">-56.57%</van-button>
          </div>
          <div class="tl">
            <van-button type="primary" size="mini">-56.57%</van-button>
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
export default {
  components: {
    FootBox,
    HeadNav,
    [Button.name]: Button
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
        }
      }
    }
  }
}
</style>
