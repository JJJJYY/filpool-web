<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <head-nav></head-nav>
    <van-tabs sticky color="#E9901D">
      <van-tab title="算力管理">
        <div class="list page-container" style="margin-top: 1px">
          <div
            class="cell"
            v-for="(x, index) in list"
            :key="index"
            @click="detail(x)"
          >
            <div class="type">
              {{ typeDescription(x.type, x.serviceChargeRate) }}
            </div>
            <div class="total">{{ x.quantity | parseFloatFilter }} TB</div>
            <div class="detail">明细</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="算力收益">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <div class="list page-container" style="margin-top: 1px">
            <div class="cell" v-for="(x, index) in profitList" :key="index">
              <div class="type">
                {{ x.number + "期--" + profitType(x.type) }}
              </div>
              <div class="total">
                <div>{{ x.quantity | parseFloatFilter }} {{ x.asset }}</div>
                <div style="color: #e17055; font-size: 12px">
                  (已扣除服务费)
                </div>
              </div>
              <div class="detail-time">{{ timeStr(x.createTime) }}</div>
            </div>
          </div>
        </van-list>
        <!-- <div
          style="color: #86929D; font-size: 13px; text-align: center; height: 100%; margin-top: 60%; line-height: 160%;"
        >
          <div style="display: inline-block;text-align: left;">
            您所持有的算力收益，将从Filecoin主网上线后
            <br />正式挖矿并发放收益之日开始计算。
            <br />敬请期待！
          </div>
        </div> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import HeadNav from "@/components/HeadNav";
import dayjs from "dayjs";
import { myWeightGroupApi, userIncomeApi } from "@/net/api/userInfoApi";
export default {
  name: "CalcPowerManager",
  data() {
    return {
      list: [],
      profitList: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  components: {
    HeadNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onLoad() {
      const postData = {
        page: this.page,
        count: 10,
      };
      userIncomeApi(postData)
        .then((res) => {
          if (res.ret === 200) {
            let newList = res.data;
            if (res.data.length) {
              this.profitList =
                this.page === 1 ? newList : this.profitList.concat(newList);
              this.page += 1;
            } else {
              this.finished = true;
            }
          }
        })
        .catch(() => (this.finished = true))
        .finally(() => (this.loading = false));
    },
    loadData() {
      myWeightGroupApi().then((res) => {
        this.list = res.data;
      });
    },
    profitType(type) {
      switch (type) {
        case 1:
          return "SR1奖励";
        case 2:
          return "挖矿收益";
        case 3:
          return "赠送收益";
        case 4:
          return "加速收益";
      }
    },
    typeDescription(x) {
      switch (x) {
        case 1:
          return "矿机租赁";
        case 2:
          return "赠送";
        case 3:
          return "兑换";
        case 4:
          return "推广奖励";
        case 5:
          return "注册赠送";
        case 6:
          return "活动奖励";
        case 7:
          return "矿机托管";
        case 8:
          return "推广奖励";
        default:
          return "其他";
      }
    },
    timeStr(date) {
      return dayjs(date).format("YYYY-MM-DD");
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
    align-items: center;
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
    .detail-time {
      font-size: 12px;
      text-align: right;
      color: #86929d;
    }
  }
}
</style>
