<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="ruleContent">
      <p>
        1.计息结算规则:持币用户参与存币宝后，利息本期产品募集结束的第二天零点开始计算。
      </p>
      <p>
        2.用户选择存币宝产品，存入FIL后，需在FIL锁定周期结束后结算本息，若需要提前结束存币锁定周期，则需线上申请，通过后退还本金，利息清零。
      </p>
      <p>3.存币起投额度: 1枚FIL</p>
      <p>
        4.根据不同的存币宝FIL锁定周期:
        30天、90天、180天、360天、540天。存币周期结束后，用户可以随时提取本金和利息。
      </p>
      <p>
        5.存币收益本息结算以FIL进行结算，总计收益=投入金额*年利率★(存币锁仓周期/
        365)
      </p>
      <div>
        注意:存币宝是FILPool矿池上线的FIL定期存币赚FIL的产品，属于风险投资方式,请投资者理性参与，谨防投资风险。FILPool矿
        池不对任何的投资行为承担担保、赔偿等责任;最终解释权归FILPool矿池所有。
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
