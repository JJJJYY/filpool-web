<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails list page-container">
      <div class="available-padding" v-if="viwe">
        <div class="available">
          <p class="available-assets">冻结资产:</p>
          <p class="available-assets-num">
            {{
              getTotal([myAssetM.recharge, myAssetM.available])
                | parseFloatFilter
            }}<span>{{ asset }}</span>
          </p>
          <p></p>
        </div>
        <van-divider />
        <div class="balance">
          <div class="assets-balance">
            <p style="font-size: 12px; color: #666666ff">
              挖矿账户<van-icon
                name="question-o"
                @click="toast(1)"
                style="margin-left: 8px"
              />
            </p>
            <p
              style="
                font-size: 14px;
                font-weight: 500;
                ccolor: #333333ff;
                line-height: 30px;
              "
            >
              {{ myAssetM.recharge | parseFloatFilter }} {{ asset }}
            </p>
          </div>
          <div class="xian"></div>
          <div class="assets-balance" style="margin-left: 20px">
            <p style="font-size: 12px; color: #666666ff">
              理财账户<van-icon
                name="question-o"
                style="margin-left: 8px"
                @click="toast(2)"
              />
            </p>
            <p
              style="
                font-size: 14px;
                font-weight: 500;
                color: #333333ff;
                line-height: 30px;
              "
            >
              {{ myAssetM.available | parseFloatFilter }} {{ asset }}
            </p>
          </div>
        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <van-tabs
          class="tab-available"
          background="transparent"
          color="#F7A90DFF"
          v-model="active"
          animated
          @change="beforeChange"
          v-if="list"
        >
          <van-tab title="充提明细">
            <AvailableAssersList :list="list"></AvailableAssersList>
          </van-tab>
          <van-tab title="收益明细">
            <AvailableAssersList :list="list"></AvailableAssersList>
          </van-tab>
        </van-tabs>
        <div v-else style="text-align: center">暂无数据</div>
      </van-list>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import {
  Button,
  List,
  ActionSheet,
  Divider,
  Icon,
  Toast,
  Tab,
  Popup,
  Tabs,
  Field
} from "vant";
import {
  recordListApi,
  assetTypeApi,
  myBalanceApi
} from "@/net/api/userInfoApi";
import AvailableAssersList from "../availableAssets/availableAssersList";

