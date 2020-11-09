<template>
  <div class="padding">
    <div class="item">
      <div>
        <div class="name">
          <img
            src="../../assets/img/buy-icon.png"
            alt=""
            style="width: 16px; height: 12px"
          />
          <h3>{{ goodData.tittle }}</h3>
          <img
            src="../../assets/img/fire.png"
            alt=""
            style="width: 12px; height: 14px"
          />
        </div>
        <div class="padding">
          <p class="subtitle">开始时间{{ goodData.start_time }}</p>
          <p class="subtitle">结束时间{{ goodData.finish_time }}</p>
          <div class="intro">
            <div class="intro-item">
              <p class="intro-item-title">总抢购算力</p>
              <p style="margin-top: 8px">{{ goodData.total_power }}TiB</p>
            </div>
            <div class="intro-item">
              <p class="intro-item-title">有效算力质押量</p>
              <p style="margin-top: 8px">
                {{ goodData.price | parseFloatFilter }}FIL/TiB
              </p>
            </div>
          </div>
          <div class="handler">
            <div class="handler-amount">
              <span style="font-size: 20px">{{
                (goodData.price * amount) | parseFloatFilter
              }}</span>
              <span style="font-size: 18px">FIL</span>
            </div>
            <div style="flex: 1"></div>
            <AddSubtractBox
              v-model="amount"
              :maxlimit="goodData.avl_buy_power"
              :limit="parseInt(goodData.minimum_unit)"
            />
            <div style="color: #575c62; font-size: 12px; margin-left: 12px">
              TiB
            </div>
          </div>
          <div v-if="show" class="maxBuy">
            可申请的最大值 {{ goodData.avl_buy_power }}TiB 全部
          </div>
          <van-progress class="vanProgress" :percentage="progress" />
        </div>
        <div class="hr" />
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <a v-if="!show" @click="toDetail" style="color: #666666">产品详情>></a>
        <p v-else></p>
        <a class="btn-gradient" @click="toDetail">申请加速包</a>
      </div>
      <span class="tag">限量</span>
    </div>

    <van-popup
      v-model="thisShow"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <div class="buy-centent">
        <div class="buy-centent-flex">
          <p>订单信息</p>
          <p class="recharge">去充值</p>
        </div>
        <div class="buy-centent-flex" style="margin-top: 20px">
          <div class="buy-centent-left">
            <p>抢购算力：</p>
            <p>单价：</p>
            <p>金额：</p>
          </div>
          <div class="buy-centent-right">
            <p>{{ amount }} TiB</p>
            <p>{{ goodData.price | parseFloatFilter }} FIL/TiB</p>
            <p>{{ (goodData.price * amount) | parseFloatFilter }} FIL</p>
          </div>
        </div>
        <div style="margin-top: 20px">
          <p style="font-size: 12px; color: #666666">资金密码：</p>
          <van-field
            style="width: 100%; background: #e6e6e6; border-radius: 8px"
            :v-model="password"
            type="password"
            placeholder="请输入资金密码"
          />
          <p style="font-size: 12px; color: #666666; margin-top: 10px">
            仅充值余额可进行算力加速购买，当前充值余额为0FIL
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
    <van-popup
      style="width: 80%; border-radius: 8px; text-align: center"
      v-model="lineUpVisible"
      :close-on-click-overlay="false"
    >
      <p
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 40px;
        "
      >
        排队中，正在努力中<van-loading type="spinner" />
      </p>
      <p style="line-height: 40px">当前参与人数过多请耐心等待...</p>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Field, Button, Toast, Loading } from "vant";
