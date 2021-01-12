<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails list page-container">
      <div class="available-padding">
        <div class="available">
          <p class="available-assets">
            借币数量:
            <van-icon
              name="question-o"
              @click="toast(1)"
              style="margin-left: 4px"
            />
          </p>
          <p class="available-assets-num">
            {{
              (parseFloat(loan1.capital) + parseFloat(loan2.capital))
                | parseFloatFilter
            }}{{ asset }}
          </p>
          <p></p>
        </div>
        <van-divider />
        <div class="balance">
          <div class="assets-balance">
            <p style="font-size: 12px; color: #666666ff">
              预估本息<van-icon
                name="question-o"
                style="margin-left: 8px"
                @click="toast(2)"
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
              {{
                (parseFloat(loan1.total) + parseFloat(loan2.total))
                  | parseFloatFilter
              }}
              {{ asset }}
            </p>
          </div>
          <div class="xian"></div>
          <div class="assets-balance" style="margin-left: 20px">
            <p style="font-size: 12px; color: #666666ff">
              待还本息
            </p>
            <p
              style="
                font-size: 14px;
                font-weight: 500;
                color: #333333ff;
                line-height: 30px;
              "
            >
              {{
                (parseFloat(loan1.surplus) + parseFloat(loan2.surplus))
                  | parseFloatFilter
              }}
              {{ asset }}
            </p>
          </div>
        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
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
          <van-tab title="借币记录">
            <div class="list">
              <van-checkbox-group v-model="result" ref="CheckboxGroup">
                <div
                  class="call"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="toggle(item, index)"
                >
                  <div class="call-select">
                    <div>
                      <van-checkbox
                        :name="item"
                        ref="checkboxes"
                        shape="square"
                        checked-color="#EF8C21"
                        v-show="type === 1 && item.start_time"
                      />
                    </div>
                    <div v-if="item.start_time">状态：已生效</div>
                    <div v-if="!item.start_time">状态：未生效</div>
                  </div>
                  <div class="xian"></div>
                  <div class="call-top">
                    <template v-if="item.number === 1">
                      <p>一期借币</p>
                      <p class="call-color">
                        数量：{{ item.capital | parseFloatFilter }}{{ asset }}
                      </p>
                    </template>
                    <template v-if="item.number === 2">
                      <p>二期借币</p>
                      <p class="call-color">
                        数量：{{ item.capital | parseFloatFilter }}{{ asset }}
                      </p>
                    </template>
                  </div>
                  <div class="call-buttom">
                    <p class="call-time">{{ item.start_time }}</p>
                    <p class="call-color">
                      <span
                        >待还本息：{{ item.surplus | parseFloatFilter }}</span
                      >
                    </p>
                  </div>
                </div>
              </van-checkbox-group>
            </div>
            <!-- </van-list> -->
          </van-tab>
          <van-tab title="还币记录">
            <div class="list">
              <van-checkbox-group>
                <div class="call" v-for="(item, index) in list" :key="index">
                  <div class="call-select">
                    <div>
                      <!-- <van-checkbox
                        :name="item"
                        ref="checkboxes"
                        shape="square"
                        checked-color="#EF8C21"
                        v-show="type === 1"
                      /> -->
                    </div>
                    <div v-if="item.status === 1">状态：还款成功</div>
                    <div v-else>状态：还款失败</div>
                  </div>
                  <div class="xian"></div>
                  <div class="call-top">
                    <template v-if="item.number === 1">
                      <p>一期还币</p>
                      <p class="call-color">
                        数量：{{ item.quantity | parseFloatFilter }}{{ asset }}
                      </p>
                    </template>
                    <template v-if="item.number === 2">
                      <p>二期还币</p>
                      <p class="call-color">
                        数量：{{ item.quantity | parseFloatFilter }}{{ asset }}
                      </p>
                    </template>
                  </div>
                  <div class="call-buttom">
                    <p class="call-time">{{ item.createTime }}</p>
                    <p class="call-color">
                      <span></span>
                    </p>
                  </div>
                </div>
              </van-checkbox-group>
            </div>
            <!-- </van-list> -->
          </van-tab>
        </van-tabs>
        <div v-else style="text-align: center">暂无数据</div>
      </van-list>
    </div>
    <van-popup
      v-model="thisShow"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <div class="buy-centent">
        <div style="font-size: 18px;font-weight: 500">
          提前还款
        </div>
        <div style="margin-top: 30px">
          <span>还款金额：</span>
          <span style="color: #F9A03E;font-size: 18px">
            {{ totalMoneyNumData | parseFloatFilter }}FIL</span
          >
        </div>
        <div style="margin-top: 20px">
          <p>资金密码：</p>
          <van-field
            style="width: 100%; background: #e6e6e6; border-radius: 8px;margin-top:10px"
            v-model="password"
            type="password"
            placeholder="请输入资金密码"
          />
          <div
            style="font-size: 12px; color: #666666 ; display: flex; justify-content: space-between;margin-top:10px"
          >
            <p>
              当前充提账户余额为 {{ myAssetM.recharge | parseFloatFilter }} FIL
            </p>
            <p class="recharge" @click="topUpPaw">请充值</p>
          </div>
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
    <div class="footer" v-if="type === 1">
      <van-checkbox
        checked-color="#EF8C21"
        class="checkbox"
        v-model="checkedTotal"
        >全选</van-checkbox
      >
      <!-- <div class="money-color">
        还款金额：<span> {{ totalMoneyNumData | parseFloatFilter }}FIL</span>
      </div> -->
      <van-button color="#F9A03E" @click="returnMoney">提前还币</van-button>
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
  Field,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup
} from "vant";
import {
  myBalanceApi,
  Loan,
  RepaymentRecordList,
  BorrowList,
  Repayment,
  Calculate
} from "@/net/api/userInfoApi";
import md5 from "md5";
// import { Decimal } from "decimal.js";
export default {
  name: "loan",
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
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: CheckboxGroup,
    [CellGroup.name]: CheckboxGroup
  },
  data() {
    return {
      loan1: "",
      loan2: "",
      list: [],
      loading: false,
      finished: false,
      type: 1,
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      asset: this.$route.query.asset,
      active: 0,
      result: [],
      checkedTotal: false,
      totalMoneyNumData: 0,
      thisShow: false,
      password: "",
      pidList: [],
      myAssetM: {}
    };
  },
  created() {
    Loan().then(res => {
      if (res.ret === 200) {
        this.loan1 = res.data.loan1;
        this.loan2 = res.data.loan2;
      }
    });
    this.myAsset();
  },
  watch: {
    checkedTotal: function(newVal) {
      if (newVal) {
        this.$refs.CheckboxGroup.toggleAll(true);
      } else {
        this.$refs.CheckboxGroup.toggleAll();
      }
    },
    result: function(e) {
      let idList = [];
      e.forEach(val => {
        idList.push(val.id);
      });
      this.pidList = idList;
    }
  },
  methods: {
    returnMoney() {
      if (this.pidList.length > 0) {
        this.thisShow = true;
        this.password = "";
        const postData = {
          ids: this.pidList
        };
        Calculate(postData).then(res => {
          this.totalMoneyNumData =
            (res.data.capital * Math.pow(10, 10)) / Math.pow(10, 10) +
            (res.data.interest * Math.pow(10, 10)) / Math.pow(10, 10);
        });
      } else {
        Toast("请选择");
      }
    },
    buyOk() {
      const postData = {
        capital_pwd: md5(this.password),
        ids: this.pidList
      };
      Repayment(postData)
        .then(res => {
          if (res.ret === 200) {
            Toast("还款成功");
            this.list = [];
            this.pagination = {
              current: 1, // 当前页
              pageSize: 10 // 页大小
            };
            this.finished = false;
            this.loading = true;
            this.onLoad();
          } else {
            Toast("还款失败");
          }
          this.thisShow = false;
        })
        .catch(err => {
          this.list = [];
          this.pagination = {
            current: 1, // 当前页
            pageSize: 10 // 页大小
          };
          this.finished = false;
          this.loading = true;
          this.onLoad();
          this.thisShow = false;
        });
    },
    topUpPaw() {
      this.$router.push({
        path: "/myasset"
      });
    },
    toggle(item, index) {
      if (item.start_time) {
        this.$refs.checkboxes[index].toggle();
      }
    },
    onLoad() {
      this.loading = true;
      this.getRecordListApi(this.type);
    },
    beforeChange(index) {
      this.pagination = {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      };
      this.list = [];
      if (index === 0) {
        this.type = 1;
        this.getRecordListApi(this.type);
      } else if (index === 1) {
        this.type = 2;
        this.getRecordListApi(this.type);
      }
    },
    toast(type) {
      if (type === 1) {
        Toast("借币数量包含一期加速算力加速包、二期质押");
      } else if (type === 2) {
        Toast("预估本息=借币本金+年化利息30%");
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
      });
    },
    // 数据请求
    getRecordListApi(x = this.type) {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        count: this.pagination.pageSize
      };
      if (x === 1) {
        BorrowList(getData)
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
      } else {
        RepaymentRecordList(getData)
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
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.call-box {
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 8px;
  .cut-off-rule {
    width: 100%;
    height: 1px;
    background: #efefefff;
    margin: 12px 0;
  }
  .tow-date-title {
    display: flex;
    justify-content: space-between;
    .tow-date-title-text {
      color: #666666ff;
    }
  }
  .progress-box-flex {
    display: flex;
    align-items: center;
    .fil-box {
      display: flex;
      align-items: center;
      .fang {
        width: 8px;
        height: 8px;
        background: #f7a90dff;
        margin: 0 10px;
      }
      .fang-two {
        width: 8px;
        height: 8px;
        background: #aaaaaaff;
        margin: 0 10px;
      }
    }
    .fil-top {
      margin-top: 12px;
    }
    .progress-circle {
      width: 60px;
      height: 60px;
    }
  }
  .to-buy {
    width: 100%;
    color: #666666ff;
    text-align: right;
    display: inline-block;
  }
  .power-storage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .xian {
      width: 1px;
      height: 20px;
      background: #ecececff;
    }
    .power-storage-box {
      text-align: center;
      .num-color {
        color: #f0ac25ff;
        font-size: 14px;
        margin-top: 12px;
      }
    }
  }
}
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

.footer {
  background: #fff;
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .checkbox {
    margin-left: 20px;
  }
  .money-color {
    color: #666;
    span {
      color: #000;
    }
  }
}
.assetDetails {
  margin-bottom: 50px;
  .call {
    padding: 8px 16px;
    border-bottom: 1px solid #dedede;
    background-color: #fff;
    border-radius: 4px;
    margin-top: 8px;
    .call-select {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .xian {
      height: 1px;
      width: 100%;
      margin: 5px 0;
      background: #f5f5f5;
    }
    .call-top {
      display: flex;
      justify-content: space-between;
      .call-color {
        color: #666666;
      }
    }
    .call-buttom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .call-time {
        color: #999999;
      }
      .call-color {
        color: #666666;
      }
    }
  }
  padding: 10px 10px;
  .available-padding {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    .available {
      // display: flex;
      color: #333333ff;
      margin-top: 15px;
      .available-assets {
        font-size: 14px;
        font-weight: 400;
      }
      .available-assets-num {
        font-size: 16px;
        font-weight: 600;
        // margin-left: 15px;
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
