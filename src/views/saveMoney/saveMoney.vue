<template>
  <div>
    <div class="headCentent">
      <div class="cententselect">
        <div
          @click="select = 0"
          :class="['cententselect-1', select === 0 ? 'activeSelect' : '']"
        >
          活期
        </div>
        <div>|</div>
        <div
          @click="select = 1"
          :class="['cententselect-2', select === 1 ? 'activeSelect' : '']"
        >
          定期
        </div>
      </div>
      <div class="cententData">
        <div class="cententDataNum">
          <div>
            FIL定期存款总额
            <img
              @click="eyeSelect = true"
              v-if="!eyeSelect"
              class="eyeImage"
              src="../../assets/img/moneyManagement/eye1.png"
              alt=""
            />
            <img
              v-if="eyeSelect"
              @click="eyeSelect = false"
              class="eyeImage"
              src="../../assets/img/moneyManagement/eye.png"
              alt=""
            />
          </div>
          <div @click="$router.push('/orderManager')">
            定期记录
            <img
              class="detailImage"
              src="../../assets/img/detail-jump.png"
              alt=""
            />
          </div>
        </div>
        <div v-if="eyeSelect" class="cententDataNumBi">47.000000</div>
        <div v-if="!eyeSelect" class="cententDataNumBi">******</div>
      </div>
    </div>
    <div class="titleSelect">
      <div
        @click="titleSelect = item.status"
        :class="[
          'titleSelectOn',
          titleSelect === item.status ? 'activeSelectTitle' : ''
        ]"
        v-for="item in agg"
        :key="item.status"
      >
        {{ item.name }}({{ item.num }})
      </div>
    </div>
    <div class="cententBox" v-for="(x, index) in saveMoneyList" :key="index">
      <div v-if="titleSelect === 2" class="cententBoxTitlejump2">
        <img src="../../assets/img/moneyManagement/shouyi.png" alt="" />
      </div>
      <div v-if="titleSelect === 3" class="cententBoxTitlejump2">
        <img src="../../assets/img/moneyManagement/profit.png" alt="" />
      </div>
      <div class="cententBoxTitle">
        <div class="cententBoxTitleIcon">
          <img src="../../assets/img/moneyManagement/fil.png" alt="" />
          <p class="Filecoin">Filecoin</p>
          <p class="xian">|</p>
          <p>{{ x.tittle }}</p>
        </div>
        <div
          @click="jumpDetail(x.id)"
          v-if="titleSelect === 1"
          class="cententBoxTitlejump"
        >
          <p>产品详情</p>
          <img src="../../assets/img/moneyManagement/jiantou.png" alt="" />
        </div>
      </div>
      <div class="boxCentent">
        <div class="boxCententAlign">
          <p class="boxCententText">{{ x.earning_rate }}%</p>
          <p class="boxCententTwoP">预计年化</p>
        </div>
        <div class="xian"></div>
        <div class="boxCententAlign">
          <p>
            限购{{ x.minimum_amount | parseFloatFilter }}-{{
              x.maximum_amount | parseFloatFilter
            }}{{ x.pay_coin }}
          </p>
          <p class="boxCententTwoP">存币周期{{ x.last_days }}天</p>
        </div>
      </div>
      <van-progress
        :color="titleSelect <= 1 ? '#F9A03E' : '#B0B0B0'"
        :percentage="done((-x.collected_amount / -x.total) * 100, 2)"
      />
    </div>
    <FootBox></FootBox>
  </div>
</template>

<script>
import FootBox from "@/components/FootBox";
import { Progress } from "vant";
import { CbbProduct } from "@/net/api/userInfoApi";
export default {
  name: "saveMoney",
  components: {
    FootBox,
    [Progress.name]: Progress
  },
  data() {
    return {
      select: 0,
      eyeSelect: true,
      titleSelect: 1,
      agg: "",
      saveMoneyList: ""
    };
  },
  watch: {
    titleSelect: function() {
      this.cbbProductApi();
    }
  },
  created() {
    this.cbbProductApi();
  },
  methods: {
    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    cbbProductApi() {
      const postData = {
        status: this.titleSelect
      };
      CbbProduct(postData).then(res => {
        console.log(res);
        if (res.ret === 200) {
          this.agg = res.data.agg;
          this.saveMoneyList = res.data.list;
        }
      });
    },
    jumpDetail(id) {
      this.$router.push({
        path: "/saveMoneyDetail",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.headCentent {
  background: #f7a910;
  overflow: auto;
  .cententselect {
    width: 126px;
    height: 27px;
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    margin: 0 auto;
    margin-top: 24px;
    color: #fff;
    .activeSelect {
      color: #fff !important;
      font-weight: 500;
    }
    .cententselect-1 {
      color: #feeac4;
      text-align: center;
      flex-grow: 1;
    }
    .cententselect-2 {
      color: #feeac4;
      text-align: center;
      flex-grow: 1;
    }
  }
  .cententData {
    padding: 25px 15px;
    color: #fff;
    .cententDataNum {
      display: flex;
      justify-content: space-between;
      .detailImage {
        width: 8px;
        height: 8px;
        margin-left: 4px;
      }
      .eyeImage {
        margin-left: 6px;
        width: 16px;
        height: 14px;
      }
    }
    .cententDataNumBi {
      margin-top: 12px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.titleSelect {
  display: flex;
  justify-content: space-between;
  margin: 0 20px 14px 20px;

  border-bottom: 1px solid #e5e5e5;
  .titleSelectOn {
    line-height: 35px;
    font-size: 14px;
  }
  .activeSelectTitle {
    color: #f9a03e;
    border-bottom: 2px solid #f7a90d;
  }
}
.cententBox {
  position: relative;
  margin: 0 10px 10px 10px;
  // height: 134px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  .cententBoxTitlejump2 {
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 60px;
      height: 70px;
    }
  }
  .boxCentent {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;
    margin-bottom: 30px;
    .boxCententAlign {
      text-align: center;
      .boxCententText {
        font-weight: bold;
      }
      .boxCententTwoP {
        margin-top: 8px;
      }
    }

    .xian {
      height: 30px;
      width: 1px;
      background: #e9e9e9;
    }
  }
  .cententBoxTitle {
    display: flex;
    justify-content: space-between;
    .cententBoxTitleIcon {
      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
      display: flex;
      align-items: center;
      p {
        margin-right: 15px;
      }
      .Filecoin {
        font-weight: bold;
      }
      .xian {
        color: #dadada;
      }
    }
    .cententBoxTitlejump {
      display: flex;
      align-items: center;
      img {
        width: 8px;
        height: 8px;
        margin-left: 5px;
      }
    }
  }
}
</style>
