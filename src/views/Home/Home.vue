<template>
  <div class="home">
    <div
      class="home-container page-container"
      id="page-container"
      :style="$isH5 ? { height: 'initial' } : {}"
    >
      <vue-pull-refresh
        v-model="refreshing"
        :on-refresh="onRefresh"
        ref="pullDown"
        @scroll.native="handleScroll($event)"
      >
        <div class="title-image">
          <img
            class="title-fil"
            src="../../assets/img/home/title-fil.png"
            alt=""
          />
          <img
            class="title-text"
            src="../../assets/img/home/title-text.png"
            alt=""
          />
        </div>
        <!--  Banner  -->
        <Banner ref="Banner" class="banner-margin"></Banner>
        <!--通知-->
        <Notice></Notice>
        <div class="guide">
          <!-- 引导 -->
          <div
            class="guide-item"
            v-for="item in guideItems"
            :key="item.title"
            @click="$router.push(item.router)"
          >
            <img :src="item.icon" alt />
            <span>{{ item.title }}</span>
          </div>
        </div>
        <!-- 购买 -->
        <div v-if="rateShow" class="buy" style="margin: 10px">
          <CalcPowerItem :good-data="goodList" @select="onSelect" />
        </div>
        <!-- 存储空间 -->
        <Storage style="margin-top: 30px"></Storage>
        <!--介绍-->
        <div class="section intro">
          <h3 class="intro-title">IPFS官方视频</h3>
          <div class="intro-video">
            <video
              v-for="(x, i) in videos"
              :key="i"
              :src="x.content"
              controls="true"
              :poster="previewImg"
            ></video>
          </div>
        </div>
        <!-- IPfS特点介绍 -->
        <!-- <div class="section-white intro2">
          <div class="item">
            <div class="right">
              <p class="title">
                <span class="zhu"></span>
                <span>IPFS</span>
              </p>
              <p class="subtitle">Inter Planetary File System</p>
              <ul>
                <li>星际文件系统</li>
                <li>下一代互联网的底层通信协议</li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="right">
              <p class="title">
                <span class="zhu"></span>
                <span>Filecoin</span>
              </p>
              <p class="subtitle">Filecoin</p>
              <ul>
                <li>去中心化存储网络</li>
                <li>下一代千亿级金矿</li>
                <li>融资2.57亿美金创全球ICO记录</li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="right">
              <p class="title">
                <span class="zhu"></span>
                <span>20亿枚</span>
              </p>
              <p class="subtitle">Filecoin总发行量</p>
              <ul>
                <li>
                  <span>Filecoin基金会</span>
                  <span class="persent">5%</span>
                </li>
                <li>
                  <span>ICO投资人（私募+公募</span>
                  <span class="persent">10%</span>
                </li>
                <li>
                  <span>Protocol labs（官方团队）</span>
                  <span class="persent">15%</span>
                </li>
                <li>
                  <span>矿工（挖矿）</span>
                  <span class="persent">70%</span>
                </li>
              </ul>
            </div>
            <div class="image-centent">
              <img src="../../assets/img/home/homeBigBanner.png" alt="" />
            </div>
          </div>
        </div> -->

        <!--买币不如挖矿-->
        <!-- <div class="section intro3">
          <h3>
            <span style="margin-right: 16px">炒币不如屯币</span>
            <span>屯币不如挖矿</span>
          </h3>
          <div class="intro3-wrap">
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_4.png" alt />
              <span>一键挖矿</span>
              <span>省心省力</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_5.png" alt />
              <span>智能抢单</span>
              <span>收益更高</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_7.png" alt />
              <span>收益透明</span>
              <span>随时提取</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_7.png" alt />
              <span>安全保障</span>
              <span>稳定高效</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_8.png" alt />
              <span>规模运营</span>
              <span>低耗高效</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_9.png" alt />
              <span>专业运维</span>
              <span>规范管理</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_10.png" alt />
              <span>邀请奖励</span>
              <span>合作共赢</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_11.png" alt />
              <span>社区生态</span>
              <span>持续发展</span>
            </div>
            <div class="intro3-wrap-item">
              <img src="../../assets/img/home_icon_12.png" alt />
              <span>操作便捷</span>
              <span>轻松认购</span>
            </div>
          </div>
        </div> -->
        <!--  全网算力第一  -->
        <!--<div class="section intro4">
          <p class="title">全网算力持续排名第一</p>
          <p class="subtitle">Filecoin测试网</p>
          <img src="https://filpool.oss-cn-hongkong.aliyuncs.com/image/home_picture_calculate.png" alt="">
        </div>-->
        <!-- <div v-scroll-show="{callback: toggleBrowser,showHeight: -200, container: isH5?'':$refs.pullDown.$el}" v-if="showContainer">
          <Browser v-if="showBrowser"></Browser>
        </div>-->
        <!--  Banner介绍  -->
        <!-- <Banner5></Banner5> -->
        <!--  云算力优势  -->
        <!-- <div class="section intro6">
          <div class="title">FILPool矿池优势</div>
          <Banner6></Banner6>
        </div> -->
        <!--  蜘蛛矿机  -->
        <!-- <div class="section intro7">
          <div class="title">蜘蛛矿机</div>
          <div class="subtitle">
            支持多设备统一管理
            <br />存储、CPU、内存、温度、性能等状态实时监控
          </div>
          <div class="grid">
            <div class="grid-item">
              <img
                class="grid-item-img"
                src="../../assets/img/home/home_icon_17.png"
                alt
              />
              <div class="grid-item-text">
                定制化
                <br />Linux 挖矿系统
              </div>
            </div>
            <div class="grid-item">
              <img
                class="grid-item-img"
                src="../../assets/img/home/home_icon_18.png"
                alt
              />
              <div class="grid-item-text">
                Filecoin 挖矿
                <br />专用定制主板
              </div>
            </div>
            <div class="grid-item">
              <img
                class="grid-item-img"
                src="../../assets/img/home/home_icon_19.png"
                alt
              />
              <div class="grid-item-text">
                超强多核 CPU
                <br />测试网全网效率最高
              </div>
            </div>
            <div class="grid-item">
              <img
                class="grid-item-img"
                src="../../assets/img/home/home_icon_20.png"
                alt
              />
              <div class="grid-item-text">
                24盘位支持热插拔
                <br />可随时动查调整硬盘空间
                <br />
              </div>
            </div>
          </div>
        </div> -->
        <!--合作伙伴-->
        <Partner></Partner>
      </vue-pull-refresh>
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        :safe-area-inset-bottom="true"
      >
        <!-- <CalcPowerBuyPopup
          v-on:dismiss="show = false"
          :number="number"
          :item="selectedItem"
          v-on:enterOrder="buySubmit"
          @changeNumber="onSelect"
        /> -->
      </van-popup>
    </div>
    <FootBox></FootBox>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
