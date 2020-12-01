<template>
  <div>
    <head-nav></head-nav>
    <van-tabs v-model="active" @change="speedUpType" color="#2559A5FF">
      <van-tab title="算力订单">
        <van-tabs sticky color="#2559A5FF" :scrollspy="false" @click="click">
          <van-tab v-for="(x, i) in items" :key="i" :title="x.title"></van-tab>
          <div v-if="thisData" class="list page-container">
            <div class="cell" v-for="(x, index) in list" :key="index">
              <div class="top">
                <div class="order-id">订单编号：{{ x.pid }}</div>
                <div class="state">{{ stateStr(x.status) }}</div>
              </div>
              <div class="hr"></div>
              <div class="detail">
                <div class="detail-item">{{ x.name }}</div>
                <div class="detail-item">
                  单价：{{ x.price | parseFloatFilter }} {{ x.asset }}/{{
                    x.unit
                  }}
                </div>
                <div class="detail-item">
                  数量： {{ x.quantity | parseFloatFilter }}
                </div>
                <div class="detail-item">
                  下单时间：{{ timeStr(x.createTime) }}
                </div>
                <div class="detail-item">
                  支付金额： {{ x.paymentQuantity | parseFloatFilter }}
                  {{ x.asset }}
                </div>
              </div>
              <div class="pay" v-if="x.status === 0" @click="toPay(x)">
                去支付
              </div>
            </div>
          </div>
          <div v-else class="none-data">暂无数据</div>
        </van-tabs>
      </van-tab>
      <van-tab class="list page-container" title="算力加速订单">
        <div
          class="speedUp-centent"
          v-for="(item, index) in speedUpData"
          :key="index"
        >
          <div class="speedUp-d">订单编号：{{ item.pid }}</div>
          <div class="speedUp-s">
            <div class="speedUp-c">等待人数:{{ item.wait_num }}</div>
            <div>
              <span class="speedUp-c"
                >{{ item.price | parseFloatFilter }}FIL/TiB</span
              >
              X {{ item.power | parseFloatFilter }}
            </div>
          </div>
          <div class="speedUp-t">
            <div>{{ item.purchase_time }}</div>
            <div class="speedUp-c">{{ statusData(item.status) }}</div>
          </div>
          <div class="speedUp-t">
            <div class="color">
              已经填充算力 {{ item.fill_power | parseFloatFilter }} TiB
            </div>
          </div>
          <div class="speedUp-m">
            支付金额：<span class="speedUp-c"
              >{{ item.pay_coin_amount | parseFloatFilter
              }}{{ item.pay_coin }}</span
            >
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import dayjs from "dayjs";
import HeadNav from "@/components/HeadNav";
import { orderListApi, getFlashSaleOrderList } from "../../net/api/userInfoApi";

export default {
  name: "OrderManager",
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List
  },
  data() {
    return {
      selectedIndex: 0,
      items: [
        { title: "全部", type: "" },
        { title: "待付款", type: 0 },
        { title: "已完成", type: 1 },
        { title: "已取消", type: 2 }
      ],
      statustext: [
        { status: 0, name: "排队中" },
        { status: 1, name: "加速中" },
        { status: 2, name: "已加速" }
      ],
      list: [],
      listData: [],
      thisData: false,
      active: 0,
      speedUpData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    statusData(v) {
      let thisName = null;
      this.statustext.map(val => {
        if (val.status === v) {
          thisName = val.name;
        }
      });
      return thisName;
    },
    speedUpType() {
      console.log(this.active);
      getFlashSaleOrderList({
        page: 1,
        count: 1000
      }).then(res => {
        console.log(res);
        this.speedUpData = res.data.list;
      });
    },
    click(index, title) {
      if (this.listData.length) {
        this.selectedIndex = index;
        if (index === 0) {
          this.loadData();
        } else {
          this.list = this.listData.filter(e => {
            return e.status === this.items[this.selectedIndex].type;
          });
        }
      }
    },
    loadData() {
      orderListApi().then(res => {
        this.list = res.data;
        this.listData = res.data;
        if (this.listData.length) {
          this.thisData = true;
        } else {
          this.thisData = false;
        }
      });
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
          id: item.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.speedUp-centent {
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  margin: 8px 10px;
  color: #999999ff;
  .speedUp-c {
    color: #333333ff;
  }
  .speedUp-d {
    display: flex;
  }
  .speedUp-s {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
  }
  .speedUp-t {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    .color {
      color: #333333;
    }
  }
  .speedUp-m {
    margin-top: 20px;
    text-align: right;
  }
}

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
.none-data {
  margin-top: 200px;
  text-align: center;
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
