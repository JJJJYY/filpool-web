<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails  list page-container">
      <div class="available-padding" v-if="viwe">
        <div class="available">
          <p class="available-assets">可用资产:</p>
          <p class="available-assets-num">
            {{
              getTotal([myAssetM.recharge, myAssetM.available])
                | parseFloatFilter
            }}<span>FIL</span>
          </p>
          <van-button
            size="mini"
            class="available-assets-button"
            @click="transfer"
            >划转</van-button
          >
          <p></p>
        </div>
        <van-divider />
        <div class="balance">
          <div class="assets-balance">
            <p style="font-size: 12px;color:#666666FF">
              充值余额<van-icon
                name="question-o"
                @click="toast(1)"
                style="margin-left : 8px"
              />
            </p>
            <p
              style="font-size: 14px;  font-weight: 500;ccolor:#333333FF;line-height: 30px;"
            >
              {{ myAssetM.recharge | parseFloatFilter }} FIL
            </p>
          </div>
          <div class="xian"></div>
          <div class="assets-balance" style="margin-left: 20px">
            <p style="font-size: 12px;color:#666666FF">
              收益余额<van-icon
                name="question-o"
                style="margin-left : 8px"
                @click="toast(2)"
              />
            </p>
            <p
              style="font-size: 14px; font-weight: 500;color:#333333FF ;line-height: 30px;"
            >
              {{ myAssetM.available | parseFloatFilter }} FIL
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
        >
          <van-tab title="充值明细">
            <div class="tab-asset">
              <div class="tab-centent">
                <div>金额</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ item.quantity | parseFloatFilter }}{{ item.asset }}
                  </p>
                </div>
              </div>
              <div class="tab-centent">
                <div>类型</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ typeText(item.type) }}
                  </p>
                </div>
              </div>
              <div class="tab-centent">
                <div>时间</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ item.createTime }}
                  </p>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="收益明细">
            <div class="tab-asset  tab-asset-text">
              <div class="tab-centent">
                <div>金额</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px; border-bottom: 1px solid #EAEAEAFF;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ item.quantity | parseFloatFilter }}{{ item.asset }}
                  </p>
                </div>
              </div>
              <div class="tab-centent">
                <div>类型</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px;  border-bottom: 1px solid #EAEAEAFF;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ typeText(item.type) }}
                  </p>
                </div>
              </div>
              <div class="tab-centent">
                <div>时间</div>
                <div>
                  <p
                    style="height : 40px;font-size: 14px;color: #666666ff;  margin-top: 15px; border-bottom: 1px solid #EAEAEAFF;"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    {{ item.createTime }}
                  </p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
        <van-popup v-model="show" position="bottom">
          <div class="popup-padding">
            <div class="popup-black">划转</div>
            <div class="popup-type">
              <p class="popup-width">币种</p>
              <van-button type="default" size="mini" class="round popup-flex"
                >FIL</van-button
              >
            </div>
            <div class="popup-B">
              <p class="popup-width">从</p>
              <div class="popup-flex">
                <van-button
                  type="default"
                  size="mini"
                  class="round"
                  style="flex: 1;"
                >
                  {{ transferType == 1 ? "收益余额" : "充值余额" }}
                </van-button>
                <div style="display: flex;align-items: center ;margin: 0 5px">
                  <img
                    src="../../../assets/img/hua.png"
                    style="width: 15px; height15px"
                    alt=""
                    @click="transformation"
                  />
                  <p style="margin-left: 10px">到</p>
                </div>
                <van-button
                  type="default"
                  size="mini"
                  class="round"
                  style="flex: 1;"
                >
                  {{ transferType == 1 ? "充值余额" : "收益余额" }}
                </van-button>
              </div>
            </div>
            <div class="popup-num">
              <p class="popup-width">数量</p>

              <van-field
                v-model="number"
                type="number"
                placeholder="请输入划转数量"
              />
              <p>FIL</p>
            </div>
            <div class="popup-q">
              <p style="width: 50px; height: 1px;"></p>
              <p style="flex: 1">
                {{ transferType == 1 ? `收益余额` : `充值余额` }}
                {{
                  transferType == 1
                    ? myAssetM.available
                    : myAssetM.recharge | parseFloatFilter
                }}FIL
                <span
                  style="font-size: 14px"
                  @click="
                    number =
                      transferType == 1
                        ? done(myAssetM.available, 6)
                        : done(myAssetM.recharge, 6)
                  "
                  >全部</span
                >
              </p>
            </div>
            <div class="popup-button">
              <van-button class="popup-van-quxiao" @click="handleClear"
                >取消</van-button
              >
              <van-button class="popup-van-huazhuan" @click="handleOk"
                >划转</van-button
              >
            </div>
          </div>
        </van-popup>
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
  myBalanceApi,
  getTransfer
} from "@/net/api/userInfoApi";

