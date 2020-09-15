<template>
  <div class="home">
    <div
      class="home-container page-container"
      id="page-container"
      :style="$isH5?{height: 'initial'}:{}"
    >
      <vue-pull-refresh
        v-model="refreshing"
        :on-refresh="onRefresh"
        ref="pullDown"
        @scroll.native="handleScroll($event)"
      >
        <!--  Banner  -->
        <Banner ref="Banner"></Banner>
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
            <span>{{item.title}}</span>
          </div>
        </div>
        <!-- 购买 -->
        <div class="buy" style="min-height: 66vw;">
          <CalcPowerItem
            v-for="item in goodList"
            :key="item.id"
            :good-data="item"
            @select="onSelect"
          />
        </div>
        <!--介绍-->
        <div class="section intro">
          <h3 class="intro-title">IPFS社区介绍</h3>
          <video
            v-for="(x, i) in videos"
            :key="i"
            :src="x.content"
            controls="true"
            :poster="previewImg"
          ></video>
        </div>
        <!-- IPfS特点介绍 -->
        <div class="section intro2">
          <div class="item">
            <img src="../../assets/img/home_icon_1.png" alt />
            <div class="right">
              <p class="title">IPFS</p>
              <p class="subtitle">Inter Planetary File System</p>
              <div class="hr"></div>
              <ul>
                <li>星际文件系统</li>
                <li>下一代互联网的底层通信协议</li>
              </ul>
            </div>
          </div>
          <div class="item">
            <img src="../../assets/img/home_icon_2.png" alt />
            <div class="right">
              <p class="title">Filecoin</p>
              <p class="subtitle">Filecoin</p>
              <div class="hr"></div>
              <ul>
                <li>一个去中心化存储网络</li>
                <li>IPFS 的激励层</li>
                <li>打破 ICO 融资记录</li>
                <li>2017 年筹集 2.57 亿美金</li>
              </ul>
            </div>
          </div>
          <div class="item">
            <img src="../../assets/img/home_icon_3.png" alt />
            <div class="right">
              <p class="title">20亿枚</p>
              <p class="subtitle">Filecoin总发行量</p>
              <div class="hr"></div>
              <ul>
                <li>
                  <span>Filecoin基金会</span>
                  <span class="persent">5%</span>
                </li>
                <li>
                  <span>ICO 投资人（私募+公募）</span>
                  <span class="persent">10%</span>
                </li>
                <li>
                  <span>Protocol labs（官方团队)</span>
                  <span class="persent">15%</span>
                </li>
                <li>
                  <span>矿工（挖矿）</span>
                  <span class="persent">70%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--买币不如挖矿-->
        <div class="section intro3">
          <h3>
            <span style="margin-right: 16px;">炒币不如屯币</span>
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
        </div>
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
        <Banner5></Banner5>
        <!--  云算力优势  -->
        <div class="section intro6">
          <div class="title">FILPool矿池优势</div>
          <!--<div class="subtitle">FILPool矿池</div>-->
          <Banner6></Banner6>
        </div>
        <!--  蜘蛛矿机  -->
        <div class="section intro7">
          <div class="title">蜘蛛矿机</div>
          <div class="subtitle">
            支持多设备统一管理
            <br />存储、CPU、内存、温度、性能等状态实时监控
          </div>
          <div class="grid">
            <div class="grid-item">
              <img class="grid-item-img" src="../../assets/img/home/home_icon_17.png" alt />
              <div class="grid-item-text">
                定制化
                <br />Linux 挖矿系统
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-item-img" src="../../assets/img/home/home_icon_18.png" alt />
              <div class="grid-item-text">
                Filecoin 挖矿
                <br />专用定制主板
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-item-img" src="../../assets/img/home/home_icon_19.png" alt />
              <div class="grid-item-text">
                超强多核 CPU
                <br />测试网全网效率最高
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-item-img" src="../../assets/img/home/home_icon_20.png" alt />
              <div class="grid-item-text">
                24盘位支持热插拔
                <br />可随时动查调整硬盘空间
                <br />
              </div>
            </div>
          </div>
        </div>
        <!--合作伙伴-->
        <Partner></Partner>
      </vue-pull-refresh>
      <van-popup v-model="show" position="bottom" closeable :safe-area-inset-bottom="true">
        <CalcPowerBuyPopup
          v-on:dismiss="show=false"
          :number="number"
          :item="selectedItem"
          v-on:enterOrder="buySubmit"
          @changeNumber="onSelect"
        />
      </van-popup>
    </div>
    <foot-box></foot-box>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
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
import { getGoodListApi, getVideoListApi } from "@/net/api/homeApi";
import { orderApi } from "@/net/api/userInfoApi";

