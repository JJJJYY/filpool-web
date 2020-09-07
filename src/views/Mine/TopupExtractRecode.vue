<template>
  <div>
    <head-nav :title="$route.meta.title"></head-nav>
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据">
      <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
        <div class="item" style="align-items: flex-start;">
          <div class="key">数量</div>
          <div class="val">{{x.amount}}</div>
        </div>
        <div class="item" style="align-items: center;">
          <div class="key">状态</div>
          <div class="val">{{statusDesc(x.status)}}</div>
        </div>
        <div class="item" style="align-items: flex-end;">
          <div class="key">时间</div>
          <div class="val">{{time(new Date(x.createTime))}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {List} from "vant";
  import dayjs from 'dayjs';
  import HeadNav from '@/components/HeadNav';

  export default {
    name: "TopupExtractRecode",
    components: {
      HeadNav,
      [List.name]: List
    },
    data() {
      return {
        page: 1,
        loading: false,
        finished: false,
        list: []
      }
    },
    created() {
      this.$route.meta.title = this.$route.query.isTopUp ? '充币记录' : '提币记录'
    },
    methods: {
      onLoad() {
        this.loading = true;
        let url = this.$route.query.isTopUp ? '/asset/rechargeRecord' : '/asset/withdrawRecord';
        this.$http.post(url, {
          asset: this.$route.query.asset,
          pageNo: this.page,
          pageSize: 20
        }).then(response => {
          let newList = response.data || []
          this.list = this.page === 1 ? newList : this.list.concat(newList)
          this.page += 1
          this.finished = (newList.length === 0)
        }).catch(() => this.finished = true).finally(() => {
          this.loading = false
        })
      },
      statusDesc(i) {
        switch (i) {
          case 'CANCELLED':
            return '取消';
          case 'finish':
            return '完成';
          case 'refuse':
            return '失败';
          case 'pending':
            return '正在处理'
        }
      },
      time(date) {
        return dayjs(date).format('MM-DD HH:mm:ss')
      },
      detail(item) {
        this.$router.push({
          path: '/topupExtractRecodeDetail',
          query: {
            item: item,
            isTopUp: this.$route.query.isTopUp,
            statusDesc: this.statusDesc(item.status)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .cell {
    display: grid;
    padding: 14px 16px;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 8px;
    background: $content-backgroun-color;

    .item {
      display: flex;
      flex-direction: column;

      .key {
        font-size: 12px;
        color: $h3-color;
      }

      .val {
        font-size: 14px;
        color: $h2-color;
        margin-top: 8px;
      }
    }
  }
</style>
