<template>
  <div>
    <HeadNav></HeadNav>
    <div class="assetDetails">
      <div class="type">
        <div class="type-right">类型</div>
        <van-button
          type="default"
          size="mini"
          class="round"
          @click="show = true"
          >{{ buttonType }}</van-button
        >
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
        />
      </div>
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
              <p>{{ typeText(item.type) }}</p>
              <p class="call-color">
                {{ item.quantity | parseFloatFilter }}{{ item.asset }}
              </p>
            </div>
            <div class="call-buttom">
              <p class="call-time">{{ item.createTime }}</p>
              <p class="call-color">
                <span>{{ statusText(item.status) }}</span>
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
import { Button, List, ActionSheet } from "vant";
import { recordListApi } from "@/net/api/userInfoApi";
export default {
  name: "assetDetails",
  components: {
    HeadNav,
    "van-button": Button,
    "van-list": List,
    "van-action-sheet": ActionSheet
  },
  data() {
    return {
      list: [],
      buttonType: "全部",
      loading: false,
      finished: false,
      show: false, // 底部弹出框
      actions: this.dataType(),
      type: 0,
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      asset: this.$route.query.asset
    };
  },
  methods: {
    // 数据请求
    getRecordListApi() {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        asset: this.asset,
        count: this.pagination.pageSize,
        type: this.type
      };
      recordListApi(getData)
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
    },
    onSelect(item) {
      this.show = false;
      this.buttonType = this.typeText(item.type);
      this.type = item.type;
      // 把之前请求的数据清空
      this.list = [];
      (this.pagination = {
        current: 1,
        pageSize: 10
      }),
        // 重新请求
        (this.finished = false); // 加载状态开启
      this.onLoad();
    },
    onLoad() {
      this.getRecordListApi();
    },
    // 类型判断
    typeText(x) {
      let thisName = null;
      this.dataType().map(val => {
        if (val.type === x) {
          thisName = val.name;
        }
      });
      return thisName;
    },
    statusText(x) {
      const statusData = [
        { type: 0, name: "提现中" },
        { type: 1, name: "成功" },
        { type: 2, name: "拒绝" }
      ];
      let thisName = null;
      statusData.forEach(val => {
        if (val.type === x) {
          thisName = val.name;
        }
      });
      return thisName;
    },
    dataType() {
      return [
        { type: 0, name: "全部" },
        { type: 1, name: "购买算力" },
        { type: 2, name: "申请加速算力" },
        { type: 3, name: "充值" },
        { type: 4, name: "提现" },
        { type: 5, name: "提现中" },
        { type: 6, name: "收益金额划转至充值" },
        { type: 7, name: "充值金额划转至收益" },
        { type: 8, name: "内部转出" },
        { type: 9, name: "内部转入" },
        { type: 10, name: "预估借币本息" },
        { type: 11, name: "还贷" },
        { type: 12, name: "返佣" },
        { type: 13, name: "系统充币" },
        { type: 14, name: "活动奖励" },
        { type: 15, name: "系统提币" },
        { type: 17, name: "收益线性释放" },
        { type: 18, name: "系统扣除" },
        { type: 20, name: "冻结金额扣除" },
        { type: 21, name: "25%收益直接释放" },
        { type: 22, name: "收益金额划转至抵押" },
        { type: 23, name: "质押金额返还" },
        { type: 24, name: "挖矿收益" },
        { type: 25, name: "SR质押币发放" },
        { type: 26, name: "扣除质押币" },
        { type: 27, name: "充值划转质押" },
        { type: 28, name: "收益释放至质押" },
        { type: 29, name: "加速收益" },
        { type: 30, name: "25%加速收益释放" },
        { type: 31, name: "加速收益释放" },
        { type: 32, name: "借币质押" },
        { type: 33, name: "联合挖矿购入" },
        { type: 34, name: "联合挖矿转让" },
        { type: 35, name: "联合挖矿到期" },
        { type: 36, name: "联合挖矿利息" },
        { type: 37, name: "联合挖矿defi额外奖励" }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.assetDetails {
  padding: 0 10px;
  .type {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .type-right {
      margin-right: 8px;
      color: #666666;
    }
    .round {
      border-radius: 4px;
    }
  }
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
