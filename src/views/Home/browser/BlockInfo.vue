<template>
  <div class="groupBox">
    <div class="group">
      <p class="label">区块高度</p>
      <p class="value">{{height}}</p>
    </div>
    <div class="group">
      <p class="label">全网算力</p>
      <p class="value">{{totalPower}}</p>
    </div>
    <div class="group">
      <p class="label">时空云（t01009）</p>
      <p class="value">{{minerPower}}</p>
    </div>
  </div>
</template>

<script>
import { formatNumber, bytesToSize } from "@/utils/utilTools";
import axios from "axios";
export default {
  name: "BlockInfo",
  data() {
    return {
      height: "0",
      totalPower: "0",
      minerPower: "0",
    };
  },
  created() {
    this.getBlockInfo();
    this.getPowerByMiner();
  },
  methods: {
    getBlockInfo() {
      // this.$http.get("/api/v1/info/base").then((res) => {
      //   this.height = formatNumber(res.data.height);
      //   this.totalPower = bytesToSize(res.data.total_power);
      // });
    },
    getPowerByMiner() {
      // this.$http.get(`/api/v1/account/info`, {address: "t01009"}).then((res) => {
      //   this.minerPower = bytesToSize(res.data.miner.raw_byte_power);
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
.groupBox {
  display: flex;
  padding: 24px 0;
  text-align: center;
  box-shadow: 0 0 20px rgba(212, 222, 236, 0.3);
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  min-height: 32px;
  box-sizing: border-box;
  .group {
    flex: 1;
    text-align: center;
    .label {
      font-size: 14px;
      color: #24375e;
    }
    .value {
      font-size: 16px;
      font-weight: bold;
      color: #24375e;
      margin-top: 10px;
    }
  }
}
</style>