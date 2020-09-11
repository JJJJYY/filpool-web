<template>
  <div>
    <head-nav></head-nav>
    <van-tabs sticky color="#E9901D" :scrollspy="false" @click="click">
      <van-tab v-for="(x, i) in items" :key="i" :title="x.title"></van-tab>
      <div class="list page-container">
        <div class="cell" v-for="(x, index) in list" :key="index">
          <div class="top">
            <div class="order-id">订单编号：{{x.id}}</div>
            <div class="state">{{stateStr(x.status)}}</div>
          </div>
          <div class="hr"></div>
          <div class="detail">
            <div class="detail-item">{{x.name}}</div>
            <div class="detail-item">单价：{{x.price}} {{x.asset}}/{{x.unit}}</div>
            <div class="detail-item">数量： {{x.quantity}}</div>
            <div class="detail-item">下单时间：{{timeStr(new Date(x.createTime))}}</div>
            <div class="detail-item">支付金额： {{x.paymentQuantity}} {{x.asset}}</div>
          </div>
          <div class="pay" v-if="x.status === 0" @click="toPay(x)">去支付</div>
        </div>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import dayjs from "dayjs";
import HeadNav from "@/components/HeadNav";
import { orderListApi } from "../../net/api/userInfoApi";

export default {
  name: "OrderManager",
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
  },
  data() {
    return {
      selectedIndex: 0,
      items: [
        { title: "全部", type: "" },
        { title: "待付款", type: 0 },
        { title: "已完成", type: 1 },
        { title: "已取消", type: 2 },
        // { title: "已超时", type: 3 },
      ],
      list: [],
      listData: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    click(index, title) {
      this.selectedIndex = index;
      if (index === 0) {
        this.loadData();
      } else {
        this.list = this.listData.filter((e) => {
          return e.status === this.items[this.selectedIndex].type;
        });
      }
    },
    loadData() {
      orderListApi().then((res) => {
        this.list = res.data;
        this.listData = res.data;
      });
      // this.$http
      //   .get("/purchase/myOrderList", {
      //     status: this.items[this.selectedIndex].type,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //     this.list = response.data;
      //   });
    },
    stateStr(state) {
      switch (state) {
        case 0:
          return "待付款";
        case 1:
          return "已完成";
        case 2:
          return "已取消";
        case 3:
          return "已超时";
      }
    },
    timeStr(date) {
      return dayjs(date).format("MM-DD HH:mm:ss");
    },
    toPay(item) {
      this.$router.push({
        path: "/countPay",
        query: {
          amount: item.paymentQuantity,
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.header {
  display: flex;
  justify-content: space-around;
  height: 50px;
  background: $content-backgroun-color;
  margin-top: 8px;
  align-items: center;
  border-bottom: 1px $divider-color solid;

  .item {
    color: $h3-color;
    font-size: 15px;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
  }

  .selected {
    color: $h1-color;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 2px solid $main-color;
  }
}

.list {
  height: calc(100vh - 90px);
  .cell {
    background: $content-backgroun-color;
    /*margin-bottom: 8px;*/
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      justify-content: space-between;
      border-bottom: 1px $divider-color solid;

      .order-id {
        font-size: 13px;
      }

      .state {
        font-size: 14px;
        font-weight: bold;
      }
    }

    .detail {
      padding: 12px 16px;
      margin-top: -12px;
      border-bottom: 1px $divider-color solid;

      .detail-item {
        color: $h2-color;
        font-size: 13px;
        margin-top: 10px;
      }
    }

    .pay {
      align-self: flex-end;
      border: 1px $main-color solid;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 16px;
      color: $main-color;
      margin: 12px;
      font-size: 15px;
    }
  }
}
</style>
