import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/scss/base.scss';
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
import * as ajaxH5 from '@/utils/ajax';
import * as ajax from './utils/corsAjax'
import VueCookies from 'vue-cookies'
import {
  Toast
} from 'vant';
import plusready from '@/utils/plusReady';
import VueRouter from "vue-router";
import scrollToView from '@/directives/scrollToView';
import onlyNumber from '@/directives/onlyNumber';
import scrollShow from '@/directives/scrollShow.js';
import CheckUpdate from '@/checkForUpdate';
import {
  isH5
} from '@/utils/utilTools';
import '@/checkpPlatform';

Vue.config.productionTip = false;

Vue.prototype.$isH5 = isH5;
Vue.prototype.$http = isH5 ? ajaxH5 : ajax;
Vue.use(VueCookies);
Vue.use(Toast);
Vue.directive("scrollToView", scrollToView);
Vue.directive("onlyNumber", onlyNumber);
Vue.directive("scrollShow", scrollShow);

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};
router.beforeEach((to, from, next) => {
  // let isLogin = to.meta.path === '/login' && store.state.userData.id;
  if (to.meta.needLogin && !store.state.userData.id) {
    router.push({
      path: '/login'
    })
    next();
  } else {
    next();
  }
  // else if (!isLogin) {
  //  next();
  // }
});

try {
  if (!isH5) {
    new CheckUpdate().getCurentVersion();
  }
} catch (e) {
  console.log(e)
}

require('promise.prototype.finally').shim();
new Vue({
  router,
  store,
  mounted() {
    plusready(() => {
      /*关闭启动页*/
      window.plus.navigator.closeSplashscreen();
      this.watchBack();
    })
  },
  methods: {
    watchBack() {
      let first = null;
      window.plus.key.addEventListener('backbutton', () => {
        if (this.$store.state.currentWebview) {
          this.$store.state.currentWebview.close();
          this.$store.commit("setWebview", null);
          return;
        }
        //首次按键，提示‘再按一次退出应用’
        if (this.$route.meta.isQuit) {
          if (!first) {
            first = new Date().getTime();
            Toast('再按一次退出');
            setTimeout(function () {
              first = null;
            }, 1000);
          } else {
            if (new Date().getTime() - first < 1000) {
              window.plus.runtime.quit();
            }
          }
        } else {
          this.$router.goBack();
        }
      }, false);
    }
  },
  render: h => h(App)
}).$mount('#app');