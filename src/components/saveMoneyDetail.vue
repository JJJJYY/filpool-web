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
              <p class="goodBoxItemTitleLeftTitle">存币生息</p>
            </div>
            <div @click="jumpRule" class="goodBoxItemTitleRight">
              <p>参与细则</p>
              <img src="../assets/img/moneyManagement/jiantou.png" alt="" />
            </div>
          </div>
          <div class="goodBoxItemProgress">
            <van-progress color="#F9A03E" :percentage="50" />
            <div class="goodBoxItemProgressText">
              <span class="spanText">7.00%</span>
              <span>预计年化</span>
            </div>
            <div class="goodBoxItemProgressTime">
              <span>发布时间：2020-12-02 12:12:23</span>
            </div>
          </div>
          <van-divider />
          <div class="goodBoxItemCentent">
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">70FIL</p>
              <p>起存金额</p>
            </div>
            <div class="xian"></div>
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">70FIL</p>
              <p>最高可持</p>
            </div>
            <div class="xian"></div>
            <div class="goodBoxItemCententBox">
              <p class="goodBoxItemCententBoxNum">70FIL</p>
              <p>总额</p>
            </div>
          </div>
          <van-divider />
          <div class="goodBoxItemFooter">
            <div class="goodBoxItemFooterPadding">
              <div>募集周期：7天</div>
              <div>存币周期：180天</div>
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
            <p>2020-12-09</p>
          </div>
          <div>
            <p>预计到期日</p>
            <p>2020-12-09</p>
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
            <div class="investmentListTitle">投资列表</div>
            <div class="investmentForList">
              <div class="investmentForListFlex">
                <p>UID：152875</p>
                <p>数量：100FIL</p>
              </div>
              <div class="investmentForListFlex marginTop">
                <p></p>
                <p>2020-11-11 20:20:20</p>
              </div>
            </div>
            <div class="investmentForList">
              <div class="investmentForListFlex">
                <p>UID：152875</p>
                <p>数量：100FIL</p>
              </div>
              <div class="investmentForListFlex marginTop">
                <p></p>
                <p>2020-11-11 20:20:20</p>
              </div>
            </div>
          </div>
          <!-- <div class="vanTab-r" v-for="(item, index) in list" :key="index">
            <div class="vanTab-padding">
              <div class="vanTab-flex">
                <div>排序： {{ index + 1 }}</div>
                <div>数量： {{ item.power | parseFloatFilter }}TiB</div>
              </div>
              <div class="vanTab-flex">
                <div>ID： {{ item.auth_user_id }}</div>
                <div style="color: #666666 ; font-size: 12px">
                  {{ item.create_time }}
                </div>
              </div>
            </div>
          </div> -->
        </van-list>
        <van-popup
          v-model="show"
          position="bottom"
          closeable
          :safe-area-inset-bottom="true"
        >
        </van-popup>
      </div>
    </div>
    <div @click="jumpInterest" class="footer">
      立即参与
    </div>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, List, Progress, Divider } from "vant";
// import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
// import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import {} from "@/net/api/userInfoApi";

export default {
  name: "saveMoneyDetail",
  components: {
    HeadNav,
    // CalcPowerItem,
    // CalcPowerBuyPopup,
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
      detailInfo: {},
      number: this.$route.params.amount || 1,
      active: 0,
      list: [],
      loading: false,
      finished: true,
      page: 1,
      count: 10
    };
  },
  created() {},
  methods: {
    jumpRule() {
      this.$router.push({
        path: "/rule"
      });
    },
    jumpInterest() {
      this.$router.push({
        path: "/interest"
      });
    },
    onLoad() {},
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
// .vanTab-r {
//   // padding: 0 10px;
//   border-bottom: 1px solid #e8e8e8ff;
//   .vanTab-padding {
//     border-radius: 8px;
//     background: #fff;
//     padding: 10px 0;
//     .vanTab-flex {
//       padding: 0 20px;
//       display: flex;
//       margin-top: 10px;
//       justify-content: space-between;
//       font-size: 14px;
//       color: #666666ff;
//     }
//   }
// }
</style>
