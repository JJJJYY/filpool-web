<template>
  <div>
    <head-nav></head-nav>
    <div class="actual page-container">
      <div
        class="waitingBox"
        v-if="showActualStatus && userData.authStatus === 3"
      >
        <p class="waiting">您已提交实名认证，请耐心等待审核</p>
      </div>
      <div class="notPassBox" v-else-if="showActualStatus">
        <p class="waiting">实名认证失败</p>
        <button type="button" class="submit reSubmit" @click="reSubmit">
          重新提交
        </button>
      </div>
      <Actual v-else @submited="submited"></Actual>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Actual from "./Actual";
import HeadNav from "@/components/HeadNav";
export default {
  name: "index.vue",
  components: {
    HeadNav,
    Actual
  },
  data() {
    return {
      step: 1
    };
  },
  computed: {
    ...mapState(["userData"]),
    showActualStatus() {
      return (
        (this.userData.authStatus === 2 || this.userData.authStatus === 3) &&
        this.step !== 0
      );
    }
  },
  created() {
    this.$store.dispatch("reloadUserData");
  },
  methods: {
    reSubmit() {
      this.step = 0;
    },
    submited() {
      this.step = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.actual {
  color: #333333;
  .waitingBox {
    padding: 16px;
    text-align: center;
  }
  .waiting {
    color: #7a8290;
    margin-top: 50px;
  }
  .notPassBox {
    padding: 16px;
    text-align: center;
    .reSubmit {
      height: 40px;
      line-height: 40px;
      color: #fff;
      background: linear-gradient(
        90deg,
        rgba(241, 138, 45, 1) 0%,
        rgba(252, 177, 80, 1) 100%
      );
      border-radius: 16px;
      font-size: 16px;
      margin: 30px auto 60px;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
