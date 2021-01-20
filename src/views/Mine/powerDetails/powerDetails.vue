<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails list page-container">
      <div class="isDataFlex">
        <p
          :class="['isDataText', { 'isDataText-active': isDate === 1 }]"
          @click="isDate = 1"
        >
          一期
        </p>
        <p
          :class="['isDataText', { 'isDataText-active': isDate === 2 }]"
          @click="isDate = 2"
        >
          二期
        </p>
      </div>
      <div class="call-box" v-if="boxLoading">
        <div class="call-titleJump">
          <div v-if="isDate === 1" class="to-buy">
            <router-link class="call-jump" :to="{ path: '/rate' }">
              去申请算力>>
            </router-link>
          </div>
          <div class="to-buy" v-if="isDate === 2">
            <span @click="popupShow = true">去质押>></span>
          </div>
          <div class="power-storage">
            <div class="power-storage-box">
              <p>总储存空间</p>
              <p class="num-color">{{ totalWeight | parseFloatFilter }}TiB</p>
            </div>
            <div class="xian"></div>
            <div class="power-storage-box">
              <p>上限有效算力</p>
              <p class="num-color">{{ maxAdj | parseFloatFilter }}TiB</p>
            </div>
            <div class="xian"></div>
            <div class="power-storage-box">
              <p>目前有效算力</p>
              <p class="num-color">{{ validWeight | parseFloatFilter }}TiB</p>
            </div>
          </div>
          <van-progress
            style="margin-top: 15px"
            :percentage="
              parseFloat(this.maxAdj) === 0
                ? 0
                : done((parseFloat(validWeight) / parseFloat(maxAdj)) * 100, 4)
            "
            color="#F7A90D"
          />
        </div>
      </div>
      <div class="call-box" v-if="boxLoading && isDate === 2">
        <div class="progress-box-flex">
          <div class="progress-circle">
            <v-progressCircle
              :percent-num="progressCircle"
              :speed="4"
            ></v-progressCircle>
          </div>
          <div style="flex: 1">
            <div class="fil-box">
              <p class="fang"></p>
              <p>已质押：{{ pledged | parseFloatFilter }} FIL</p>
            </div>
            <div class="fil-box fil-top">
              <p class="fang-two"></p>
              <p>预估所需质押量：{{ maxPledged | parseFloatFilter }} FIL</p>
            </div>
          </div>
        </div>
        <div class="cut-off-rule"></div>
        <div class="tow-date-title">
          <p class="tow-date-title-text">待质押：</p>
          <p>
            {{ currentPledged | parseFloatFilter }} FIL
            <van-icon
              name="question-o"
              @click="
                () => {
                  this.$toast(
                    '系统会优先扣除待质押余额进行质押，如需扣除数量不够，默认向合作DeFil平台进行借贷'
                  );
                }
              "
            />
          </p>
        </div>
        <div class="cut-off-rule"></div>
        <div class="tow-date-title">
          <p class="tow-date-title-text">借贷总额：</p>
          <p>{{ totalLoan | parseFloatFilter }} FIL</p>
        </div>
        <div class="cut-off-rule"></div>
        <div class="tow-date-title">
          <p class="tow-date-title-text">待还款总额：</p>
          <p>
            {{ surplusLoan | parseFloatFilter }} FIL
            <van-icon
              name="question-o"
              @click="
                () => {
                  this.$toast('每日释放收益的80%用于还款');
                }
              "
            />
          </p>
        </div>
      </div>
      <van-popup v-model="popupShow" position="bottom">
        <div class="popup-padding">
          <div class="popup-black">划转</div>
          <div class="popup-type">
            <p class="popup-width">币种</p>
            <van-button type="default" size="mini" class="round popup-flex">{{
              asset
            }}</van-button>
          </div>
          <div class="popup-B">
            <p class="popup-width">从</p>
            <div class="popup-flex">
              <van-button
                type="default"
                size="mini"
                class="round"
                style="flex: 1"
              >
                充提账户
              </van-button>
              <div style="display: flex; align-items: center; margin: 0 5px">
                <img
                  src="@/assets/img/hua.png"
                  style="width: 15px; height15px"
                  alt=""
                />
                <p style="margin-left: 10px">到</p>
              </div>
              <van-button
                type="default"
                size="mini"
                class="round"
                style="flex: 1"
              >
                质押
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
            <p>{{ asset }}</p>
          </div>
          <div class="popup-q">
            <p style="width: 50px; height: 1px"></p>
            <p style="flex: 1">
              {{
                Math.min(
                  done(maxPledged, 6) - done(currentPledged, 6),
                  done(myAssetM.recharge, 6)
                )
              }}
              <span
                style="font-size: 14px"
                @click="
                  number = Math.min(
                    done(maxPledged, 6) - done(currentPledged, 6),
                    done(myAssetM.recharge, 6)
                  )
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
      <div v-if="boxLoading" class="call-box-details">算力增长明细:</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="boxLoading"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="list">
          <div class="call" v-for="(item, index) in list" :key="index">
            <div class="call-top">
              <p>{{ dataType(item.type) }}</p>
              <p class="call-color">+{{ item.power | parseFloatFilter }}TiB</p>
            </div>
            <div class="call-buttom">
              <p class="call-time">{{ item.createTime }}</p>
              <p class="call-color">
                <span></span>
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { List, Progress, Popup, Toast, Button, Field, Icon } from "vant";
import axios from "axios"; // 作用取消请求
import ProgressCircle from "../../../components/progress/ProgressCircle";
import {
  getUserAdjPowerList,
  getMyPower,
  myBalanceApi,
  getTransferPledged
} from "@/net/api/userInfoApi";
export default {
  name: "powerDetails",
  components: {
    "v-progressCircle": ProgressCircle,
    HeadNav,
    "van-list": List,
    "van-progress": Progress,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon
  },
  data() {
    return {
      list: [],
      loading: false,
      boxLoading: false,
      finished: false,
      show: false, // 底部弹出框
      type: 0,
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      isDate: 1,
      cancelAjax: null, // 作用取消请求
      popupShow: false,
      asset: "FIL",
      number: "",
      myAssetM: {},
      maxPledged: 0,
      currentPledged: 0
    };
  },
  watch: {
    isDate() {
      this.show = false;
      if (this.isDate === 1) {
        this.list = [];
        this.pagination = {
          current: 1,
          pageSize: 10
        };
        this.getMyPowerTwo();
        this.loading = true;
        this.finished = false;
        // this.onLoad();
      } else if (this.isDate === 2) {
        this.list = [];
        this.pagination = {
          current: 1,
          pageSize: 10
        };
        this.getMyPowerTwo();
        this.loading = true;
        this.finished = false;
        // this.onLoad();
      }
    }
  },
  created() {
    this.myAsset();
    this.getMyPowerTwo();
  },
  methods: {
    handleOk() {
      if (this.number) {
        getTransferPledged({
          amount: this.number
        })
          .then(res => {
            if (res.ret === 200) {
              Toast.success("划转成功");
              this.getMyPowerTwo();
              this.myAsset();
            }
            this.popupShow = false;
          })
          .catch(() => {
            this.popupShow = false;
          });
      }
    },
    handleClear() {
      this.popupShow = false;
    },
    getMyPowerTwo() {
      this.boxLoading = false;
      const CancelToken = axios.CancelToken;
      if (typeof this.cancelAjax === "function") {
        this.cancelAjax();
      }
      let _this = this;
      getMyPower(
        { number: this.isDate },
        // 取消请求
        new CancelToken(function executor(c) {
          _this.cancelAjax = c;
        })
      ).then(res => {
        this.boxLoading = true;
        this.totalWeight = res.data.totalPower;
        this.validWeight = res.data.adj;
        this.maxAdj = res.data.maxAdj;
        this.pledged = res.data.pledged || 0;
        this.currentPledged = res.data.currentPledged || 0;
        this.maxPledged = res.data.maxPledged || 0;
        this.totalLoan = res.data.totalLoan || 0;
        this.surplusLoan = res.data.surplusLoan || 0;
        this.loading = false;
        this.show = true;
        this.progressCircle = this.done(
          (parseFloat(this.pledged) / parseFloat(this.maxPledged)) * 100,
          0
        );
      });
    },
    myAsset() {
      myBalanceApi().then(res => {
        res.data.forEach(item => {
          if (item.asset === this.asset) {
            this.myAssetM = item;
          }
        });
      });
    },
    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      if (isNaN(newNum)) {
        return (newNum = 0);
      }
      return newNum;
    },
    onLoad() {
      console.log("open");
      this.getRecordListApi();
    },
    // 类型
    dataType(x) {
      let typeText = null;
      switch (true) {
        case x === 0:
          typeText = "全部";
          break;
        case x === 1:
          typeText = "算力增长";
          break;
        case x === 2:
          typeText = "算力加速";
          break;
        default:
          0;
      }
      return typeText;
    },
    // 数据请求
    getRecordListApi() {
      const getData = {
        page: this.pagination.current,
        asset: this.asset,
        count: this.pagination.pageSize,
        type: this.type,
        number: this.isDate
      };
      getUserAdjPowerList(getData)
        .then(res => {
          // console.log(res);
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
        .catch(() => ((this.finished = true), (this.loading = false)))
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.isDataFlex {
  display: flex;
  align-items: center;
  .isDataText {
    width: 45px;
    text-align: center;
    color: #666666ff;
  }
  .isDataText-active {
    font-size: 16px;
    color: #333333ff;
  }
}
.call-jump {
  color: #666666ff;
}
.call-box-details {
  padding: 0 12px;
  margin-top: 8px;
  color: #333333ff;
  font-size: 14px;
  font-weight: 500;
}
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
  padding: 0 10px;
  .call {
    padding: 8px 16px;
    background-color: #fff;
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
.popup-width {
  width: 50px;
}
.popup-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
</style>
