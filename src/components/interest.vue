<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="intersetContent">
      <h2>存币生息</h2>
      <p class="intersetContentP">剩余额度：1000FIL</p>
      <div class="intersetContentText">
        <p class="intersetContentTextNum">充提账户余额： 0.001FIL</p>
        <p class="intersetContentTextJump">去充值</p>
      </div>
      <div class="inputBorder">
        <div>金额</div>
        <div class="xian">|</div>
        <input type="text" placeholder="70FIL起投，最多可投1000FIL" />
        <div>FIL</div>
      </div>
      <div class="textRight">
        预计收益≈0.25FIL
      </div>
    </div>
    <div class="reminder">
      温馨提示：仅充提账户余额可进行参与存币宝
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
            >确认</van-button
          >
        </div>
      </div>
    </van-popup>
    <div @click="thisShow = true" class="ButtonClick">
      立即参与
    </div>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, List, Progress, Divider, button, field } from "vant";
// import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
// import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import {} from "@/net/api/userInfoApi";

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
    [field.name]: field
  },
  data() {
    return {
      thisShow: false,
      password: ""
    };
  },
  created() {},
  methods: {
    topUpPaw() {
      this.$router.push({
        path: "/myasset"
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
