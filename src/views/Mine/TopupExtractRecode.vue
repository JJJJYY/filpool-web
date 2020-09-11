<template>
  <div>
    <head-nav :title="this.title"></head-nav>
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据">
      <div class="cell" v-for="(x, i) in list" :key="i" @click="detail(x)">
        <div class="item" style="align-items: flex-start;">
          <div class="key">数量</div>
          <div class="val">{{x.amount}}</div>
        </div>
        <div class="item" style="align-items: center;">
          <div class="key">状态</div>
          <div class="val" v-if="isTopUp === 'true'">{{statusDesc(x.status)}}</div>
          <div class="val" v-else>{{statusWithdrawal(x.status)}}</div>
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
import { List } from "vant";
import dayjs from "dayjs";
import HeadNav from "@/components/HeadNav";
import { rechargeRecordApi, withdrawalApi } from "../../net/api/userInfoApi";

export default {
  name: "TopupExtractRecode",
  components: {
    HeadNav,
    [List.name]: List,
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: [],
      isTopUp: this.$route.query.isTopUp,
      title: "",
    };
  },
  created() {
    console.log(this.isTopUp);
    // url传true&false是字符串！！！fuc*
    this.title = this.isTopUp === "true" ? "充币记录" : "提币记录";
    console.log(this.title);
  },
  methods: {
    onLoad() {
      this.loading = true;
      const postData = {
        asset: this.$route.query.asset,
        pageNo: this.page,
        pageSize: 20,
      };
      this.addOrWithdrawal(postData)
        .then((res) => {
          let newList = res.data;
          // 后台返回无数据为对象进行判断
          if (Object.prototype.toString.call(res.data) === "[object Object]") {
            this.finished = true;
          } else {
            this.list = this.page === 1 ? newList : this.list.concat(newList);
          }
          this.page += 1;
        })
        .catch(() => (this.finished = true))
        .finally(() => {
          this.loading = false;
        });
      // let url = this.$route.query.isTopUp
      //   ? "/asset/rechargeRecord"
      //   : "/asset/withdrawRecord";
      // this.$http
      //   .post(url, {
      //     asset: this.$route.query.asset,
      //     pageNo: this.page,
      //     pageSize: 20,
      //   })
      //   .then((response) => {
      //     let newList = response.data || [];
      //     this.list = this.page === 1 ? newList : this.list.concat(newList);
      //     this.page += 1;
      //     this.finished = newList.length === 0;
      //   })
      //   .catch(() => (this.finished = true))
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
    addOrWithdrawal(data) {
      return this.isTopUp === "true"
        ? rechargeRecordApi(data)
        : withdrawalApi(data);
    },
    statusWithdrawal(i) {
      switch (i) {
        case 0:
          return "待审核";
        case 1:
          return "完成";
        case 2:
          return "取消";
        case 3:
          return "取消";
        case 4:
          return "正在处理";
        case 5:
          return "正在处理";
        default:
          return "系统错误";
      }
    },
    statusDesc(i) {
      switch (i) {
        case 0:
          return "取消";
        case 1:
          return "完成";
        case 2:
          return "正在处理";
        default:
          return "系统错误";
      }
    },
    time(date) {
      return dayjs(date).format("MM-DD HH:mm:ss");
    },
    detail(item) {
      console.log(item);
      this.$router.push({
        path: "/topupExtractRecodeDetail",
        query: {
          item,
          isTopUp: this.$route.query.isTopUp,
          statusDesc: this.statusDesc(item.status),
        },
      });
    },
  },
};
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
