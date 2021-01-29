<template>
  <div>
    <head-nav class="headNavStyle"></head-nav>
    <div class="container  list page-container">
      <div class="makeOverBox">
        <div class="makeOverContent">
          <div class="makeOverTitle">
            <span class="makeOverContentTitle">存币生息</span>
            <span class="makeOverContentTitleId"
              >定期ID（{{ orderInfo.auth_user_id }}）</span
            >
          </div>
          <div class="makeOverContentNum">
            <p>存币金额（FIL）</p>
            <p>{{ orderInfo.amount | parseFloatFilter }}</p>
          </div>
          <div class="makeOverContentNum">
            <p>预计年化</p>
            <p>{{ orderInfo.expected_earning_rate * 100 }}%</p>
          </div>
          <div class="makeOverContentNum">
            <p>预计利息（FIL）</p>
            <p>{{ orderInfo.expected_interest | parseFloatFilter }}</p>
          </div>
          <div class="makeOverContentTime">
            <p>存入时间：{{ orderInfo.purchase_time }}</p>
            <p>预计到期时间：{{ orderInfo.expected_end_time }}</p>
          </div>
        </div>
        <div class="makeOverList">
          <div
            class="makeOverListFor"
            v-for="(x, index) in ordersList"
            :key="index"
          >
            <div class="makeOverListForFlex">
              <p class="makeOverListForNum">{{ typeText(x.type) }}</p>
              <p class="makeOverListForNum">
                {{ x.amount | parseFloatFilter }}
              </p>
            </div>
            <div class="makeOverListForFlex">
              <p>{{ x.create_time }}</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="thisShow = true">申请转让</button>
      <p>温馨提示：提前转让只退还本金，利息清零</p>
    </div>
    <van-popup
      v-model="thisShow"
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <div class="buy-centent">
        <div style="margin-top: 20px">
          <p>资金密码：</p>
          <van-field
            style="width: 100%; background: #e6e6e6; border-radius: 8px;margin-top:10px"
            v-model="password"
            type="password"
            placeholder="请输入资金密码"
          />
        </div>
        <div class="buy-centent-flex" style="margin-top: 20px">
          <van-button
            style="background: #d0d0d0; color: #fff; padding: 0 40px"
            round
            @click="thisShow = false"
            >取消</van-button
          >
          <van-button
            style="background: #f9a03e; color: #fff; padding: 0 40px"
            @click="buOk"
            round
            >确认</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Popup,
  Tab,
  Tabs,
  List,
  Progress,
  Divider,
  field,
  button,
  Toast
} from "vant";
import HeadNav from "@/components/HeadNav";
import md5 from "md5";
import {
  CbbUserOrdersTransfer,
  CbbUserOrdersDetail,
  getCbbSeriesRecords
} from "@/net/api/userInfoApi";

export default {
  name: "makeOver",
  components: {
    HeadNav,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Progress.name]: Progress,
    [Divider.name]: Divider,
    [field.name]: field,
    [button.name]: button,
    [Toast.name]: Toast
  },
  data() {
    return {
      thisShow: false,
      password: "",
      id: this.$route.query.id,
      orderInfo: "",
      ordersList: ""
    };
  },
  created() {
    this.CbbUserOrdersDetailApi();
    this.getCbbSeriesRecordsApi();
  },
  methods: {
    buOk() {
      this.CbbUserOrdersTransferApi();
    },
    // 类型判断
    typeText(x) {
      let thisName = null;
      this.orederType().map(val => {
        if (val.type === x) {
          thisName = val.status;
        }
      });
      return thisName;
    },
    orederType() {
      return [
        { type: 1, status: "购入" },
        { type: 2, status: "转让" },
        { type: 3, status: "利息" },
        { type: 4, status: "到期" },
        { type: 5, status: "额外奖励" },
        { type: 6, status: "拒绝" }
      ];
    },
    getCbbSeriesRecordsApi() {
      const postData = {
        id: this.id
      };
      getCbbSeriesRecords(postData).then(res => {
        console.log(res);
        this.ordersList = res.data;
      });
    },
    CbbUserOrdersTransferApi() {
      const postData = {
        capital_pwd: md5(this.password),
        id: this.id
      };
      CbbUserOrdersTransfer(postData).then(res => {
        console.log(res);
        if (res.ret === 200) {
          Toast("已提交");
          this.$router.goBack();
        }
        this.thisShow = false;
      });
    },
    CbbUserOrdersDetailApi() {
      const postData = {
        id: this.id
      };
      CbbUserOrdersDetail(postData).then(res => {
        if (res.ret === 200) {
          this.orderInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.makeOverBox {
  margin-bottom: 100px;
  // background: #f6f6f6;
  // padding: 10px 0;
  .makeOverContent {
    margin: 10px;
    background: #fff;
    border-radius: 4px;
    padding: 14px 12px;
    .makeOverTitle {
      margin-bottom: 20px;
      .makeOverContentTitle {
        font-weight: 600;
        font-size: 14px;
        margin-right: 15px;
      }
      .makeOverContentTitleId {
        color: #666;
      }
    }
    .makeOverContentNum {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ededed;
    }
    .makeOverContentTime {
      margin-top: 15px;
      p {
        margin-top: 8px;
        color: #666666;
      }
    }
  }
  .makeOverList {
    padding: 20px;
    .makeOverListFor {
      padding: 8px 0;
      border-bottom: 1px solid #e4e4e4;
      .makeOverListForFlex {
        display: flex;
        justify-content: space-between;
        p {
          margin-top: 5px;
          color: #666666;
        }
        .makeOverListForNum {
          color: #333;
        }
      }
    }
  }
}
.footer {
  background: #fff;
  position: fixed;
  // height: 50px;
  width: 100%;
  left: 0px;
  bottom: 0px;
  text-align: center;
  button {
    padding: 8px 100px;
    margin: 15px auto;
    color: #fff;
    background: #f9a03e;
    border: none;
    border-radius: 8px;
  }
  p {
    color: #999999;
    margin-bottom: 15px;
  }
}
.buy-centent {
  padding: 16px 30px;
  .recharge {
    font-size: 12px;
    color: #f9a03e;
  }
  .buy-centent-flex {
    display: flex;
    justify-content: space-between;
  }
}
</style>
