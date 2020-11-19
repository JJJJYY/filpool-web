<template>
  <div class="tab-asset" v-if="list.length > 0">
    <div class="tab-centent">
      <div>金额</div>
      <div>
        <p
          style="
            height: 40px;
            font-size: 14px;
            color: #666666ff;
            margin-top: 15px;
            border-bottom: 1px solid #eaeaeaff;
          "
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
          style="
            height: 40px;
            font-size: 14px;
            color: #666666ff;
            margin-top: 15px;
            border-bottom: 1px solid #eaeaeaff;
          "
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
          style="
            height: 40px;
            font-size: 14px;
            color: #666666ff;
            margin-top: 15px;
            border-bottom: 1px solid #eaeaeaff;
          "
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.createTime }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "availableAssetsList",
  props: {
    list: Array,
  },
  methods: {
    typeText(x) {
      let thisName = null;
      this.dataType().map((val) => {
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
        { type: 2, name: "申请加速算力" },
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
        { type: 23, name: "质押金额返还至收益" },
        { type: 24, name: "挖矿收益" },
        { type: 25, name: "SR质押币发放" },
        { type: 26, name: "扣除质押币" },
        { type: 27, name: "充值划转质押" },
        { type: 28, name: "收益释放至质押" },
        { type: 29, name: "加速收益" },
        { type: 30, name: "25%加速收益释放" },
        { type: 31, name: "加速收益释放" },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