import AddSubtractBox from "@/components/AddSubtractBox";
import { Progress } from "vant";
import md5 from "md5";
import { getPurchaseInfo, getPurchase } from "../../net/api/userInfoApi";
export default {
  props: {
    goodData: {},
    show: Boolean
  },
  components: {
    AddSubtractBox,
    [Progress.name]: Progress,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Loading.name]: Loading
  },
  data() {
    return {
      amount: parseInt(this.goodData.minimum_unit),
      progress: 0,
      thisShow: false,
      password: "",
      pid: "",
      lineUpVisible: false
    };
  },
  watch: {
    goodData: function() {
      this.amount = parseInt(this.goodData.minimum_unit);
      this.progress = this.done(
        ((this.goodData.total_power - this.goodData.remain_power) /
          this.goodData.total_power) *
          100,
        2
      );
    }
  },
  created() {
    if (this.goodData.id) {
      this.progress = this.done(
        ((this.goodData.total_power - this.goodData.remain_power) /
          this.goodData.total_power) *
          100,
        2
      );
    }
  },
  methods: {
    buyOk() {
      getPurchase({
        buy_power: this.amount,
        capital_pwd: md5(this.password),
        product_id: this.goodData.id
      })
        .then(res => {
          if (res.ret === 200) {
            this.pid = res.data;
            this.purchaseStatus(this.pid);
            this.lineUpVisible = true;
          } else {
            this.thisShow = false;
          }
        })
        .catch(() => (this.thisShow = false));
    },

    // 定时刷新抢购状态
    purchaseStatus(pid) {
      let timer = null;
      net
        .getCheckOrderStatus({
          pid
        })
        .then(res => {
          if (res.ret === 200) {
            if (res.data) {
              this.lineUpVisible = false;
              // 提示
              if (res.data.payment_status) {
                Toast.success(res.data.description);
              } else {
                Toast.fail(res.data.description);
              }
              clearTimeout(timer);
            } else {
              clearTimeout(timer);
              timer = setTimeout(() => {
                this.purchaseStatus(pid);
              }, 1000);
            }
          } else {
            clearTimeout(timer);
            this.lineUpVisible = false;
          }
        });
    },

    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    statusBtnTitle(status) {
      switch (status) {
        case 1:
          return "立即购买";
        case 2:
          return "未开始";
        case 3:
          return "已结束";
      }
    },
    // 商品详情
    toDetail() {
      if (this.show) {
        if (this.goodData.avl_buy_power == 0) {
          Toast("没有符合购买要求");
          return;
        }
        if (this.goodData.price * this.amount < this.goodData.avl_fil) {
          Toast("余额不足");
          return;
        }
        if (this.amount < this.goodData.avl_buy_power) {
          Toast("超过最大购买算力");
          return;
        }
        this.thisShow = true;
      } else {
        if (this.$store.state.userData.id) {
          if (this.goodData.status === 1) {
            this.$router.push({
              path: `/rate_detail/${this.goodData.id}/${this.amount}`
            });
          }
        } else {
          this.$router.push({
            path: `/login`
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";

.buy-centent {
  padding: 16px 30px;
  .buy-centent-flex {
    display: flex;
    justify-content: space-between;
    .recharge {
      font-size: 12px;
      color: #f9a03e;
    }
    .buy-centent-left {
      font-size: 14px;
      color: #666666;
      p {
        line-height: 25px;
      }
    }
    .buy-centent-right {
      font-size: 14px;
      color: #333333;
      p {
        line-height: 25px;
      }
    }
  }
}

/deep/.van-progress {
  height: 10px;
  border-radius: 8px;
  .van-progress__portion {
    background-image: url("../../assets/img/progress.png");
    .van-progress__pivot {
      background: linear-gradient(to right, #f18c2e, #fbae4e);
    }
  }
}
.item {
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  background: $content-backgroun-color;
  /*margin-top: 12px;*/
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  .name {
    display: flex;
    align-items: center;
    margin-top: 20px;
    h3 {
      color: $h1-color;
      font-size: 15px;
      font-weight: bold;
      margin: 0 5px;
    }

    span {
      background: $main-color;
      font-size: 11px;
      padding: 2px 4px;
      border-radius: 2px;
      color: white;
      margin-left: 6px;
    }
  }
  .padding {
    padding: 0 12px;
  }
  .subtitle {
    margin-top: 6px;
    font-size: 12px;
    color: $h3-color;
  }
  .maxBuy {
    text-align: right;
    font-size: 12px;
    margin-top: 10px;
    color: #999999;
  }
  .intro {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    &-item {
      margin-top: 12px;
      text-align: center;
      &-title {
        font-size: 14px;
        color: $h3-color;
      }

      &-value {
        font-size: 14px;
        color: $h1-color;
        margin-left: 6px;
      }
    }
  }

  .handler {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    &-amount {
      display: inline-block;
      font-size: 18px;
      font-weight: 500;
      color: $main-color;
    }
  }

  .hr {
    margin: 18px 0;
    background: $divider-color;
    height: 0.5px;
  }

  $btn-height: 34px;

  a.btn-gradient {
    display: inline-block;
    border-radius: 12px;
    height: $btn-height;
    line-height: $btn-height;
    border-radius: $btn-height / 2;
    font-size: 15px;
    text-align: center;
    padding: 0 24px;
    color: #fff;
    align-self: flex-end;
    &.gray {
      background: #999;
    }
  }

  .tag {
    color: #fff;
    font-size: 11px;
    padding: 4px 6px;
    background: $main-color;
    position: absolute;
    border-radius: 0 8px 0 2px;
    top: 0;
    right: 0;
  }
}

.disabled-btn {
  background: #ccc;
}
.vanProgress {
  display: flex;
  margin-top: 20px;
}
</style>
