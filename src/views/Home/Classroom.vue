<template>
  <div>
    <head-nav :styles="{marginBottom: 0}"></head-nav>
    <div class="page-container">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据">
        <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
          <div class="title">{{x.title}}</div>
          <img class="cover" :src="x.image" alt />
          <div class="time">{{x.createTime}}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { List } from "vant";
import HeadNav from "@/components/HeadNav";
import { advertisementInfoList } from "@/net/api/userInfoApi";

export default {
  name: "Classroom",
  components: {
    HeadNav,
    [List.name]: List,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
    };
  },
  methods: {
    onLoad() {
      const postData = {
        type: 1,
        page: this.page,
        count: 10,
      };
      advertisementInfoList(postData)
        .then((res) => {
          console.log(res);
          let newList = res.data;
          if (res.data.length) {
            this.list = this.page === 1 ? newList : this.list.concat(newList);
            this.page += 1;
            this.finished = false;
          } else {
            this.finished = true;
          }
        })
        .catch(() => (this.finished = true))
        .finally(() => (this.loading = false));
      // this.$http
      //   .post("/message/getInfoList", {
      //     type: 3,
      //     pageNo: this.page,
      //     pageSize: 10,
      //   })
      //   .then((response) => {
      //     let newList = response.data || [];
      //     this.list = this.page === 1 ? newList : this.list.concat(newList);
      //     this.page += 1;
      //     this.finished = newList.length === 0;
      //   })
      //   .catch(() => (this.finished = true))
      //   .finally(() => (this.loading = false));
    },
    detail(item) {
      this.$router.push({
        path: `/helpDetail/`,
        query: {
          item: item,
          id: item.id,
          type: "1",
        },
      });
    },
  },
};
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
    line-height: 3.1rem;
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
