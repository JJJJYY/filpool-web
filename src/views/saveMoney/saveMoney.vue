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
          <div>
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
        @click="titleSelect = 1"
        :class="['titleSelectOn', titleSelect === 1 ? 'activeSelectTitle' : '']"
      >
        募集中(54)
      </div>
      <div
        @click="titleSelect = 2"
        :class="['titleSelectOn', titleSelect === 2 ? 'activeSelectTitle' : '']"
      >
        收益中(54)
      </div>
      <div
        @click="titleSelect = 3"
        :class="['titleSelectOn', titleSelect === 3 ? 'activeSelectTitle' : '']"
      >
        已结算(54)
      </div>
    </div>
    <div class="cententBox"></div>
    <div class="cententBox"></div>
    <FootBox></FootBox>
  </div>
</template>

<script>
import FootBox from "@/components/FootBox";
export default {
  name: "saveMoney",
  components: {
    FootBox
  },
  data() {
    return {
      select: 0,
      eyeSelect: true,
      titleSelect: 1
    };
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
  margin: 0 10px 10px 10px;
  height: 134px;
  background: #fff;
  border-radius: 4px;
}
</style>
