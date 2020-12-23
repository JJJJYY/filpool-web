<template>
  <div>
    <head-nav></head-nav>
    <div class="page-container">
      <div class="list">
        <!-- <div class="cell" @click="$router.push('/aboutUs')">
          <div class="name">关于我们</div>
          <img
            class="more"
            src="../../../assets/img/mine/tab_icon_more.png"
            alt
          />
        </div>
        <div class="cell" @click="showAircle">
          <div class="name">用户协议</div>
          <img
            class="more"
            src="../../../assets/img/mine/tab_icon_more.png"
            alt
          />
        </div> -->
        <div class="cell" @click="checkUpdate" v-if="!$isH5">
          <div class="name">检查更新</div>
          <div class="check-box flex-box" v-if="!checking">
            <span style="margin-right: 8px">{{ versionCode }}</span>
            <img
              v-if="!checking"
              class="more"
              src="../../../assets/img/mine/tab_icon_more.png"
              alt
            />
          </div>
          <van-loading v-else size="24px" class="flex-box">
            <span style="font-size: 15px">正在检查更新...</span>
          </van-loading>
        </div>
      </div>
      <button class="logout btn-gradient" @click="logout">退出账号</button>
    </div>
  </div>
</template>

<script>
import { Dialog, Loading, Toast } from "vant";
import HeadNav from "@/components/HeadNav";
import { createWebview } from "@/utils/utilTools";
import CheckUpdate from "@/checkForUpdate";
import plusReady from "@/utils/plusReady";
import { logoutApi } from "@/net/api/loginApi";

export default {
  name: "Setting",
  components: {
    HeadNav,
    [Dialog.Component.name]: Dialog.Component,
    [Loading.name]: Loading
  },
  data() {
    return {
      checking: false,
      version: "",
      versionCode: ""
    };
  },
  mounted() {
    plusReady(() => {
      window.plus.runtime.getProperty(window.plus.runtime.appid, inf => {
        this.versionCode = inf.versionCode;
        this.version = `v${inf.version}`;
      });
    });
  },
  methods: {
    logout() {
      Dialog.confirm({
        message: "是否退出当前账户？",
        confirmButtonColor: "#2559A5FF"
      }).then(() => {
        logoutApi().then(res => {
          if (res.ret === 200) {
            window.localStorage.clear();
            this.$store.commit("setUserData", {});
            this.$router.replace({ path: "/login" });
          }
        });
      });
    },
    /*查看用户协议*/
    showAircle() {
      this.$router.push({
        path: "/ServiceDetail"
      });
      /*let url = 'https://www.bpool.io/user/xieyi.html';
        if (this.$isH5) {
          window.location.href = url;
        } else {
          let webview = createWebview(url, 'xieyi', {titleText: '用户协议'});
          webview.show('slide-in-right');
          this.$store.commit("setWebview", webview);
        }*/
    },
    checkUpdate() {
      this.checking = true;
      new CheckUpdate(false, msg => {
        if (msg) {
          Toast(msg);
        }
        this.checking = false;
      }).getCurentVersion();
      setTimeout(() => {
        this.checking = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base";

.list {
  /*margin-top: 8px;*/
}

.cell {
  background: $content-backgroun-color;
  padding: 0 16px;
  display: flex;
  font-size: 14px;
  align-items: center;
  border-bottom: 1px $divider-color solid;
  height: 50px;
  .name {
    color: $h2-color;
    flex: 1;
  }
  .check-box {
    color: #575c62;
    font-size: 14px;
  }
  .desc {
    color: $h3-color;
    margin: 0 12px;
  }

  img.more {
    height: 10px;
  }
}

.logout {
  display: block;
  width: 80%;
  margin: 56px auto;
  height: 44px;
  border-radius: 22px;
}
</style>