import { Decimal } from "decimal.js";
export default {
  name: "assetDetails",
  components: {
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
      show: false, // 底部弹出框
      actions: this.dataType(),
      type: [3, 13],
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      asset: "FIL",
      active: 0,
      myAssetM: {},
      number: "",
      // 划转类型
      transferType: 1,
      myTokensData: {}
    };
  },
  created() {
    // this.getRecordListApi(this.type);
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
    // 划转
    handleOk() {
      if (this.number) {
        getTransfer({
          type: this.transferType,
          asset_id: this.myTokensData.id,
          amount: this.number
        })
          .then(res => {
            if (res.ret == 200) {
              Toast("划转成功");
              this.myAsset();
              this.show = false;
            }
          })
          .catch(() => {
            this.show = false;
          });
      } else {
        Toast("输入有误");
        this.show = false;
      }
    },
    transfer() {
      this.show = true;
    },
    // 精度
    getTotal(item) {
      const myMoney = [];
      for (let i = 0; i < item.length; i++) {
        myMoney.push(new Decimal(item[i]));
      }
      return eval(myMoney.join("+"));
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
            if (item.asset === "FIL") {
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
        this.type = [17, 21];
        this.getRecordListApi(this.type);
      }
    },
    toast(type) {
      if (type === 1) {
        Toast("充值余额才能进行抢购算力加速、提币等操作");
      } else if (type === 2) {
        Toast(
          "每日12点发放上一日挖矿收益，当日18点前不划转至充值余额，余额将自动划转至质押金额"
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
        { type: 2, name: "购买加速算力" },
        { type: 3, name: "充值" },
        { type: 4, name: "提现" },
        { type: 5, name: "提现中" },
        { type: 6, name: "收益金额划转至充值" },
        { type: 7, name: "充值金额划转至收益" },
        { type: 8, name: "内部转出" },
        { type: 9, name: "内部转入" },
        { type: 12, name: "返佣" },
        { type: 13, name: "系统充币" },
        { type: 14, name: "活动奖励" },
        { type: 15, name: "系统提币" },
        { type: 17, name: "收益线性释放" },
        { type: 18, name: "系统扣除" },
        { type: 20, name: "冻结金额扣除" },
        { type: 21, name: "25%收益直接释放" },
        { type: 22, name: "收益金额划转至抵押" },
        { type: 23, name: "抵押金额返还至收益" },
        { type: 24, name: "挖矿收益" },
        { type: 25, name: "SR质押币发放" },
        { type: 26, name: "扣除质押币" }
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
  .tab-available {
    .tab-asset {
      display: flex;
      justify-content: space-between;
      .tab-centent {
        text-align: center;
        color: #333333ff;
        div {
          &:nth-child(1) {
            font-size: 14px;
            color: #666666ff;
            margin-top: 15px;
          }
          &:nth-child(2) {
            font-size: 14px;
            color: #666666ff;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