import { Decimal } from "decimal.js";
export default {
  name: "frozen",
  components: {
    AvailableAssersList,
    HeadNav,
    "van-button": Button,
    "van-list": List,
    "van-action-sheet": ActionSheet,
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Field.name]: Field
  },
  data() {
    return {
      list: [],
      viwe: false,
      loading: false,
      finished: false,
      actions: this.dataType(),
      type: [3, 13],
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      asset: this.$route.query.asset,
      active: 0,
      myAssetM: {},
      number: "",
      // 划转类型
      transferType: 1,
      myTokensData: {}
    };
  },
  created() {
    this.myAsset();
  },
  methods: {
    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    transformation() {
      if (this.transferType === 1) {
        this.transferType = 2;
      } else if (this.transferType === 2) {
        this.transferType = 1;
      }
    },
    handleClear() {
      this.show = false;
    },
    // 精度
    getTotal(item = 0) {
      if (item.indexOf() == -1) {
        const myMoney = [];
        for (let i = 0; i < item.length; i++) {
          myMoney.push(new Decimal(item[i]));
        }
        return eval(myMoney.join("+"));
      }
    },

    // 获取钱包
    myAsset() {
      myBalanceApi().then(res => {
        res.data.forEach(item => {
          if (item.asset === this.asset) {
            this.myAssetM = item;
          }
        });
        this.viwe = true;
      });
      assetTypeApi().then(res => {
        if (res.ret == 200) {
          res.data.forEach(item => {
            if (item.asset === this.asset) {
              this.myTokensData = item;
            }
          });
          this.viwe = true;
        }
      });
    },

    onLoad() {
      this.getRecordListApi();
    },
    beforeChange(index) {
      this.pagination = {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      };
      this.list = [];
      if (index === 0) {
        this.type = [3, 13];
        this.getRecordListApi(this.type);
      } else if (index === 1) {
        this.type = [17, 21, 30, 31];
        this.getRecordListApi(this.type);
      }
    },
    toast(type) {
      if (type === 1) {
        Toast("仅充值账户可用于提币，参与算力加速计划等操作");
      } else if (type === 2) {
        Toast(
          "每日12点发放上一日挖矿收益，当日18点前未划转至充提账户，余额将自动划转至质押账户"
        );
      }
    },
    // 数据请求
    getRecordListApi(x = this.type) {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        asset: this.asset,
        count: this.pagination.pageSize,
        type: `${x}`
      };
      recordListApi(getData)
        .then(res => {
          let newList = res.data.list;
          // 后台返回无数据为对象进行判断
          if (res.data.list.length === 0) {
            this.finished = true;
          } else {
            this.list =
              this.pagination.current === 1
                ? newList
                : this.list.concat(newList);
          }
          this.pagination.current += 1;
        })
        .catch(() => (this.finished = true))
        .finally(() => {
          this.loading = false;
        });
    },
    // 类型判断
    typeText(x) {
      let thisName = null;
      this.dataType().map(val => {
        if (val.type === x) {
          thisName = val.name;
        }
      });
      return thisName;
    },
    dataType() {
      return [
        { type: 0, name: "全部" },
        { type: 1, name: "购买算力" },
        { type: 2, name: "申请加速算力" },
        { type: 3, name: "充值" },
        { type: 4, name: "提现" },
        { type: 5, name: "提现中" },
        { type: 6, name: "收益金额划转至充值" },
        { type: 7, name: "充值金额划转至收益" },
        { type: 8, name: "内部转出" },
        { type: 9, name: "内部转入" },
        { type: 10, name: "预估借币本息" },
        { type: 11, name: "还贷" },
        { type: 12, name: "返佣" },
        { type: 13, name: "系统充币" },
        { type: 14, name: "活动奖励" },
        { type: 15, name: "系统提币" },
        { type: 17, name: "收益线性释放" },
        { type: 18, name: "系统扣除" },
        { type: 20, name: "冻结金额扣除" },
        { type: 21, name: "25%收益直接释放" },
        { type: 22, name: "收益金额划转至抵押" },
        { type: 23, name: "质押金额返还" },
        { type: 24, name: "挖矿收益" },
        { type: 25, name: "SR质押币发放" },
        { type: 26, name: "扣除质押币" },
        { type: 27, name: "充值划转质押" },
        { type: 28, name: "收益释放至质押" },
        { type: 29, name: "加速收益" },
        { type: 30, name: "25%加速收益释放" },
        { type: 31, name: "加速收益释放" },
        { type: 32, name: "借币质押" }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-width {
  width: 50px;
}
.popup-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
.popup-padding {
  padding: 30px;
  .popup-black {
    font-size: 16px;
    color: #333333ff;
    font-weight: 500;
  }
  .popup-type {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-B {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-num {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-q {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-button {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 150px;
    }
    .popup-van-quxiao {
      border-radius: 16px;
      background: #d0d0d0;
      color: #fff;
    }
    .popup-van-huazhuan {
      border-radius: 16px;
      background: #f9a03eff;
      color: #fff;
    }
  }
}

.assetDetails {
  padding: 10px 10px;
  .available-padding {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    .available {
      display: flex;
      color: #333333ff;
      margin-top: 15px;
      .available-assets {
        font-size: 14px;
        font-weight: 400;
      }
      .available-assets-num {
        font-size: 16px;
        font-weight: 500;
        margin-left: 15px;
        span {
          font-size: 12px;
        }
      }
      .available-assets-button {
        margin-left: 20px;
        padding: 0 15px;
        background: #f7a90dff;
        color: #fff;
        border-radius: 8px;
      }
    }
    .balance {
      display: flex;
      align-items: center;
      .assets-balance {
        width: 49%;
      }
      .xian {
        width: 1px;
        height: 30px;
        background: #f2f2f2ff;
      }
    }
  }
}
</style>
