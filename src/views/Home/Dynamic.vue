<template>
  <div>
    <head-nav :styles="{marginBottom: 0}"></head-nav>
    <div class="page-container">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据">
        <div class="list">
          <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
            <div class="title">{{x.title}}</div>
            <div class="content" v-html="x.simpleContent"></div>
            <div class="time">{{x.createTime}}</div>
          </div>
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
  name: "Dynamic",
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
  created() {},
  methods: {
    onLoad() {
      const postData = {
        type: 0,
        page: this.page,
        count: 10,
      };
      advertisementInfoList(postData)
        .then((res) => {
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
      //     type: 2,
      //     pageNo: this.page,
      //     pageSize: 10,
      //   })
      //   .then((response) => {
      //     let resArr = response.data || [];
      //     let dv = document.createElement("div");
      //     let newList = resArr.map((item) => {
      //       dv.innerHTML = item.content;
      //       item.simpleContent =
      //         (dv.firstChild && dv.firstChild.innerText) || item.content;
      //       return item;
      //     });

      //     this.list = this.page === 1 ? newList : this.list.concat(newList);
      //     this.page += 1;
      //     this.finished = newList.length === 0;
      //   })
      //   .catch(() => (this.finished = true))
      //   .finally(() => {
      //     this.loading = false;
      //   });
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
  .cell {
    background: $content-backgroun-color;
    padding: 14px;
    border-bottom: 1px $divider-color solid;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: $h1-color;
      line-height: 24px;
    }

    .content {
      margin-top: 8px;
      text-align: justify;
      font-size: 14px;
      line-height: 130%;
      color: $h2-color;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      text-align: right;
      margin-top: 10px;
      font-size: 13px;
      color: #86929d;
    }
  }
}
</style>