import Storage from "./components/storage";
import Banner5 from "@/components/Banner5";
import Banner6 from "@/components/Banner6";
import Partner from "@/components/Partner";
/*import {Popup, PullRefresh} from "vant";*/
import { Popup } from "vant";
import VuePullRefresh from "vue-pull-refresh";
import CalcPowerBuyPopup from "../calcPower/CalcPowerBuyPopup";
import FootBox from "@/components/FootBox";
import plusready from "@/utils/plusReady";
import Browser from "./browser/Browser";
import { isH5 } from "@/utils/utilTools";
import { getVideoListApi } from "@/net/api/homeApi";
import { getHomePageSaleLatestInfo } from "@/net/api/userInfoApi";
import { orderApi } from "@/net/api/userInfoApi";

export default {
  name: "Home",
  data() {
    return {
      guideItems: [
        {
          icon: require("../../assets/img/mine/guide-4.png"),
          title: "进阶小课堂",
          router: "/classroom"
        },
        {
          icon: require("../../assets/img/mine/guide-3.png"),
          title: "公告中心",
          router: "/NoticeList"
        },
        {
          icon: require("../../assets/img/mine/guide-2.png"),
          title: "项目动态",
          router: "/dynamic"
        },
        {
          icon: require("../../assets/img/mine/guide-1.png"),
          title: "帮助中心",
          router: "/helpCenter"
        }
      ],
      videos: [],
      previewImg: require("@/assets/img/preview.png"),
      goodList: [],
      selectedItem: {},
      show: false,
      number: 1,
      refreshing: false,
      showContainer: false,
      showBrowser: false,
      isH5: isH5,
      rateShow: false
    };
  },
  components: {
    CalcPowerBuyPopup,
    CalcPowerItem,
    Banner,
    Notice,
    Banner5,
    Banner6,
    Partner,
    FootBox,
    [Popup.name]: Popup,
    "vue-pull-refresh": VuePullRefresh,
    Browser,
    Storage
    /*[PullRefresh.name]: PullRefresh*/
  },
  created() {
    this.getGoodList();
    this.videoList();
    this.setStatusStyle("light");
  },
  mounted() {
    this.showContainer = true;
  },
  activated() {
    this.setStatusStyle("light");
  },
  deactivated() {
    this.getGoodList();
    this.setStatusStyle("dark");
  },
  methods: {
    toggleBrowser() {
      this.showBrowser = true;
    },
    setStatusStyle(style) {
      plusready(() => {
        window.plus.navigator.setStatusBarStyle(style); //白色
        this.statusDark = style === "dark";
      });
    },
    handleScroll(event) {
      if (
        event.target.scrollTop > this.$refs.Banner.$el.clientHeight &&
        !this.statusDark
      ) {
        this.setStatusStyle("dark");
      } else if (
        event.target.scrollTop < this.$refs.Banner.$el.clientHeight &&
        this.statusDark === true
      ) {
        this.setStatusStyle("light");
      }
    },
    onRefresh() {
      return Promise.all([this.getGoodList(), this.videoList()]);
    },
    getGoodList() {
      return getHomePageSaleLatestInfo()
        .then(res => {
          if (res.data) {
            this.goodList = res.data;
            this.rateShow = true;
          }
        })
        .finally(() => (this.refreshing = false));
    },
    videoList() {
      return getVideoListApi().then(res => {
        this.videos = res.data.filter(item => {
          return item.type === 1;
        });
      });
    },
    onSelect(item) {
      // this.selectedItem = Object.assign({}, item);
      this.number = this.selectedItem.amount;
      this.show = true;
    },
    buySubmit(item) {
      /// 确认订单
      this.show = false;
      /// 下单
      const postData = {
        id: item.id,
        asset: "USDT",
        quantity: item.amount
      };
      orderApi(postData).then(res => {
        if (res.ret === 200) {
          this.$router.push({
            path: "/countPay",
            query: {
              amount: item.price * item.amount,
              id: res.data
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

$section-margin-top: 12px;

.title-image {
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  .title-fil {
    width: 22px;
    height: 22px;
    margin-left: 18px;
  }
  .title-text {
    margin-left: 8px;
    width: 60px;
    height: 12px;
  }
}
.banner-margin {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}
.home-container {
  height: 100vh;
  background: #f6f6f6;
}
.section {
  // background: white;
  margin-top: $section-margin-top;
}
// .section-white {
//   background: white;
// }

.banner {
  background: white;

  &-item {
    height: 160px;
    width: 100%;
  }
}

.notify {
  box-sizing: border-box;
  padding: 12px;
  height: 30px;
  color: $h2-color;
  font-size: 14px;

  van-swipe-item {
    overflow: hidden;
    text-overflow: ellipsis;
    line-break: normal;
  }

  /*overflow: hidden;*/
}

.guide {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 12px 12px;
  // margin-bottom: 12px;
  &-item {
    flex: 1;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      max-height: 48px;
    }

    span {
      margin-top: 6px;
    }
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
    font-size: 16px;
    color: #333333;
    font-weight: 700;
  }
  .intro-video {
    padding: 10px;
  }
  video {
    width: 100%;
    height: 150px;
    margin-bottom: 12px;
    border-radius: 8px;
    overflow: hidden;
  }
}
.intro2 {
  // padding: 10;

  .item {
    background: #fff;
    margin: 10px;
    border-radius: 8px;
    padding: 12px;
    &:first-child {
      margin-top: 0;
    }

    > img {
      max-width: 40px;
    }

    p {
      margin: 0;
    }

    .image-centent {
      background: #31363aff;
      padding: 12px 20px;
      // height: 126px;
      margin-top: 20px;
      img {
        height: 100%;
        width: 100%;
        // background-image: url("../../assets/img/home/homeBigBanner.png");
        // background-size: 100% 100%;
      }
    }
    .right {
      // margin-left: 30px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: $h1-color;
        .zhu {
          display: inline-block;
          width: 4px;
          height: 14px;
          background: #ffab17ff;
          margin-right: 8px;
        }
      }

      .subtitle {
        font-size: 14px;
        color: $h3-color;
        margin-top: 6px;
        margin-left: 10px;
      }
      ul {
        list-style-type: disc;
        list-style-position: inside;
        margin-top: 18px;

        li {
          color: $h2-color;
          font-size: 13px;
          margin-top: 8px;
          list-style: none;
          &::before {
            content: "\02022";
            // margin-left: 20px;
            margin-right: 8px;
            color: #ffab17ff;
            font-style: normal;
          }
        }
      }
    }
  }
}
.intro-title {
}
.intro3 {
  background: white;

  h3 {
    color: #24375e;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding-top: 24px;
  }

  &-wrap {
    display: grid;
    grid-template-columns: repeat(3, 33.3%);

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: $h3-color;
      margin: 16px 0;

      img {
        max-width: 30px;
        margin: 4px 0;
      }

      span {
        margin-top: 6px;
      }
    }
  }
}

.intro4 {
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: $h1-color;
    margin: 0;
  }

  .subtitle {
    font-size: 12px;
    color: $h3-color;
    margin: 12px 0 24px;
  }

  img {
    display: block;
    max-width: 96%;
  }
}

.intro5 {
  padding: 12px;
  position: relative;

  &-item {
    /*padding-top: 144px;*/
    width: 188px;
    height: 276px;

    &-text {
      /*margin-top: 144px;*/
      padding: 2px 8px;
      position: absolute;
      bottom: 8px;

      .title {
        color: $h3-color;
        font-size: 10px;
        margin-top: 8px;
      }

      .subtitle {
        color: #ddd;
        font-size: 13px;
        margin-top: 4px;
      }
    }
  }

  &-img {
    /*width: 188px;*/
    /*height: 276px;*/
    max-width: 188px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}

.intro6 {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 16px;
    color: $h1-color;
    margin-top: 12px;
    font-weight: bold;
  }

  .subtitle {
    margin-top: 8px;
    font-size: 12px;
    color: $h2-color;
  }

  &-item {
    margin-top: 18px;

    .item-banner {
      height: 120px;
    }

    .item-title {
      margin: 16px auto 0;
    }

    .item-dir {
      background: $main-color;
      height: 4px;
      width: 28px;
      margin: 12px 0;
    }

    .item-content {
      max-width: 160px;
      line-height: 150%;
      text-align: justify;
      font-size: 13px;
      color: $h2-color;
    }
  }
}

.intro7 {
  background: $content-backgroun-color url("~@/assets/img/home/home_bg_1.png")
    no-repeat 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
  box-sizing: border-box;

  .title {
    color: $h1-color;
    font-size: 15px;
    font-weight: bold;
    margin-top: 217px;
  }

  .subtitle {
    color: $h1-color;
    font-size: 12px;
    line-height: 160%;
    text-align: right;
    margin-top: 18px;
  }

  .grid {
    margin-top: 40px;
    display: grid;
    align-self: stretch;
    grid-template-columns: repeat(2, 2fr);

    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 24px;

      &-img {
        width: 36px;
      }

      &-text {
        margin-top: 12px;
        color: $h2-color;
        font-size: 12px;
        text-align: center;
        line-height: 140%;
      }
    }
  }
}
.persent {
  display: inline-block;
  min-width: 14px;
  border-radius: 6px;
  font-size: 10px;
  padding: 2px 5px;
  color: #333333ff;
  transform: scale(0.8);
  text-align: center;
  margin-left: 6px;
}
</style>
