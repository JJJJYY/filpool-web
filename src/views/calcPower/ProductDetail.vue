<template>
  <div class="ProductDetail">
    <head-nav></head-nav>
    <div class="container page-container">
      <div class="goodBox">
        <CalcPowerItem :good-data="detailInfo" @select="onSelect" style="margin-top: 0;" />
      </div>
      <div class="detail">
        <p class="label">合约详情</p>
        <div class="content" v-html="detailInfo.contractDetails"></div>
      </div>
      <van-popup v-model="show" position="bottom" closeable :safe-area-inset-bottom="true">
        <calc-power-buy-popup
          v-on:dismiss="show=false"
          :number="number"
          :item="detailInfo"
          v-on:enterOrder="buySubmit"
          @changeNumber="onSelect"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Popup } from "vant";
import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import { goodGetApi, orderApi } from "@/net/api/userInfoApi";
export default {
  name: "ProductDetail",
  components: {
    HeadNav,
    CalcPowerItem,
    CalcPowerBuyPopup,
    [Popup.name]: Popup,
  },
  data() {
    return {
      show: false,
      detailInfo: {},
      number: this.$route.params.amount || 1,
    };
  },
  created() {
    this.getDetailById();
  },
  methods: {
    /*根据id获取详情*/
    getDetailById() {
      let rateId = this.$route.params.id || this.$route.query.id;
      const postData = {
        id: rateId,
      };
      goodGetApi(postData).then((res) => {
        this.detailInfo = res.data;
      });
    },
    buySubmit(item) {
      /// 确认订单
      this.show = false;
      /// 下单
      const postData = {
        id: item.id,
        asset: "USDT",
        quantity: item.amount,
      };
      orderApi(postData).then((res) => {
        if (res.ret === 200) {
          this.$router.push({
            path: "/countPay",
            query: {
              amount: item.price * item.amount,
              id: res.data,
            },
          });
        }
      });
    },
    onSelect(item) {
      this.selectedItem = Object.assign({}, item);
      this.number = this.selectedItem.amount;
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.ProductDetail {
  .container {
    /*height: calc(100vh - 62px);
    overflow: auto;*/
  }
  .detail {
    padding: 16px;
    margin-top: 8px;
    background-color: #fff;
    .label {
      margin-bottom: 16px;
    }
    .content {
      line-height: 26px;
    }
  }
}
</style>