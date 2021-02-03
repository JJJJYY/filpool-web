<template>
  <div class="assets">
    <head-nav></head-nav>
    <van-pull-refresh
      class="page-container"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <MyAssetCell
        @topup="
          $router.push({ path: '/currencyTopup', query: { asset: x.asset } })
        "
        @extract="showHint(x.asset)"
        v-for="x in list"
        :key="x.asset"
        :item="x"
        :bgc="
          x.asset === 'FIL'
            ? 'linear-gradient(85deg, #43B5BD 0%, #3ACCD5 100%)'
            : 'linear-gradient(85deg, #f0ad29 0%, #f1ba4d 100%)'
        "
        :bColor="x.asset === 'FIL' ? '#38B6BE' : '#FF8807'"
        style="margin-top: 0; margin-bottom: 8px"
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import MyAssetCell from "@/views/Mine/MyAssetCell";
import { PullRefresh, Dialog } from "vant";
import HeadNav from "@/components/HeadNav";
import {
  assetTypeApi,
  myBalanceApi,
  totalLockedFIL
} from "../../net/api/userInfoApi";
export default {
  name: "MyAsset",
  data() {
    return {
      isLoading: false,
      list: [],
      type: "",
      totalFIL: ""
    };
  },
  created() {
    this.onRefresh();
    totalLockedFIL().then(res => {
      if (res.ret === 200) {
        this.totalFIL = res.data;
      }
    });
  },
  components: {
    HeadNav,
    MyAssetCell,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    showHint(asset) {
      if (asset == "FIL") {
        Dialog.alert({
          title: "提示",
          message:
            "FILPool矿池每天12：00发放上一日挖矿收益，如用户选择不提币，则可用资产将用于FILPool矿池第二天算力增长所需的质押币。 由于目前需要质押币才能保持算力稳定增长，如用户提币导致账户质押币不足将影响您的算力增长以及次日挖矿收益。",
          showCancelButton: true
        }).then(() => {
          this.$router.push({
            path: "/currencyExtract",
            query: { asset: asset }
          });
        });
      } else {
        this.$router.push({
          path: "/currencyExtract",
          query: { asset: asset }
        });
      }
    },
    isMyAsset(x) {
      if (x.asset === "FIL") {
        return {
          ...x,
          // 展示资产
          myAsset: [
            {
              isAsset: "收益通证>>",
              jump: 1, // 跳转可用
              num: parseFloat(x.available),
              icon: false,
              totalMoney: true
            },
            {
              isAsset: "充提通证>>",
              jump: 1, // 跳转可用
              num: parseFloat(x.recharge),
              icon: false,
              totalMoney: true
            },
            {
              isAsset: "借贷通证>>",
              jump: 2, // 跳转借贷
              num: parseFloat(x.totalLoan),
              icon: false,
              totalMoney: false
            },
            {
              isAsset: "冻结通证",
              jump: false,
              num: x.frozen,
              icon: "每天线性释放，释放周期180天",
              totalMoney: true
            },
            {
              isAsset: "质押通证",
              jump: false,
              num: x.pledged,
              icon: "质押通证用于有效算力增长",
              totalMoney: true
            },
            {
              isAsset: "联合挖矿",
              jump: false,
              num: this.totalFIL,
              icon: false,
              totalMoney: true
            }
          ]
        };
      } else {
        return {
          ...x,
          // 展示通证
          myAsset: [
            {
              isAsset: "充提通证>>",
              jump: 1, // 跳转可用
              num: parseFloat(x.recharge),
              icon: false,
              totalMoney: true
            },
            {
              isAsset: "冻结通证",
              jump: false,
              num: x.frozen,
              icon: false,
              totalMoney: true
            }
            // {
            //   isAsset: "质押",
            //   num: x.pledged,
            //   icon: "质押通证用于有效算力增长"
            // }
          ]
        };
      }
    },
    onRefresh() {
      Promise.all([assetTypeApi(), myBalanceApi()])
        .then(res => {
          let res0 = res[0];
          let res1 = res[1];
          if (res0.ret && res1.ret) {
            let coins = res1.data || [];
            let assetList = coins.map(item => {
              res0.data.forEach(item1 => {
                if (item.asset === item1.asset) {
                  item.withdraw = item1.withdraw;
                  item.deposit = item1.deposit;
                  item.type = item1.type;
                }
              });
              let newItem = this.isMyAsset(item);
              return newItem;
            });
            this.list = assetList;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
