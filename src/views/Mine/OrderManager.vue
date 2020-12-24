<template>
  <div>
    <head-nav></head-nav>
    <van-tabs v-model="active" @change="speedUpType" color="#F7A90DFF">
      <van-tab title="算力订单" class="list page-container">
        <van-tabs sticky color="#E9901D" :scrollspy="false" @click="click">
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
          <div class="speedUp-d">
            <div>订单编号：{{ item.pid }}</div>
            <button
              v-if="item.status === 0"
              class="speedUp-d-b"
              @click="closeV(item.id)"
            >
              取消订单
            </button>
          </div>
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
        <van-popup
          v-model="thisShow"
          position="bottom"
          :safe-area-inset-bottom="true"
        >
          <div class="buy-centent">
            <div style="font-size: 18px;font-weight: 500">
              取消订单
            </div>
            <div style="margin-top: 20px">
              <div
                style="font-size: 12px; color: #666666 ; display: flex; justify-content: space-between"
              >
                <p>资金密码：</p>
                <p class="recharge" @click="topUpPaw">忘记密码？</p>
              </div>
              <van-field
                style="width: 100%; background: #e6e6e6; border-radius: 8px"
                v-model="password"
                type="password"
                placeholder="请输入资金密码"
              />
              <p style="font-size: 12px; color: #666666; margin-top: 10px">
                取消加速包订单后<span style="color: #F9A03E">不可恢复</span
                >，再次申请需按最新质押价格<span style="color: #F9A03E"
                  >重新进行排队</span
                >
              </p>
            </div>
            <div class="buy-centent-flex" style="margin-top: 20px">
              <van-button
                style="background: #d0d0d0; color: #fff; padding: 0 40px"
                round
                @click="thisShow = false"
                >取消</van-button
              >
              <van-button
                style="background: #f9a03e; color: #fff; padding: 0 40px"
                round
                @click="buyOk"
                >确认</van-button
              >
            </div>
          </div>
        </van-popup>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List, Popup, Button, Field, Toast } from "vant";
import dayjs from "dayjs";
import HeadNav from "@/components/HeadNav";
import md5 from "md5";
import {
  orderListApi,
  getFlashSaleOrderList,
  getFlashSale
} from "../../net/api/userInfoApi";

export default {
  name: "OrderManager",
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      selectedIndex: 0,
      items: [
        { title: "全部", type: "" },
        { title: "待付款", type: 0 },
        { title: "已完成", type: 1 },
        { title: "已取消", type: 2 }
        // { title: "已超时", type: 3 },
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
      speedUpData: [],
      thisShow: false,
      password: "",
      id: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    buyOk() {
      const postData = {
        id: this.id,
        capital_pwd: md5(this.password)
      };
      getFlashSale(postData)
        .then(res => {
          if (res.ret === 200) {
            this.thisShow = false;
            this.jiasuData();
            Toast("取消成功");
          }
        })
        .catch(err => {
          Toast("密码出问题或服务器出错拉(*>﹏<*)");
        });
    },
    closeV(v) {
      this.id = v;
      this.password = "";
      this.thisShow = true;
    },
    topUpPaw() {
      this.$router.push({
        path: "/securityCenter"
      });
    },
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
      this.jiasuData();
    },
    jiasuData() {
      getFlashSaleOrderList({
        page: 1,
        count: 2000
      }).then(res => {
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

.buy-centent {
  padding: 16px 30px;
  .buy-margin {
    display: flex;
    align-items: center;
    color: #666666;
    margin-top: 20px;
  }
  .recharge {
    font-size: 12px;
    color: #f9a03e;
  }
  .buy-centent-flex {
    display: flex;
    justify-content: space-between;
  }
}

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
    align-items: center;
    justify-content: space-between;
    .speedUp-d-b {
      background: #fff;
      border: none;
    }
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
