<template>
  <div class="assets">
    <head-nav></head-nav>
    <van-pull-refresh class="page-container" v-model="isLoading" @refresh="onRefresh">
      <MyAssetCell
        @topup="$router.push({path: '/currencyTopup', query: { asset: x.asset }})"
        @extract="$router.push({path: '/currencyExtract', query: { asset: x.asset }})"
        v-for="x in list"
        :key="x.asset"
        :item="x"
        style="margin-top: 0;margin-bottom: 8px;"
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import MyAssetCell from "@/views/Mine/MyAssetCell";
import { PullRefresh } from "vant";
import HeadNav from "@/components/HeadNav";
import { assetTypeApi, myBalanceApi } from "../../net/api/userInfoApi";
export default {
  name: "MyAsset",
  data() {
    return {
      isLoading: false,
      list: [],
      type: "",
    };
  },
  created() {
    this.onRefresh();
  },
  components: {
    HeadNav,
    MyAssetCell,
    [PullRefresh.name]: PullRefresh,
  },
  methods: {
    onRefresh() {
      Promise.all([assetTypeApi(), myBalanceApi()])
        .then((res) => {
          let res0 = res[0];
          let res1 = res[1];
          if (res0.ret && res1.ret) {
            let coins = res1.data || [];
            let assetList = coins.map((item) => {
              res0.data.forEach((item1) => {
                if (item.asset === item1.asset) {
                  item.withdraw = item1.withdraw;
                  item.deposit = item1.deposit;
                  item.type = item1.type;
                }
              });
              return item;
            });
            this.list = assetList;
            console.log(this.list);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
