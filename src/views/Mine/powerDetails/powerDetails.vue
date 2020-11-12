<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="list page-container">
          <div class="call" v-for="(item, index) in list" :key="index">
            <div class="call-top">
              <p>{{ dataType(item.type) }}</p>
              <p class="call-color">+{{ item.power | parseFloatFilter }}TB</p>
            </div>
            <div class="call-buttom">
              <p class="call-time">{{ item.createTime }}</p>
              <p class="call-color">
                <span></span>
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { List } from "vant";
import { getUserAdjPowerList } from "@/net/api/userInfoApi";
export default {
  name: "powerDetails",
  components: {
    HeadNav,
    "van-list": List
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false, // 底部弹出框
      type: 0,
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      }
    };
  },
  methods: {
    onLoad() {
      this.getRecordListApi();
    },
    // 类型
    dataType(x) {
      let typeText = null;
      switch (true) {
        case x === 0:
          typeText = "全部";
          break;
        case x === 1:
          typeText = "算力增长";
          break;
        case x === 2:
          typeText = "算力加速";
          break;
        default:
          0;
      }
      return typeText;
    },
    // 数据请求
    getRecordListApi() {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        asset: this.asset,
        count: this.pagination.pageSize,
        type: this.type
      };
      getUserAdjPowerList(getData)
        .then(res => {
          console.log(res);
          let newList = res.data.list;
          // 后台返回无数据为对象进行判断
          if (res.data.list.length === 0) {
            this.finished = true;
          } else {
            this.list =
              this.pagination.current === 1
                ? newList
                : this.list.concat(newList);
          }
          this.pagination.current += 1;
        })
        .catch(() => (this.finished = true))
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.assetDetails {
  padding: 0 10px;
  .call {
    padding: 8px 16px;
    background-color: #fff;
    border-radius: 4px;
    margin-top: 8px;
    .call-top {
      display: flex;
      justify-content: space-between;
      .call-color {
        color: #666666;
      }
    }
    .call-buttom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .call-time {
        color: #999999;
      }
      .call-color {
        color: #666666;
      }
    }
  }
}
</style>
