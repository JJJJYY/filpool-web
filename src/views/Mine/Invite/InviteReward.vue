<template>
  <div class="container">
    <head-nav></head-nav>
    <div class="page-container">
      <div class="reward-intro">
        <div class="reward-intro-item">
          <div class="reward-intro-item-title">累计邀请人数</div>
          <div class="reward-intro-item-val">
            {{ item.inviteCount | parseFloatFilter }}
          </div>
        </div>
        <div class="reward-intro-item">
          <div class="reward-intro-item-title">累计购买人数</div>
          <div class="reward-intro-item-val">
            {{ item.purchaseCount | parseFloatFilter }}
          </div>
        </div>
        <div class="reward-intro-item">
          <div class="reward-intro-item-title">累计推广数量</div>
          <div class="reward-intro-item-val">
            {{ item.filpReward | parseFloatFilter }} TB
          </div>
        </div>
        <div class="reward-intro-item">
          <div class="reward-intro-item-title">累计获取佣金</div>
          <div class="reward-intro-item-val">
            {{ item.usdtReward | parseFloatFilter }} USDT
          </div>
        </div>
      </div>
      <van-tabs color="#2559A5FF" style="margin-top: 6px;" @click="tabClick">
        <van-tab title="邀请记录">
          <div class="recode-cell section">
            <div class="name">用户信息</div>
            <div class="register-time">注册时间</div>
          </div>
          <div class="recode-cell" v-for="(x, i) in inviteList" :key="i">
            <div class="name">{{ x.nickname }}</div>
            <div class="register-time">{{ x.createTime }}</div>
          </div>
        </van-tab>
        <van-tab title="订单记录">
          <div class="order-recode-cell" v-for="(x, i) in orderList" :key="i">
            <div class="item">
              <div class="title">级别关系</div>
              <div class="val">{{ x.round === 1 ? "1" : "2" }}</div>
            </div>
            <div class="item">
              <div class="title">用户信息</div>
              <div class="val">{{ x.nickname }}</div>
            </div>
            <div class="item" style="align-items: flex-end;">
              <div class="title">下单数量</div>
              <div class="val">{{ x.orderQuantity | parseFloatFilter }}TB</div>
            </div>
            <div class="item">
              <div class="title">返佣金额</div>
              <div class="val">
                {{ x.rewardQuantity | parseFloatFilter }}USDT
              </div>
            </div>
            <div class="item">
              <div class="title">下单时间</div>
              <div class="val">{{ x.createTime }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import HeadNav from "@/components/HeadNav";
import {
  distributionDetailApi,
  inviteRecordApi,
  rewardRecordApi
} from "../../../net/api/userInfoApi";

export default {
  name: "InviteReward",
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List
  },
  data() {
    return {
      item: {},
      inviteList: [],
      orderList: []
    };
  },
  created() {
    this.loadData();
    this.loadInviteRecodeData();
  },
  methods: {
    tabClick(index) {
      if (index === 0) {
        this.loadInviteRecodeData();
      } else {
        this.loadOrderRecodeData();
      }
    },
    loadData() {
      distributionDetailApi().then(res => {
        if (res.ret === 200) {
          this.item = res.data;
        }
      });
    },
    loadInviteRecodeData() {
      inviteRecordApi().then(res => {
        if (res.ret === 200) {
          this.inviteList = res.data;
        }
      });
    },
    loadOrderRecodeData() {
      rewardRecordApi().then(res => {
        if (res.ret === 200) {
          this.orderList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";

.reward-intro {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: $content-backgroun-color;
  margin-top: 6px;

  &-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &-title {
      color: $h3-color;
      font-size: 13px;
    }

    &-val {
      color: $h2-color;
      font-size: 14px;
    }
  }
}

.recode-cell {
  background: $content-backgroun-color;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  color: $h2-color;
  font-size: 13px;
  border-bottom: 1px $divider-color solid;
}

.order-recode-cell {
  background: $content-backgroun-color;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  font-size: 13px;
  color: $h2-color;
  padding: 0 12px;
  border-bottom: 1px $divider-color solid;
  margin-bottom: 8px;

  .item {
    display: flex;
    flex-direction: column;
    /*justify-content: space-around;*/
    margin: 12px 0;

    .title {
      font-size: 12px;
      color: $h3-color;
    }

    .val {
      font-size: 14px;
      color: $h2-color;
      margin-top: 10px;
    }
  }
}

.section {
  background: $background-color;
}
</style>
