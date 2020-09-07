<template>
  <div>
    <head-nav :styles="{marginBottom: 0}"></head-nav>
    <div class="page-container">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据">
        <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
          <div class="title">{{x.title}}</div>
          <img class="cover" :src="x.image" alt="">
          <div class="time">{{x.createTime}}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {List} from "vant";
  import HeadNav from '@/components/HeadNav';

  export default {
    name: "Classroom",
    components: {
      HeadNav,
      [List.name]: List
    },
    data() {
      return {
        loading: false,
        finished: false,
        list: [],
        page: 1
      }
    },
    methods: {
      onLoad() {
        this.$http.post('/message/getInfoList', {
          type: 3,
          pageNo: this.page,
          pageSize: 10
        }).then(response => {
          let newList = response.data || []
          this.list = this.page === 1 ? newList : this.list.concat(newList)
          this.page += 1
          this.finished = (newList.length === 0)
        }).catch(() => this.finished = true).finally(() => this.loading = false)
      },
      detail(item) {
        this.$router.push({
          path: `/helpDetail/${item.id}`,
          query: {
            item: item,
            type: "1"
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .list {
    margin-top: 8px;
  }

  .cell {
    display: flex;
    flex-direction: column;
    background: $content-backgroun-color;
    border-bottom: 1px $divider-color solid;
    padding: 12px 14px;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: $h1-color;
      line-height: 1.1rem;
    }

    .cover {
      max-width: 48%;
      height: auto;
      display: block;
      margin: 8px 0;
    }

    .time {
      color: $h3-color;
      font-size: 13px;
    }
  }
</style>
