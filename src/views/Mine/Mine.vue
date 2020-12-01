<template>
  <div class="mine">
    <vue-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="page-container-mine">
        <div class="head-nav">
          <div class="personalCenter">个人中心</div>
          <div class="header-user">
            <div class="user">
              <!-- <img src="../../assets/img/personalfil.png" alt class="avatar" /> -->
              <div class="user-info">
                <div class="user-name">
                  <div class="name">{{ userData.nickname || "" }}</div>
                  <span class="state"
                    >( {{ levelString(userData.level) }} )</span
                  >
                </div>
                <span class="id">ID: {{ userData.id }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mine-container">
          <div class="total-header">
            <div
              @click="isDate = 1"
              :class="{ 'header-data-color': isDate === 1 }"
            >
              一期
            </div>
            <div
              @click="isDate = 2"
              :class="{ 'header-data-color': isDate === 2 }"
            >
              二期
            </div>
          </div>
          <div class="header" v-if="show">
            <div class="total">
              <div class="total-val">
                <div>
                  <p style="color: #666666">总存储空间</p>
                  <p class="total-val-text">
                    {{ totalWeight | parseFloatFilter }}T
                  </p>
                </div>
                <div
                  style="width: 2px; height: 22px; background: #dcdcdc"
                ></div>
                <div>
                  <p style="color: #666666">上限有效算力</p>
                  <p class="total-val-text">{{ maxAdj | parseFloatFilter }}T</p>
                </div>
              </div>
              <van-divider />
              <div class="styleFlex">
                <p>目前有效算力：{{ validWeight | parseFloatFilter }}T</p>
                <!-- <router-link
                  :to="{ path: '/rate' }"
                  class="to-buy"
                  style="margin-left: 4px"
                  v-if="isDate === 1"
                >
                  <span>去申请算力</span>
                </router-link> -->
                <div
                  class="to-buy"
                  v-if="isDate === 2"
                  @click="popupShow = true"
                >
                  去质押
                </div>
              </div>
              <van-progress
                style="margin-top: 15px"
                :percentage="
                  parseFloat(this.maxAdj) === 0
                    ? 0
                    : done(
                        (parseFloat(validWeight) / parseFloat(maxAdj)) * 100,
                        4
                      )
                "
                color="#2559A5FF"
              />
            </div>
            <div class="cut-off-rule"></div>
            <div class="growth-flex">
              <div @click="growth">详情>></div>
            </div>
          </div>
          <div class="group group-capital">
            <div class="capital-t" @click="$router.push('/calcPowerManager')">
              <img
                src="../../assets/img/mine/group-capital-1.png"
                alt
                class="icon"
              />
              <div class="title">算力管理</div>
            </div>
            <div class="capital-t" @click="$router.push('/myasset')">
              <img
                src="../../assets/img/mine/group-capital-2.png"
                alt
                class="icon"
              />
              <div class="title">资产管理</div>
            </div>
            <div class="capital-t" @click="$router.push('/orderManager')">
              <img
                src="../../assets/img/mine/group-capital-3.png"
                alt
                class="icon"
              />
              <div class="title">订单管理</div>
            </div>
          </div>

          <div class="group">
            <div class="cell" @click="$router.push('/invite')">
              <img src="../../assets/img/mine/user-1.png" alt class="icon" />
              <div class="title">邀请好友</div>
              <div class="desc">我的邀请码: {{ userData.invitationCode }}</div>
              <img
                class="more"
                src="../../assets/img/mine/tab_icon_more.png"
                alt
              />
            </div>
            <div class="cell" @click="$router.push('/securityCenter')">
              <img src="../../assets/img/mine/user-2.png" alt class="icon" />
              <div class="title">账户管理</div>
              <img
                class="more"
                src="../../assets/img/mine/tab_icon_more.png"
                alt
              />
            </div>
            <div class="cell" @click="$router.push('/actual')">
              <img src="../../assets/img/mine/user-3.png" alt class="icon" />
              <div class="title">实名认证</div>
              <img
                class="more"
                src="../../assets/img/mine/tab_icon_more.png"
                alt
              />
            </div>
            <div class="cell" @click="$router.push('/setting')">
              <img src="../../assets/img/mine/user-4.png" alt class="icon" />
              <div class="title">设置</div>
              <img
                class="more"
                src="../../assets/img/mine/tab_icon_more.png"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <van-popup v-model="popupShow" position="bottom">
        <div class="popup-padding">
          <div class="popup-black">划转</div>
          <div class="popup-type">
            <p class="popup-width">币种</p>
            <van-button type="default" size="mini" class="round popup-flex">{{
              asset
            }}</van-button>
          </div>
          <div class="popup-B">
            <p class="popup-width">从</p>
            <div class="popup-flex">
              <van-button
                type="default"
                size="mini"
                class="round"
                style="flex: 1"
              >
                充提账户
              </van-button>
              <div style="display: flex; align-items: center; margin: 0 5px">
                <img
                  src="@/assets/img/hua.png"
                  style="width: 15px; height15px"
                  alt=""
                />
                <p style="margin-left: 10px">到</p>
              </div>
              <van-button
                type="default"
                size="mini"
                class="round"
                style="flex: 1"
              >
                质押
              </van-button>
            </div>
          </div>
          <div class="popup-num">
            <p class="popup-width">数量</p>

            <van-field
              v-model="number"
              type="number"
              placeholder="请输入划转数量"
            />
            <p>{{ asset }}</p>
          </div>
          <div class="popup-q">
            <p style="width: 50px; height: 1px"></p>
            <p style="flex: 1">
              {{
                Math.min(
                  done(maxPledged, 6) - done(currentPledged, 6),
                  done(myAssetM.recharge, 6)
                )
              }}
              <span
                style="font-size: 14px"
                @click="
                  number = Math.min(
                    done(maxPledged, 6) - done(currentPledged, 6),
                    done(myAssetM.recharge, 6)
                  )
                "
                >全部</span
              >
            </p>
          </div>
          <div class="popup-button">
            <van-button class="popup-van-quxiao" @click="handleClear"
              >取消</van-button
            >
            <van-button class="popup-van-huazhuan" @click="handleOk"
              >划转</van-button
            >
          </div>
        </div>
      </van-popup>
    </vue-pull-refresh>
    <foot-box></foot-box>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadNav from "@/components/HeadNav";
import FootBox from "@/components/FootBox";
import axios from "axios"; // 作用取消请求
import {
  getMyPower,
  myBalanceApi,
  assetTypeApi,
  getTransferPledged
} from "@/net/api/userInfoApi";
import {
  PullRefresh,
  Progress,
  Divider,
  Popup,
  Button,
  Field,
  Toast
} from "vant";
export default {
  name: "Mine",
  components: {
    HeadNav,
    FootBox,
    "vue-pull-refresh": PullRefresh,
    "van-progress": Progress,
    [Divider.name]: Divider,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },

  watch: {
    isDate() {
      this.show = false;
      if (this.isDate === 1) {
        this.getMyPowerTwo();
      } else if (this.isDate === 2) {
        this.getMyPowerTwo();
      }
    }
  },
  data() {
    return {
      totalWeight: "---",
      validWeight: "---",
      maxAdj: 0,
      loading: false,
      show: false,
      isDate: 1,
      popupShow: false,
      number: "",
      currentPledged: "",
      maxPledged: "",
      asset: "FIL",
      myAssetM: {},
      myTokensData: {},
      cancelAjax: null // 作用取消请求
    };
  },

  computed: {
    ...mapState(["userData"])
  },
  activated() {
    this.getMyPowerTwo();
    this.myAsset();
  },
  deactivated() {},
  created() {
    this.getMyPowerTwo();
    this.myAsset();
  },
  methods: {
    // 钱包

    getMyPowerTwo() {
      const CancelToken = axios.CancelToken;
      if (typeof this.cancelAjax === "function") {
        this.cancelAjax();
      }
      let _this = this;
      getMyPower(
        { number: this.isDate },
        // 取消请求
        new CancelToken(function executor(c) {
          _this.cancelAjax = c;
        })
      ).then(res => {
        this.totalWeight = res.data.totalPower;
        this.validWeight = res.data.adj;
        this.maxAdj = res.data.maxAdj;
        this.currentPledged = res.data.currentPledged || "";
        this.maxPledged = res.data.maxPledged || "";
        this.loading = false;
        this.show = true;
      });
    },

    myAsset() {
      myBalanceApi().then(res => {
        res.data.forEach(item => {
          if (item.asset === this.asset) {
            this.myAssetM = item;
          }
        });
      });
      assetTypeApi().then(res => {
        if (res.ret == 200) {
          res.data.forEach(item => {
            if (item.asset === this.asset) {
              this.myTokensData = item;
            }
          });
        }
      });
    },

    handleOk() {
      if (this.number) {
        getTransferPledged({
          amount: this.number
        })
          .then(res => {
            if (res.ret === 200) {
              Toast.success("划转成功");
              this.getMyPowerTwo();
            }
            this.popupShow = false;
          })
          .catch(() => {
            this.popupShow = false;
          });
      }
    },
    handleClear() {
      this.popupShow = false;
    },
    growth() {
      this.$router.push("/powerDetails");
    },
    done(num, count) {
      let newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    levelString(x) {
      switch (x) {
        case -1:
          return "普通用户";
        case 0:
          return "铜牌合伙人";
        case 1:
          return "银牌合伙人";
        case 2:
          return "金牌合伙人";
        case 3:
          return "铂金合伙人";
        case 4:
          return "钻石合伙人";
        case 5:
          return "超级用户";
        default:
          return "普通用户";
      }
    },
    onRefresh() {
      this.loading = true;
      this.getMyPowerTwo();
      this.$store.dispatch("reloadUserData");
      this.getMyPowerTwo();
      this.myAsset(); // 刷新钱包
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.cut-off-rule {
  width: 100%;
  height: 1px;
  background: #efefefff;
  margin-bottom: 8px;
}
.growth-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.head-nav {
  height: 200px;
  background: #2559a5ff;
  border-radius: 0 0 20% 20%;
  overflow: auto;
  position: relative;
  z-index: 1;
}
.page-container-mine {
  height: 100vh;
  padding-bottom: 50px;
  box-sizing: border-box;
  overflow: auto;
}
.mine {
  display: flex;
  flex-direction: column;
  background-color: #eeeaed;
}
.mine-container {
  margin-top: -55px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  z-index: 2;
}
.personalCenter {
  text-align: center;
  margin-top: 30px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.header-user {
  padding: 0 16px;
  .user {
    display: flex;
    padding-top: 32px;
    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #fff;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      justify-content: center;

      .user-name {
        display: flex;
        align-items: center;

        .name {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }

        .state {
          margin-left: 4px;
          color: white;
          height: 16px;
          line-height: 16px;
          padding: 0 6px;
          border-radius: 8px;
          font-size: 8px;
        }
      }

      .id {
        color: #fff;
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}
.total-header {
  background: #f8fbffff;
  display: flex;
  font-size: 14px;
  color: #666666ff;
  line-height: 34px;
  border-radius: 8px 8px 0 0;
  .header-data-color {
    color: #2559a5ff;
  }
  div {
    flex: 1;
    text-align: center;
  }
}
.header {
  padding: 0 16px 5px;
  border-radius: 0 0 8px 8px;
  background: $content-backgroun-color;
  .total {
    padding: 16px 0;
    font-size: 14px;
    .growth {
      text-align: right;
      font-size: 14px;
    }
    .total-val {
      margin-top: 10px;
      font-size: 14px;
      color: $h1-color;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .total-val-text {
        margin-top: 10px;
        font-size: 24px;
        color: #2559a5ff;
        font-weight: 500;
      }
    }
    &-val {
      color: $h1-color;
    }
    .pledge-num {
      display: flex;
      text-align: center;
      justify-content: space-around;
      color: #666666ff;
      .num-margin {
        margin-top: 5px;
      }
    }
    .styleFlex {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .to-buy {
      color: $main-color;
      font-size: 13px;
    }
  }
}

.group {
  margin-top: 8px;
  background: $content-backgroun-color;
  border-radius: 8px;
  .cell {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px $divider-color solid;

    &:hover {
      background: #eee;
    }

    .icon {
      max-width: 24px;
    }

    .title {
      color: $h1-color;
      font-size: 14px;
      margin-left: 12px;
      flex: 1;
    }

    .desc {
      color: $h3-color;
      font-size: 13px;
      text-align: right;
      margin: 0 12px;
    }

    .more {
      max-height: 10px;
    }
  }
}
.group-capital {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  img {
    height: 31px;
    width: 31px;
  }
  .capital-t {
    text-align: center;
  }
  .title {
    margin-top: 8px;
  }
}
.popup-padding {
  padding: 30px;
  .popup-black {
    font-size: 16px;
    color: #333333ff;
    font-weight: 500;
  }
  .popup-type {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-B {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-num {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-q {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-button {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 150px;
    }
    .popup-van-quxiao {
      border-radius: 16px;
      background: #d0d0d0;
      color: #fff;
    }
    .popup-van-huazhuan {
      border-radius: 16px;
      background: #2559a5ff;
      color: #fff;
    }
  }
}
.popup-width {
  width: 50px;
}
.popup-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
</style>
