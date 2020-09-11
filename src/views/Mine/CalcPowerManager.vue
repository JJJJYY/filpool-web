<template>
  <div style="height: 100%; display:flex; flex-direction: column;">
    <head-nav></head-nav>
    <van-tabs sticky color="#E9901D">
      <van-tab title="算力管理">
        <div class="list page-container" style="margin-top: 1px;">
          <div class="cell" v-for="(x, index) in list" :key="index" @click="detail(x)">
            <div class="type">{{typeDescription(x.type)}}</div>
            <div class="total">{{x.quantity}} TB</div>
            <div class="detail">明细</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="算力收益">
        <div
          style="color: #86929D; font-size: 13px; text-align: center; height: 100%; margin-top: 60%; line-height: 160%;"
        >
          <div style="display: inline-block;text-align: left;">
            您所持有的算力收益，将从Filecoin主网上线后
            <br />正式挖矿并发放收益之日开始计算。
            <br />敬请期待！
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import HeadNav from "@/components/HeadNav";
import { myWeightGroupApi } from "../../net/api/userInfoApi";
export default {
  name: "CalcPowerManager",
  data() {
    return {
      list: [],
    };
  },
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
  },
  created() {},
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      myWeightGroupApi().then((res) => {
        console.log(res);
        this.list = res.data;
      });
      // this.$http.get("/distribution/myWeightApp").then((response) => {
      //   this.list = response.data;
      // });
    },
    typeDescription(x) {
      switch (x) {
        case 1:
          return "矿机租赁（B）";
        /*case 2:
            return '赠送'
          case 3:
            return '兑换'
          case 5:
            return '注册送0.01TB算力'*/
        case 6:
          return "活动奖励";
        case 7:
          return "矿机托管";
        case 8:
          return "推广奖励";
        case 10:
          return "矿机租赁（N）";
        default:
          return "其他";
      }
    },
    detail(x) {
      this.$router.push({
        path: "/calcPowerReward",
        query: {
          title: this.typeDescription(x.type),
          type: x.type,
          typeDescription: this.typeDescription(x.type),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.header {
  display: flex;
  justify-content: space-around;
  height: 42px;
  background: $content-backgroun-color;
  align-items: center;
  border-bottom: 1px $divider-color solid;

  .item {
    color: $h3-color;
    font-size: 15px;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
  }

  .selected {
    color: $h1-color;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 2px solid $main-color;
  }
}

.list {
  flex: 1;
  height: calc(100vh - 90px);
  .cell {
    display: grid;
    padding: 18px 16px;
    color: $h2-color;
    font-size: 13px;
    grid-template-columns: repeat(3, 1fr);
    background: $content-backgroun-color;
    border-bottom: 1px $divider-color solid;

    .total {
      text-align: center;
    }

    .detail {
      color: $main-color;
      text-align: right;
    }
  }
}
</style>
