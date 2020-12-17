<template>
  <div class="list">
    <head-nav></head-nav>
    <div class="power page-container">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        style="min-height: 100vh;"
        :disabled="disablePull"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <CalcPowerItem :good-data="item" @select="onSelect"></CalcPowerItem>
        </div>
        <van-popup
          v-model="show"
          position="bottom"
          closeable
          :safe-area-inset-bottom="true"
        >
          <CalcPowerBuyPopup
            v-on:dismiss="show = false"
            :number="number"
            :item="selectedItem"
            v-on:enterOrder="buySubmit"
            @changeNumber="onSelect"
          />
        </van-popup>
      </van-pull-refresh>
    </div>
    <foot-box></foot-box>
  </div>
</template>

<script>
import CalcPowerBuyPopup from "./CalcPowerBuyPopup";
import { List, Popup, PullRefresh } from "vant";
import CalcPowerItem from "./CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import FootBox from "@/components/FootBox";
import { getGoodListApi } from "@/net/api/homeApi";
import { orderApi } from "@/net/api/userInfoApi";

export default {
  components: {
    HeadNav,
    FootBox,
    CalcPowerItem,
    CalcPowerBuyPopup,
    [Popup.name]: Popup,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  created: function() {
    this.onRefresh();
  },
  data() {
    return {
      title: "云计算",
      show: false,
      refreshing: false,
      list: [],
      selectedItem: {},
      number: 1,
      disablePull: false
    };
  },
  mounted() {
    if (this.$isH5) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  activated() {},
  deactivated() {
    this.onRefresh();
  },
  methods: {
    handleScroll() {
      this.disablePull =
        document.documentElement.scrollTop !== 0 ||
        document.body.scrollTop !== 0;
    },
    onSelect(item) {
      this.selectedItem = Object.assign({}, item);
      this.number = this.selectedItem.amount;
      this.show = true;
    },
    buySubmit(item) {
      /// 确认订单
      this.show = false;
      /// 下单
      const postData = {
        id: item.id,
        asset: "USDT",
        quantity: item.amount
      };
      orderApi(postData).then(res => {
        if (res.ret === 200) {
          this.$router.push({
            path: "/countPay",
            query: {
              amount: item.price * item.amount,
              id: res.data
            }
          });
        }
      });
    },
    onRefresh() {
      getGoodListApi()
        .then(res => {
          this.list = res.data;
        })
        .finally(() => (this.refreshing = false));
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";
.list {
  background-color: #eeeaed;
}
.power {
  height: calc(100vh - 96px);
}
.item {
  .name {
    display: flex;
    align-items: center;

    h3 {
      color: $h1-color;
      font-size: 15px;
      font-weight: bold;
      margin: 0;
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

  .subtitle {
    margin-top: 6px;
    font-size: 12px;
    color: $h3-color;
  }

  .intro {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &-item {
      display: flex;
      margin-top: 12px;

      &-title {
        font-size: 13px;
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
      font-weight: bold;
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
  }

  .tag {
    color: #fff;
    font-size: 11px;
    padding: 4px 6px;
    background: $main-color;
    position: absolute;
    border-radius: 0 0 0 2px;
    top: 0;
    right: 0;
  }
}
</style>
