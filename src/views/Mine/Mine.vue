<template>
  <div class="mine">
    <vue-pull-refresh v-model="loading" @refresh="onRefresh">
      <!-- <head-nav></head-nav> -->
      <div class="page-container-mine">
        <div class="head-nav">
          <div class="personalCenter">个人中心</div>
          <div class="header-user">
            <div class="user">
              <img src="../../assets/img/personalfil.png" alt class="avatar" />
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
        <div class="mine-container" v-if="show">
          <div class="header">
            <div class="total">
              <div class="growth" @click='growth'>算力增长明细>></div>
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
                <!-- <div>总存储空间:</div>
              <div class="total-validWeight">:</div> -->
              </div>
              <div class="styleFlex">
                <p>目前有效算力：{{ validWeight | parseFloatFilter }}T</p>
                <router-link
                  :to="{ path: '/rate' }"
                  class="to-buy"
                  style="margin-left: 4px"
                >
                  <img
                    src="../../assets/img/mine/user_icon_buy.png"
                    style="
                    max-height: 15px;
                    vertical-align: bottom;
                    margin-right: 5px;
                  "
                    alt
                  />
                  <span>去加速算力</span>
                </router-link>
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
                color="#F7A90D"
              />
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
    </vue-pull-refresh>
    <foot-box></foot-box>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadNav from "@/components/HeadNav";
import FootBox from "@/components/FootBox";
import { myWeightApi } from "@/net/api/userInfoApi";
import { PullRefresh, Progress } from "vant";
export default {
  name: "Mine",
  components: {
    HeadNav,
    FootBox,
    "vue-pull-refresh": PullRefresh,
    "van-progress": Progress
  },
  created() {
    // this.$store.dispatch('reloadUserData');
    this.loadTotalWeight();
  },
  data() {
    return {
      totalWeight: "---",
      validWeight: "---",
      maxAdj: 0,
      loading: false,
      show: false
    };
  },
  computed: {
    ...mapState(["userData"])
  },
  activated() {
    this.loadTotalWeight();
  },
  deactivated() {},
  methods: {
    growth() {
      console.log('asdsd')
      this.$router.push('/powerDetails')
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
    loadTotalWeight() {
      // 获取总算力
      myWeightApi().then(res => {
        this.totalWeight = res.data.totalWeight;
        this.validWeight = res.data.validWeight;
        this.maxAdj = res.data.maxAdj;
        this.loading = false;
        this.show = true;
      });
    },
    onRefresh() {
      this.loading = true;
      this.loadTotalWeight();
      this.$store.dispatch("reloadUserData");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.head-nav {
  height: 200px;
  background: linear-gradient(-65deg, #f0ac25 0%, #f9a808 100%);
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
  /*margin-top: 8px;*/
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
.header {
  padding: 0 16px;
  border-radius: 8px;
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
        color: #f0ac25;
        font-weight: 500;
      }
    }
    &-val {
      color: $h1-color;
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
</style>
