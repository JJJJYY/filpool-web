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
          <van-tab title="算力一期">
            <div class="call-box">
              <div class="tow-date-title">
                <p class="tow-date-title-text">借币数量：</p>
                <p>{{ loan1.capital | parseFloatFilter }}{{ asset }}</p>
              </div>
              <div class="cut-off-rule"></div>
              <div class="tow-date-title">
                <p class="tow-date-title-text">预估本息:</p>
                <p>{{ loan1.total | parseFloatFilter }}{{ asset }}</p>
              </div>
              <div class="cut-off-rule"></div>
              <div class="tow-date-title">
                <p class="tow-date-title-text">待还本息:</p>
                <p>{{ loan1.surplus | parseFloatFilter }}{{ asset }}</p>
              </div>
            </div>
            <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          > -->
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <div class="list">
              <div class="call" v-for="(item, index) in list" :key="index">
                <div class="call-top">
                  <template v-if="item.type === 10">
                    <p>借币</p>
                    <p class="call-color">
                      +{{ item.quantity | parseFloatFilter }}{{ asset }}
                    </p>
                  </template>
                  <template v-if="item.type === 11">
                    <p>还币</p>
                    <p class="call-color">
                      -{{ item.quantity | parseFloatFilter }}{{ asset }}
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
            </div>
            <!-- </van-list> -->
          </van-tab>
          <van-tab title="算力二期">
            <div class="call-box">
              <div class="tow-date-title">
                <p class="tow-date-title-text">借币数量：</p>
                <p>{{ loan2.capital | parseFloatFilter }}{{ asset }}</p>
              </div>
              <div class="cut-off-rule"></div>
              <div class="tow-date-title">
                <p class="tow-date-title-text">预估本息:</p>
                <p>{{ loan2.total | parseFloatFilter }}{{ asset }}</p>
              </div>
              <div class="cut-off-rule"></div>
              <div class="tow-date-title">
                <p class="tow-date-title-text">待还本息:</p>
                <p>{{ loan2.surplus | parseFloatFilter }}{{ asset }}</p>
              </div>
            </div>
            <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          > -->
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <div class="list">
              <div class="call" v-for="(item, index) in list" :key="index">
                <div class="call-top">
                  <template v-if="item.type === 10">
                    <p>借币</p>
                    <p class="call-color">
                      +{{ item.quantity | parseFloatFilter }}{{ asset }}
                    </p>
                  </template>
                  <template v-if="item.type === 11">
                    <p>还币</p>
                    <p class="call-color">
                      -{{ item.quantity | parseFloatFilter }}{{ asset }}
                    </p>
                  </template>
                </div>
                <div class="call-buttom">
                  <p class="call-time">{{ item.createTime }}{{ asset }}</p>
                  <p class="call-color">
                    <span></span>
                  </p>
                </div>
              </div>
            </div>
            <!-- </van-list> -->
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
  myBalanceApi,
  getTransfer,
  Loan,
  LoanRecordList
} from "@/net/api/userInfoApi";

import { Decimal } from "decimal.js";
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
    [Field.name]: Field
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
      active: 0
    };
  },
  created() {
    Loan().then(res => {
      if (res.ret === 200) {
        this.loan1 = res.data.loan1;
        this.loan2 = res.data.loan2;
      }
    });
  },
  methods: {
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
    // 数据请求
    getRecordListApi(x = this.type) {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        count: this.pagination.pageSize,
        number: `${x}`
      };
      LoanRecordList(getData)
        .then(res => {
          console.log(res);
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

.assetDetails {
  .call {
    padding: 8px 16px;
    border-bottom: 1px solid #dedede;
    // background-color: #fff;
    border-radius: 4px;
    margin-top: 8px;
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
