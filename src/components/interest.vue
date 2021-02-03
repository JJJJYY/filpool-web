<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="intersetContent">
      <h2>存币生息</h2>
      <!-- <p class="intersetContentP">
        剩余额度：{{
          (detailInfo.total - detailInfo.collected_amount) | parseFloatFilter
        }}{{ asset }}
      </p> -->
      <div class="intersetContentText">
        <p class="intersetContentTextNum">
          充提账户余额： {{ myAssetM.recharge | parseFloatFilter }}{{ asset }}
        </p>
        <p @click="topUpPaw" class="intersetContentTextJump">去充值</p>
      </div>
      <div class="inputBorder">
        <div>金额</div>
        <div class="xian">|</div>
        <input
          type="text"
          v-model="amountF"
          :placeholder="
            `${detailInfo.minimum_amount}${asset}起投，最多可投${detailInfo.maximum_amount}${asset}`
          "
        />
        <div>{{ asset }}</div>
      </div>
      <div class="textRight">
        预计收益≈{{
          (amountF * detailInfo.earning_rate * (detailInfo.last_days / 365))
            | parseFloatFilter
        }}{{ asset }}
      </div>
    </div>
    <div class="reminder">
      温馨提示：仅充提账户余额可进行参与联合挖矿
    </div>
    <van-popup
      v-model="thisShow"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <div class="buy-centent">
        <div style="margin-top: 20px">
          <p>资金密码：</p>
          <van-field
            style="width: 100%; background: #e6e6e6; border-radius: 8px;margin-top:10px"
            v-model="password"
            type="password"
            placeholder="请输入资金密码"
          />
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
            @click="okBuy"
            >确认</van-button
          >
        </div>
      </div>
    </van-popup>
    <div @click="add" class="ButtonClick">
      立即参与
    </div>
  </div>
</template>

<script>
import {
  Popup,
  Tab,
  Tabs,
  List,
  Progress,
  Divider,
  button,
  field,
  Toast
} from "vant";
// import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
// import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import dayjs from "dayjs";
import md5 from "md5";
import {
  CbbProductShow,
  myBalanceApi,
  CbbUserOrdersAdd
} from "@/net/api/userInfoApi";

export default {
  name: "interest",
  components: {
    HeadNav,
    // CalcPowerItem,
    // CalcPowerBuyPopup,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Progress.name]: Progress,
    [Divider.name]: Divider,
    [button.name]: button,
    [field.name]: field,
    [Toast.name]: Toast
  },
  data() {
    return {
      thisShow: false,
      password: "",
      id: this.$route.query.id,
      detailInfo: "",
      myAssetM: "",
      asset: "FIL",
      amountF: ""
    };
  },
  created() {
    this.CbbProductShowApi();
    this.getMyBalanceApi();
  },
  methods: {
    okBuy() {
      const postData = {
        product_id: this.id,
        capital_pwd: md5(this.password),
        amount: this.amountF
      };
      CbbUserOrdersAdd(postData)
        .then(res => {
          console.log(res);
          if (res.ret === 200) {
            Toast("已完成");
            this.amountF = "";
            this.$router.push({
              path: "/orderManager"
            });
            // this.CbbProductShowApi();
          }
          this.thisShow = false;
        })
        .catch(() => {
          this.thisShow = false;
        });
    },
    add() {
      let collectDays = dayjs(this.detailInfo.create_time)
        .add(this.detailInfo.collect_days, "day")
        .format("YYYY-MM-DD");
      let nowDay = dayjs(new Date()).format("YYYY-MM-DD");
      if (+this.myAssetM.recharge < +this.detailInfo.minimum_amount) {
        Toast("余额不足");
        return;
      }
      if (nowDay == collectDays) {
        Toast("超过募集周期");
        return;
      }
      if (+this.amountF < +this.detailInfo.minimum_amount) {
        Toast(`${+this.detailInfo.minimum_amount}FIL起投`);
        return;
      }
      if (+this.amountF > +this.detailInfo.maximum_amount) {
        Toast(`最多可投${+this.detailInfo.maximum_amount}FIL`);
        return;
      }
      if (
        this.amountF >
        +(this.detailInfo.total - +this.detailInfo.collected_amount)
      ) {
        Toast(`超过产品剩余可投区间`);
        return;
      }
      if (
        +(this.detailInfo.total - this.detailInfo.collected_amount) <
        +this.detailInfo.minimum_amount
      ) {
        Toast(`产品结束`);
        return;
      }
      if (+this.amountF > +this.myAssetM.recharge) {
        Toast(`账户余额不足${this.amountF}`);
        return;
      }
      this.thisShow = true;
      this.password = "";
    },
    getMyBalanceApi() {
      myBalanceApi().then(res => {
        res.data.forEach(item => {
          if (item.asset === this.asset) {
            this.myAssetM = item;
            console.log(this.myAssetM);
          }
        });
      });
    },
    topUpPaw() {
      this.$router.push({
        path: "/myasset"
      });
    },
    CbbProductShowApi() {
      const postData = {
        id: this.id
      };
      CbbProductShow(postData).then(res => {
        console.log(res);
        if (res.ret === 200) {
          this.detailInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.intersetContent {
  margin: 10px;
  background: #fff;
  padding: 15px 20px;
  border-radius: 4px;
  .intersetContentP {
    color: #666666;
  }
  .intersetContentText {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .intersetContentTextNum {
      color: #666666;
    }
    .intersetContentTextJump {
      color: #f0ac25;
    }
  }
  .inputBorder {
    margin-top: 25px;
    border: 1px solid #949494;
    border-radius: 8px;
    padding: 12px;
    color: #333333;
    display: flex;
    align-items: center;
    .xian {
      margin: 0 5px;
      color: #c1c1c1;
    }
    input {
      flex: 1;
    }
  }
  .textRight {
    margin-top: 10px;
    text-align: right;
  }
}
.reminder {
  margin-left: 30px;
  color: #666666;
}
.ButtonClick {
  padding: 15px;
  text-align: center;
  background: #f9a03e;
  margin: 100px 20px 0;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
}
.buy-centent {
  padding: 16px 30px;
  .recharge {
    font-size: 12px;
    color: #f9a03e;
  }
  .buy-centent-flex {
    display: flex;
    justify-content: space-between;
  }
}
</style>
