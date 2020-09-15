<template>
  <div style="background: white; min-height: 100%">
    <head-nav></head-nav>
    <div class="header">
      <img src="../../assets/img/transaction_details_icon_successful.png" alt class="icon" />
      <div class="state">{{$route.query.statusDesc}}</div>
      <div class="amount">{{item.amount}} {{item.asset}}</div>
    </div>
    <div class="hr"></div>
    <div class="detail">
      <div class="row">
        <div class="title">类型</div>
        <div class="content">{{$route.query.isTopUp ? '充币' : '提币'}}</div>
      </div>
      <div class="row">
        <div class="title">充币地址</div>
        <div class="content">{{item.formAddress || '---'}}</div>
      </div>
      <div class="row">
        <div class="title">提币地址</div>
        <div class="content">{{item.address}}</div>
      </div>
      <div class="row">
        <div class="title">区块号</div>
        <div class="content">{{item.hash}}</div>
      </div>
      <div class="row">
        <div class="title">交易时间</div>
        <div class="content">{{item.createTime}}</div>
      </div>
      <div class="qr" ref="qrCodeUrl" />
    </div>
    <div class="url" @click="toBlockExplore">到区块浏览器查询详细信息</div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import HeadNav from "@/components/HeadNav";

export default {
  name: "TopupExtractRecodeDetail",
  components: {
    HeadNav,
  },
  data() {
    return {
      isTopUp: this.$route.query.isTopUp,
      item: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {},
    addOrWithdrawal(data) {
      return this.isTopUp === "true"
        ? rechargeRecordApi(data)
        : withdrawalApi(data);
    },
    toBlockExplore() {
      window.location.href = `https://www.blockchain.com/eth/tx/${this.item.hash}`;
    },
    createQr() {
      let url = `https://www.blockchain.com/eth/tx/${this.item.hash}`;
      new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 100,
        height: 100,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.header {
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    @include size(67px);
    margin-top: 32px;
  }

  .state {
    color: $h3-color;
    font-size: 13px;
    margin-top: 8px;
  }

  .amount {
    color: $main-color;
    font-size: 22px;
    font-weight: bold;
    margin-top: 14px;
  }
}

.hr {
  border-bottom: 1px $divider-color dashed;
  margin: 22px 16px 0;
}

.detail {
  padding: 0 18px;
  position: relative;

  .row {
    margin-top: 18px;
    max-width: 75%;

    .title {
      color: $h3-color;
      font-size: 13px;
    }

    .content {
      margin-top: 10px;
      color: $h2-color;
      font-size: 14px;
    }
  }

  .qr {
    position: absolute;
    right: 16px;
    bottom: -56px;
  }
}

.url {
  color: $main-color;
  font-size: 12px;
  text-align: center;
  margin-top: 80px;
}
</style>
