<template>
  <div class="list">
    <head-nav></head-nav>
    <div
      class="cell"
      v-for="(x, index) in list"
      :key="index"
      @click="select(x)"
    >
      <img :src="x.icon" alt class="icon" />
      <div class="name">{{ x.type ? `${x.asset}(${x.type})` : x.asset }}</div>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { assetTypeApi } from "../../net/api/userInfoApi";
export default {
  name: "CurrencySelect",
  components: {
    HeadNav
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      assetTypeApi().then(res => {
        this.list = res.data.filter(item => {
          if (this.$route.query.isTopUp === "true") {
            return item.deposit === 1;
          } else {
            return item.withdraw === 1;
          }
        });
      });
    },
    select(x) {
      let isTopUp = this.$route.query.isTopUp;
      this.$router.replace({
        path: isTopUp === "true" ? "/currencyTopup" : "/currencyExtract",
        query: {
          asset: x.asset
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";

.list {
  .cell {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px #eee solid;
    background: $content-backgroun-color;

    .icon {
      @include size(22px);
    }

    .name {
      margin-left: 12px;
      font-size: 14px;
    }
  }
}
</style>
