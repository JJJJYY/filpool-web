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
      page: 1,
      pageSize: 20,
      notices: [],
      refreshing: false,
      loading: false,
      finished: false,
    };
  },
  created() {},
  methods: {
    getNotices() {
      this.page = 1;
      this.downRefresh();
    },
    downRefresh() {
      const getData = {
        page: this.page,
        count: this.pageSize,
      };
      getNoticeListApi(getData)
        .then((res) => {
          let newList = res.data;
          if (res.data.length) {
            this.notices =
              this.page === 1 ? newList : this.notices.concat(newList);
            this.page += 1;
            this.finished = false;
          } else {
            this.finished = true;
          }
          this.refreshing = false;
        })
        .catch(() => (this.finished = true))
        .finally(() => (this.loading = false));
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