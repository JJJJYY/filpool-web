<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="ruleContent">
      <p>
        1.计息结算规则：持币用户参与联合挖矿后，利息本期产品募集满或周期结束后次日零点开始计算。
      </p>
      <p>
        2.用户选择联合挖矿产品，存入FIL后，需在FIL锁定周期结束后结算本息，若需要提前结束存币锁定周期，则需线上申请，通过后退还本金，利息清零。
      </p>
      <p>3.存币起投额度: x枚FIL</p>
      <p>
        4.根据不同的联合挖矿产品锁定周期，锁定周期结束后，用户可以随时提取本金和利息。
      </p>
      <p>
        5.存币收益本息结算以FIL进行结算，总计收益=存币本金数量*（该期产品年化收益率/365）
      </p>
      <p>
        6.联合挖矿产品锁定周期结束后，系统将自动结算本息，并放入用户资产钱包。
      </p>
      <div>
        &nbsp;注意：联合挖矿是FILPool矿池上线的产品，属于风险投资方式，请投资者理性参与，谨防投资风险。FILPool矿池不对任何的行为承担担保、赔偿等责任；最终解释权归FILPool矿池所有。
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
