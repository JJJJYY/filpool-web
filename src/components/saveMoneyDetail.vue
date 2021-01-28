<template>
  <div class="ProductDetail">
    <head-nav class="headNavStyle"></head-nav>

    <div class="container  list page-container">
      <div class="imageSize">
        <div>
          <h1 class="imageSizeH1">存币宝</h1>
          <p class="imageSizeP">实现收益最大化</p>
        </div>
        <img
          src="../assets/img/moneyManagement/detailBanner.png"
          class="imageSizeClass"
          alt=""
        />
      </div>
      <div class="goodBox">
        <div class="goodBoxItem">
          <div class="goodBoxItemTitle">
            <div class="goodBoxItemTitleLeft">
              <div class="xian"></div>
              <p class="goodBoxItemTitleLeftTitle">{{ detailInfo.tittle }}</p>
            </div>
            <div @click="jumpRule" class="goodBoxItemTitleRight">
              <p>参与细则</p>
              <img src="../assets/img/moneyManagement/jiantou.png" alt="" />
            </div>
          </div>
          <div class="goodBoxItemProgress">
            <van-progress
              v-if="detailInfo"
              color="#F9A03E"
              :percentage="
                done(
                  (-detailInfo.collected_amount / -detailInfo.total) * 100,
                  2
                )
              "
            />
            <div class="goodBoxItemProgressText">
              <span class="spanText">{{ detailInfo.earning_rate }}%</span>
              <span>预计年化</span>
            </div>
            <div class="goodBoxItemProgressTime">
              <span>发布时间：{{ detailInfo.start_sale_time }}</span>
            </div>
          </div>
          <van-divider />
          <div class="goodBoxItemCentent">
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">
                {{ detailInfo.minimum_amount }}FIL
              </p>
              <p>起存金额</p>
            </div>
            <div class="xian"></div>
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">
                {{ detailInfo.maximum_amount }}FIL
              </p>
              <p>最高可持</p>
            </div>
            <div class="xian"></div>
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">{{ detailInfo.total }}FIL</p>
              <p>总额</p>
            </div>
          </div>
          <van-divider />
          <div class="goodBoxItemFooter">
            <div class="goodBoxItemFooterPadding">
              <div>募集周期：{{ detailInfo.collect_days }}天</div>
              <div>存币周期：{{ detailInfo.last_days }}天</div>
            </div>
          </div>
        </div>
      </div>
      <div class="policy">
        <div class="policyTitle">
          本息政策
        </div>
        <div class="circularWidth">
          <div class="circular"></div>
          <div class="xian"></div>
          <div class="circular"></div>
        </div>
        <div class="policyWidth">
          <div>
            <p>预计起息日</p>
            <p>{{ dayStr(detailInfo.start_cal_interest_time) }}</p>
          </div>
          <div>
            <p>预计到期日</p>
            <p>
              {{
                dayStr(detailInfo.start_cal_interest_time, detailInfo.last_days)
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="listBox">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="investmentList">
            <div class="investmentListTitle">参与列表</div>
            <div
              class="investmentForList"
              v-for="(i, index) in list"
              :key="index"
            >
              <div class="investmentForListFlex">
                <p>UID：{{ i.nickname }}</p>
                <p>数量：{{ i.amount }}FIL</p>
              </div>
              <div class="investmentForListFlex marginTop">
                <p></p>
                <p>{{ i.purchase_time }}</p>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <div @click="jumpInterest" class="footer">
      立即参与
    </div>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, List, Progress, Divider } from "vant";
import HeadNav from "@/components/HeadNav";
import { CbbProductShow, CbbUserOrdersList } from "@/net/api/userInfoApi";
import dayjs from "dayjs";
export default {
  name: "saveMoneyDetail",
  components: {
    HeadNav,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Progress.name]: Progress,
    [Divider.name]: Divider
  },
  data() {
    return {
      show: false,
      detailInfo: "",
      number: this.$route.params.amount || 1,
      active: 0,
      list: [],
      loading: false,
      finished: false,
      pagination: {
        current: 1, // 当前页
        pageSize: 10 // 页大小
      },
      id: this.$route.query.id
    };
  },
  created() {
    console.log(this.id);
    this.CbbProductShowApi();
  },
  methods: {
    dayStr(x, num = null) {
      if (num) {
        return dayjs(x)
          .add(num, "day")
          .format("YYYY-MM-DD");
      } else {
        return dayjs(x).format("YYYY-MM-DD");
      }
    },
    // 数据请求
    CbbUserOrdersListApi() {
      this.loading = true;
      const getData = {
        page: this.pagination.current,
        count: this.pagination.pageSize
      };
      CbbUserOrdersList(getData)
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
    jumpRule() {
      this.$router.push({
        path: "/rule"
      });
    },
    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    CbbProductShowApi() {
      const postData = {
        id: this.id
      };
      CbbProductShow(postData).then(res => {
        if (res.ret === 200) {
          this.detailInfo = res.data;
        }
      });
    },
    jumpInterest() {
      this.$router.push({
        path: "/interest",
        query: {
          id: this.id
        }
      });
    },
    onLoad() {
      this.CbbUserOrdersListApi();
    },
    /*根据id获取详情*/
    getDetailById() {},
    onSelect() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 50px;
}
.imageSize {
  height: 90px;
  // background-image: url("../assets/img/moneyManagement/detailBanner.png");
  // background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  .imageSizeH1 {
    color: #fff;
  }
  .imageSizeP {
    color: #ffa012;
  }
}

.imageSizeClass {
  width: 100px;
  height: 70px;
}
.ProductDetail {
  background: #1f1f1e;
  .headNavStyle {
    /deep/.van-nav-bar {
      background: #1f1f1e !important;
      &:after {
        border: none;
      }
      .van-nav-bar__left {
        img {
          filter: brightness(100);
        }
      }
      .van-ellipsis {
        .title {
          color: #fff;
        }
      }
    }
  }
  .goodBox {
    padding: 0 10px;
    .goodBoxItem {
      background: #fff;
      border-radius: 4px;
      padding: 12px 0;
      .goodBoxItemTitle {
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        .goodBoxItemTitleLeft {
          .goodBoxItemTitleLeftTitle {
            font-weight: 600;
          }
          display: flex;
          align-items: center;
          .xian {
            height: 15px;
            width: 4px;
            background: #f7a910;
            margin-right: 6px;
          }
        }
        .goodBoxItemTitleRight {
          display: flex;
          align-items: center;
          img {
            width: 8px;
            height: 8px;
            margin-left: 6px;
          }
        }
      }
      .goodBoxItemProgress {
        padding: 0 20px;
        margin-top: 25px;
        .goodBoxItemProgressTime {
          margin-top: 10px;
        }
        .goodBoxItemProgressText {
          margin-top: 20px;
          .spanText {
            font-size: 24px;
            font-weight: bold;
            color: #f9a03e;
            margin-right: 10px;
          }
        }
      }
      .goodBoxItemCentent {
        display: flex;
        justify-content: space-around;
        align-items: center;

        color: #666666;
        .goodBoxItemCententBox {
          text-align: center;
          .goodBoxItemCententBoxNum {
            color: #333;
            margin-bottom: 10px;
            font-weight: 600;
          }
        }
        .xian {
          width: 1px;
          height: 24px;
          background: #ededed;
        }
      }
      .goodBoxItemFooter {
        .goodBoxItemFooterPadding {
          padding: 0 12px;
          display: flex;
          justify-content: space-between;
          color: #666666;
        }
      }
    }
  }
  .policy {
    background: #fff;
    border-radius: 4px;
    margin: 10px;
    padding: 10px 20px;
    .policyTitle {
      font-weight: 600;
    }
    .policyWidth {
      text-align: center;
      display: flex;
      justify-content: space-between;
      color: #666666;
    }
    .circularWidth {
      margin: 15px 30px;
      display: flex;
      align-items: center;
      .xian {
        width: 100%;
        height: 1px;
        background: #f9a03e;
      }
      .circular {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f9a03e;
      }
    }
  }
  .listBox {
    margin: 0 10px;
    background: #fff;
    border-radius: 8px;
    .investmentForList {
      padding: 15px 0;
      border-bottom: 1px solid #ededed;
      .marginTop {
        margin-top: 10px;
      }
      .investmentForListFlex {
        display: flex;
        justify-content: space-between;
      }
    }
    .investmentList {
      padding: 10px 20px;
      .investmentListTitle {
        font-weight: 600;
      }
    }
  }
}
.footer {
  background: #f9a03e;
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}
</style>
