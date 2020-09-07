<template>
  <div class="enter-pop">
    <div class="title">
      <h3>确认订单</h3>
    </div>
    <van-divider style="margin: 0;"/>
    <div class="item">
      <div class="key">合约名称：</div>
      <div class="value">{{item.name}}</div>
    </div>
    <div class="item">
      <div class="key">合约期限：</div>
      <div class="value">{{item.contractDuration}}天（自Filecoin主网上线后发放收益之日起开始计算；后两年需按矿池届时收费标准续费)</div>
    </div>
    <div class="item">
      <div class="key">技术服务费：</div>
      <div class="value">{{item.serviceChargeRate*100}}%（从挖矿收益中直接扣除）</div>
    </div>
    <div class="item">
      <div class="key">结算周期：</div>
      <div class="value">{{item.settlementPeriod}}</div>
    </div>
    <div class="item">
      <div class="key">单价：</div>
      <div class="value">${{item.price}}/{{item.unit}}</div>
    </div>
    <div class="item">
      <div class="key" style="display: flex;align-items: center;">购买数量：</div>
      <div class="number">
        <AddSubtractBox v-model="orderNum" :limit="item.minLimit"/>
      </div>
    </div>
    <van-divider style="margin: 24px 0;"/>
    <div class="item" style="margin-top: 0;">
      <div class="key">总计金额</div>
      <!--<div class="amount">{{orderNum*item.price}} USDT</div>-->
      <div class="amount">
        <span style="font-size: 24px;">{{orderNum*item.price}} </span>
        <span style="font-size: 18px;">USDT</span>
      </div>
    </div>
    <div class="prot">
      <!--<div class="dot" :class="{selected: agree}" @click="agree = !agree"></div>
      <p>
        <span>我已阅读并同意</span>
        <span style="color: #e49c3a;" @click="showAircle">《 用户云算力租赁协议》</span>
      </p>-->
      <van-checkbox v-model="agree" checked-color="#e49c3a" icon-size="13px" shape="square">
        <span style="font-size: 13px;color: #575c62;">我已阅读并同意</span>
        <span style="font-size: 13px;color: #e49c3a;" @click.stop="showAircle">《 用户云算力租赁协议》</span>
      </van-checkbox>
    </div>
    <button class="btn-gradient" @click="buy">立即购买</button>
  </div>
</template>

<script>
  import {Divider, Toast, Checkbox} from 'vant';
  import AddSubtractBox from '../../components/AddSubtractBox'
  //import {createWebview} from "@/utils/utilTools";

  export default {
    components: {
      [Divider.name]: Divider,
      [Checkbox.name]: Checkbox,
      AddSubtractBox
    },
    props: {
      item: {},
      number: Number
    },
    data() {
      return {
        agree: false,
        orderNum: this.number
      }
    },
    watch: {
      number: function (val) {
        this.orderNum = val;
      }
    },
    methods: {
      buy() {
        if (!this.agree) {
          Toast('请阅读并同意用户云算力租赁协议');
          return
        }
        this.$emit('enterOrder', Object.assign({}, this.item, {amount: this.orderNum}));
      },
      /*查看用户协议*/
      showAircle () {
        /*this.$http.get("https://www.filpool.io/general/access/bottom?key=service").then((res) => {
          console.log(res.content)
        });*/
        this.$router.push({
          path: "/ServiceDetail"
        })
        /*let webview = createWebview('https://www.filpool.io/user/xieyi.html', 'xieyi', {titleText: '用户协议'});
        webview.show('slide-in-right');
        this.$store.commit("setWebview", webview);*/
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/base.scss';

  .enter-pop {
    width: 100%;
    padding: 0 16px 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .title {
      display: flex;
      align-items: center;
      padding: 16px;
      // justify-content: center;
      h3 {
        font-size: 16px;
        color: $h2-color;
        text-align: center;
        width: 70%;
        margin-left: 15%;
      }

      button {
        width: 15%;

        img {
          width: 22px;
          float: right;
        }
      }
    }

    .item {
      display: flex;
      margin-top: 22px;
      justify-content: space-between;
      align-items: center;
      .key {
        width: 30%;
        color: $h3-color;
        font-size: 13px;
      }

      .value {
        flex: 1;
        text-align: end;
        color: $h2-color;
        font-size: 14px;
      }

      .number {
        color: $main-color;
      }

      .amount {
        font-size: 18px;
        font-weight: bold;
        color: $main-color;
        text-align: end;
      }
    }

    .prot {
      display: flex;
      align-items: center;
      margin-top: 22px;
      .dot {
        @include size(12px);
        border: 1px $divider-color solid;
        background: #fff;
        border-radius: 2px;
        margin-right: 6px;
      }

      .selected {
        background: $main-color;
      }

      p {
        color: $h3-color;
        font-size: 12px;
      }
    }

    .btn-gradient {
      width: 80%;
      height: 44px;
      border-radius: 22px;
      align-self: center;
      margin-top: 24px;
    }
  }
</style>