export default {
  name: "Home",
  data() {
    return {
      guideItems: [
        {
          icon: require("../../assets/img/home_icon_class.png"),
          title: "进阶小课堂",
          router: "/classroom",
        },
        {
          icon: require("../../assets/img/home_icon_invitation.png"),
          title: "邀请好友",
          router: "/invite",
        },
        {
          icon: require("../../assets/img/home_icon_produce.png"),
          title: "项目动态",
          router: "/dynamic",
        },
        {
          icon: require("../../assets/img/home_icon_help.png"),
          title: "帮助中心",
          router: "/helpCenter",
        },
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
      return getGoodListApi()
        .then((res) => {
          this.goodList = res.data;
        })
        .finally(() => (this.refreshing = false));
      // this.$http
      //   .get("/purchase/access/goodsList")
      //   .then((response) => {
      //     this.goodList = response.data.slice(0, 2);
      //     console.log(this.goodList);
      //   })
      //   .finally(() => (this.refreshing = false));
    },
    videoList() {
      return getVideoListApi().then((res) => {
        this.videos = res.data.filter((item) => {
          return item.type === 1;
        });
      });
      // return this.$http
      //   .get("/general/access/advertisement", { type: 1 })
      //   .then((response) => {
      //     this.videos = response.content.filter((item) => {
      //       return item.type === 1;
      //     });
      //   })
      //   .finally(() => (this.refreshing = false));
    },
    onSelect(item) {
      this.selectedItem = Object.assign({}, item);
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
        quantity: item.amount,
      };
      orderApi(postData).then((res) => {
        console.log(res);
        if (res.ret === 200) {
          this.$router.push({
            path: "/countPay",
            query: {
              amount: item.price * item.amount,
              id: res.data,
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

$section-margin-top: 12px;
.home-container {
  height: 100vh;
  background: #eeeaed;
}
.section {
  background: white;
  margin-top: $section-margin-top;
}

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
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 22px 12px;
  margin-bottom: 12px;
  &-item {
    flex: 1;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      max-height: 24px;
    }

    span {
      margin-top: 12px;
    }
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
    color: $h2-color;
    font-size: 15px;
  }

  video {
    width: 92%;
    height: 160px;
    margin-bottom: 12px;
  }
}

.intro2 {
  padding: 32px;

  .item {
    &:first-child {
      margin-top: 0;
    }

    margin-top: 24px;
    display: flex;
    align-items: flex-start;

    > img {
      max-width: 40px;
    }

    p {
      margin: 0;
    }

    .right {
      margin-left: 30px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: $h1-color;
      }

      .subtitle {
        font-size: 14px;
        color: $h3-color;
        margin-top: 6px;
      }

      .hr {
        width: 36px;
        height: 2px;
        background: $main-color;
        margin-top: 6px;
      }

      ul {
        list-style-type: disc;
        list-style-position: inside;

        li {
          color: $h2-color;
          font-size: 13px;
          margin-top: 8px;
        }
      }
    }
  }
}
.intro-title {
  margin: 16px 0;
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
  background: rgba(46, 18, 175, 1);
  border-radius: 6px;
  font-size: 10px;
  padding: 2px 5px;
  color: #fff;
  transform: scale(0.8);
  text-align: center;
  margin-left: 6px;
}
</style>
