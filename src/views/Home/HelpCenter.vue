<template>
  <div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <head-nav :styles="{marginBottom: 0}"></head-nav>
      <div class="page-container">
        <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
          <div class="title">{{x.title}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {List} from "vant";
  import HeadNav from '@/components/HeadNav';
  export default {
    name: "HelpCenter",
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
    created() {

    },
    methods: {
      onLoad() {
        this.$http.post('/message/getHelpList', {
          pageNo: this.page,
          pageSize: 20
        }).then(response => {
          let newList = response.data || []
          this.list = this.page === 1 ? newList : this.list.concat(newList)
          this.page += 1
          this.finished = (newList.length === 0 || true)
        }).catch(() => this.finished = true).finally(() => this.loading = false)
      },
      detail(item) {
        this.$router.push({
          path: `/helpDetail/${item.id}`,
          query: {
            item: item
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .cell {
    border-bottom: 1px $divider-color solid;
    background: $content-backgroun-color;
    padding: 14px;

    .title {
      font-size: 14px;
      font-weight: normal;
      line-height: 1.1rem;
      color: $h1-color;
    }
  }
</style>
