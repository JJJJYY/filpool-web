<template>
  <div class="mine">
    <head-nav></head-nav>
    <div class="mine-container page-container">
      <div class="header">
        <div class="user">
          <img src="../../assets/img/logo.png" alt class="avatar" />
          <div class="user-info">
            <div class="user-name">
              <div class="name">{{userData.nickname || ''}}</div>
              <span class="state">{{levelString(userData.level)}}</span>
            </div>
            <span class="id">ID: {{userData.id}}</span>
          </div>
        </div>
        <div class="hr"></div>
        <div class="total">
          <div class="total-val">总算力: {{totalWeight | parseFloatFilter}}TB</div>
          <div style="flex: 1;"></div>
          <router-link :to="{path: '/rate'}" class="to-buy" style="margin-left: 4px;">
            <img
              src="../../assets/img/mine/user_icon_buy.png"
              style="max-height: 15px;vertical-align: bottom;margin-right: 5px;"
              alt
            />
            <span>去购买算力</span>
          </router-link>
        </div>
      </div>
      <div class="group">
        <div class="cell" @click="$router.push('/myasset')">
          <img src="../../assets/img/mine/user_center_icon_my_asset.png" alt class="icon" />
          <div class="title">资产管理</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div class="cell" @click="$router.push('/invite')">
          <img src="../../assets/img/mine/user_center_icon_invitation.png" alt class="icon" />
          <div class="title">邀请好友</div>
          <div class="desc">我的邀请码: {{userData.invitationCode}}</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div class="cell" @click="$router.push('/orderManager')">
          <img src="../../assets/img/mine/user_center_icon_odrer.png" alt class="icon" />
          <div class="title">订单管理</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div class="cell" @click="$router.push('/calcPowerManager')">
          <img src="../../assets/img/mine/user_icon_count.png" alt class="icon" />
          <div class="title">算力管理</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
      </div>
      <div class="group">
        <div class="cell" @click="$router.push('/securityCenter')">
          <img src="../../assets/img/mine/user_center_icon_account.png" alt class="icon" />
          <div class="title">账户管理</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div class="cell" @click="$router.push('/actual')">
          <img src="../../assets/img/mine/actual-icon.png" alt class="icon" />
          <div class="title">实名认证</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
        <div class="cell" @click="$router.push('/setting')">
          <img src="../../assets/img/mine/my_icon_setting.png" alt class="icon" />
          <div class="title">设置</div>
          <img class="more" src="../../assets/img/mine/tab_icon_more.png" alt />
        </div>
      </div>
    </div>
    <foot-box></foot-box>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadNav from "@/components/HeadNav";
import FootBox from "@/components/FootBox";
import { myWeightApi } from "../../net/api/userInfoApi";
export default {
  name: "Mine",
  components: {
    HeadNav,
    FootBox,
  },
  created() {
    // this.$store.dispatch('reloadUserData');
    this.loadTotalWeight();
  },
  data() {
    return {
      totalWeight: "---",
    };
  },
  computed: {
    ...mapState(["userData"]),
  },
  methods: {
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
      myWeightApi().then((res) => {
        this.totalWeight = res.data.totalWeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.mine {
  display: flex;
  flex-direction: column;
  background-color: #eeeaed;
  /*margin-top: 8px;*/
}

.header {
  padding: 0 16px;
  background: $content-backgroun-color;

  .user {
    display: flex;
    padding-top: 32px;

    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #eee;
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
          color: $h1-color;
        }

        .state {
          margin-left: 4px;
          background: #8088e1;
          color: white;
          height: 16px;
          line-height: 16px;
          padding: 0 6px;
          border-radius: 8px;
          font-size: 8px;
        }
      }

      .id {
        color: $h3-color;
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }

  .hr {
    height: 1px;
    margin-top: 24px;
    background: $divider-color;
  }

  .total {
    display: flex;
    padding: 16px 0;
    font-size: 14px;

    &-val {
      color: $h1-color;
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
</style>
