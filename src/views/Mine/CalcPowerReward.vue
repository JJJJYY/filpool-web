<template>
  <div class="list">
    <head-nav :title="$route.query.title"></head-nav>
    <div class="page-container">
      <div class="cell" v-for="(x, index) in list" :key="index">
        <div class="name">{{x.relatedName | nameInfo}}</div>
        <div class="amount">{{x.quantity | parseFloatFilter}} {{x.unit}}</div>
        <div class="time">{{x.createTime}}</div>
        <div
          class="type"
        >{{$route.query.typeDescription}} {{(x.type == 1 || x.type == 7) ? x.serviceChargeRate == 0.2 ? "N" : "B" : ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from "vant";
import HeadNav from "@/components/HeadNav";
import { myWeightApi } from "@/net/api/userInfoApi";
export default {
  name: "CalcPowerReward",
  components: {
    HeadNav,
    [List.name]: List,
  },
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      myWeightApi({ type: this.$route.query.type }).then((res) => {
        this.list = res.data.details || [];
      });
    },
  },
  filters: {
    nameInfo: function (val) {
      if (!val) {
        return "其他";
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.list {
  .cell {
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 70% auto;
    background: $content-backgroun-color;
    border-bottom: 1px $divider-color solid;

    .name,
    .amount {
      color: $h1-color;
      font-size: 14px;
    }

    .time,
    .type {
      color: $h3-color;
      font-size: 12px;
      margin-top: 6px;
    }
  }
}
</style>
