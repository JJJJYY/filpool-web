<template>
  <div class="MinerRank">
    <p class="titleBox">
      <span class="td">排名</span>
      <span class="td" style="text-align: center;">算力</span>
      <span class="td" style="text-align: right;">矿工</span>
    </p>
    <ul class="rankList">
      <li v-for="(item, index) in minerList" :key="index">
        <span class="td">{{index+1}}</span>
        <span class="td" style="text-align: center;">{{item.raw_byte_power | formatSize}}</span>
        <span class="td" style="text-align: right;color:#2B0EA8;">{{item.miner}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { bytesToSize } from '@/utils/utilTools';
  export default {
    name: "MinerRank",
    data() {
      return {
        minerList: []
      }
    },
    created() {
      this.getMiners();
    },
    methods: {
      getMiners() {
        this.$http.get(`/api/v1/miner/top`).then((res) => {
          this.minerList = res.data.list.slice(0,10);
        })
      }
    },
    filters: {
      formatSize(size) {
        return bytesToSize(size)
      }
    }
  }
</script>

<style lang="scss" scoped>
.MinerRank{
  padding: 0 16px;
  background-color: #fff;
  min-height: 312px;
  .rankTitle{
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  .titleBox{
    line-height: 40px;
    font-size: 16px;
    padding: 0 16px;
    /*margin-top: 28px;*/
    background:rgba(242,135,20,0.1);
    .span{
      color: #9aa4b1;
    }
  }
  .rankList{
    line-height: 24px;
    /*height:450px;*/
    overflow: auto;
    padding: 0 16px;
    margin-top: 16px;
    &::-webkit-scrollbar-thumb{
      border-radius: 4px;
      background-color: #E9E9E9;
    }
    &::-webkit-scrollbar{
      width: 6px;
      height: 0;
    }
    .li{
      border-bottom: 1px solid #d4e6f2;
    }
  }
  .td{
    display: inline-block;
    width: 33.3%;
  }
}
</style>