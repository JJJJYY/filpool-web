<template>
  <div class="NoticeList">
    <head-nav :styles="{marginBottom: 0}"></head-nav>
    <div class="listContainer page-container">
      <van-pull-refresh v-model="refreshing" @refresh="getNotices">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="downRefresh">
          <ul class="list">
            <li v-for="item in notices" :key="item.id" @click="checkDetail(item)">
              <h3 class="title">{{item.title}}</h3>
              <div class="content">{{item.description}}</div>
              <p class="date">{{ item.createTime }}</p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { PullRefresh, List } from "vant";
import { formatDate } from "@/utils/utilTools";
import { getNoticeListApi } from "@/net/api/homeApi";
export default {
  name: "NoticeList",
  components: {
    HeadNav,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      notices: [],
      refreshing: false,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.getNotices();
    // const getData = {
    //   id: 1,
    // };
    // getNoticeDetailListApi(getData).then((res) => {
    //   console.log(res);
    // });
  },
  methods: {
    getNotices() {
      this.finished = false;
      const getData = {
        page: this.pageNo,
        count: this.pageSize,
      };
      getNoticeListApi(getData).then((res) => {
        this.notices = res.data;
        this.refreshing = false;
        this.pageNo += 1;
        this.downRefresh();
      });
      //   this.$http
      //     .post("/message/access/public/notice", {
      //       pageNo: this.pageNo,
      //       pageSize: this.pageSize,
      //     })
      //     .then((res) => {
      //       let dv = document.createElement("div");
      //       let list = res.data.content.map((item) => {
      //         dv.innerHTML = item.content;
      //         item.simpleContent =
      //           (dv.firstChild && dv.firstChild.innerText) || item.content;
      //         return item;
      //       });
      //       console.log(list);
      //       // this.notices = list;
      //       this.refreshing = false;
      //       this.pageNo += 1;
      //       this.downRefresh();
      //     });
    },
    downRefresh() {
      let self = this;
      self.PageIndex += 1;
      setTimeout(() => {
        const getData = {
          page: self.PageIndex,
          count: this.pageSize,
        };
        getNoticeListApi()
          .then((res) => {
            this.notices = res.data;
            self.loading = false; //成功关闭loading
            this.finished = true;
          })
          .catch((res) => {
            console.log(res);
          });
      }, 500);
    },
    checkDetail(item) {
      this.$router.push({
        path: `/helpDetail/`,
        query: {
          id: item.id,
          item,
          type: "4",
        },
      });
    },
  },
  // filters: {
  //   formatDate(val) {
  //     if (!val) {
  //       return "-- --";
  //     }
  //     return formatDate(val, "yyyy-MM-dd hh:mm:ss");
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.NoticeList {
  font-size: 12px;
  .listContainer {
    padding-left: 16px;
    padding-right: 16px;
    //border-top: 12px solid #EEEAED;
    background-color: #fff;
  }
  .list {
    li {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #24375e;
  }
  .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #575c62;
    margin: 12px 0;
  }
  .date {
    text-align: right;
    color: #86929d;
  }
}
</style>