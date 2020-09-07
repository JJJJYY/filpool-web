<template>
  <div class="list">
    <head-nav :title="$route.query.title"></head-nav>
    <div class="page-container">
      <div class="cell" v-for="(x, index) in list" :key="index">
        <div class="name">{{x.relatedName}}</div>
        <div class="amount">{{x.quantity}} {{x.unit}}</div>
        <div class="time">{{x.createTimeByDate | formatDate}}</div>
        <div class="type">{{$route.query.typeDescription}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {List} from "vant";
  import HeadNav from '@/components/HeadNav';
  import { formatDate } from '@/utils/utilTools';
  export default {
    name: "CalcPowerReward",
    components: {
      HeadNav,
      [List.name]: List
    },
    data() {
      return {
        page: 1,
        list: [],
        loading: false,
        finished: false
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.$http.get('/distribution/myWeight', {
          type: this.$route.query.type
        }).then(response => {
          this.list = response.content.details || []
        })
      }
    },
    filters: {
      formatDate (val) {
        if (!val) {
          return "";
        }
        return formatDate(val, "yyyy-MM-dd hh:mm:ss");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .list {
    .cell {
      padding: 14px 16px;
      display: grid;
      grid-template-columns: 70% auto;
      background: $content-backgroun-color;
      border-bottom: 1px $divider-color solid;

      .name, .amount {
        color: $h1-color;
        font-size: 14px;
      }

      .time, .type {
        color: $h3-color;
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
</style>
