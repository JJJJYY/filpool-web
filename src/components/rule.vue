<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="ruleContent">
      <p>
        1.用户参与联合挖矿后，从次日零点开始计算挖矿时间，用户所申请当期联合挖矿周期结束后次日可赎回所投入通证及奖励；
      </p>
      <p>
        2.联合起投额度：1枚FIL；
      </p>
      <p>
        3.联合挖矿通证奖励结算以FIL进行结算，总计通证奖励=投入通证数量×预期年化收益率/365×挖矿天数；
      </p>
      <p>
        4.用户申请联合挖矿需先进行通证充币至“充提通证”或者将“收益通证”划转至“充提通证”，挖矿期间用户的联合挖矿通证将进入锁定状态，不可提前解锁或者赎回，一个联合挖矿周期结束后次日方可申请赎回。
      </p>
      <div>
        &nbsp;在法律允许的范围内，FILPool矿池拥有最终解释权。
      </div>
    </div>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, List, Progress, Divider } from "vant";
// import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
// import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import {} from "@/net/api/userInfoApi";

export default {
  name: "rule",
  components: {
    HeadNav,
    // CalcPowerItem,
    // CalcPowerBuyPopup,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Progress.name]: Progress,
    [Divider.name]: Divider
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.ruleContent {
  padding: 15px;
  p {
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  div {
    color: #666666;
    margin-top: 30px;
  }
}
</style>
