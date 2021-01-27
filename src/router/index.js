import Vue from 'vue'
import VueRouter from 'vue-router';
import OpenIframe from '@/views/OpenIframe';

// 解决路由重复跳转导致回调报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "index" */ '../views/Home/Home.vue'),
    meta: {
      showTabBar: true,
      title: "FILPool.io",
      backBtnHidden: true,
      isQuit: true
    }
  },
  {
    path: '/rate',
    name: 'rate',
    component: () => import( /* webpackChunkName: "count" */ '../views/calcPower/CalcPower'),
    meta: {
      showTabBar: true,
      title: "云算力",
      backBtnHidden: true,
      isQuit: true
    }
  },
  {
    path: '/saveMoney',
    name: 'saveMoney',
    component: () => import( /* webpackChunkName: "count" */ '../views/saveMoney/saveMoney.vue'),
    meta: {
      showTabBar: true,
      title: "存比宝",
      backBtnHidden: true,
      isQuit: true
    }
  },
  {
    path: '/ServiceDetail',
    name: 'ServiceDetail',
    component: () => import( /* webpackChunkName: "count" */ '../views/ServiceDetail'),
    meta: {}
  },
  {
    path: '/rate_detail/:id?/:amount?',
    name: 'rate_detail',
    component: () => import( /* webpackChunkName: "count" */ '../views/calcPower/ProductDetail'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/saveMoneyDetail',
    name: 'saveMoneyDetail',
    component: () => import( /* webpackChunkName: "count" */ '../components/saveMoneyDetail.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/rule',
    name: 'rule',
    component: () => import( /* webpackChunkName: "count" */ '../components/rule.vue'),
    meta: {
      title: '参与细则'
    }
  },
  {
    path: '/interest',
    name: 'interest',
    component: () => import( /* webpackChunkName: "count" */ '../components/interest.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/makeOver',
    name: 'makeOver',
    component: () => import( /* webpackChunkName: "count" */ '../components/makeOver.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/Mine'),
    meta: {
      showTabBar: true,
      title: "个人中心",
      backBtnHidden: true,
      needLogin: true,
      isQuit: true
    }
  }, {
    path: '/classroom',
    name: 'Classroom',
    component: () => import('../views/Home/Classroom'),
    meta: {
      title: '进阶小课堂'
    }
  }, {
    path: '/HelpCenter',
    name: 'HelpCenter',
    component: () => import( /* webpackChunkName: "HelpCenter" */ '../views/Home/HelpCenter'),
    meta: {
      title: '帮助中心'
    }
  },
  {
    path: '/NoticeList',
    name: 'NoticeList',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Home/NoticeList'),
    meta: {
      title: '公告'
    }
  },
  {
    path: '/helpDetail',
    name: 'HelpDetail',
    component: () => import( /* webpackChunkName: "HelpCenter" */ '../views/Home/HelpDetail'),
    meta: {
      title: ''
    }
  }, {
    path: '/countPay',
    name: 'ContPay',
    component: () => import( /* webpackChunkName: "count" */ '../views/calcPower/CalcPay'),
    meta: {
      title: "支付订单"
    }
  }, {
    path: '/countPayCompletion',
    name: 'CalcPowerBuyCompletion',
    component: () => import( /* webpackChunkName: "count" */ '../views/calcPower/CalcPowerBuyCompletion'),
    meta: {
      title: "支付完成",
      backBtnHidden: true
    }
  }, {
    path: '/myasset',
    name: 'MyAsset',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/MyAsset'),
    meta: {
      title: "我的资产",
      needLogin: true
    }
  }, {
    path: '/selectCurrency',
    name: 'CurrencySelect',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/CurrencySelect'),
    meta: {
      title: "选择币种"
    }
  }, {
    path: '/currencyTopup',
    name: 'CurrencyTopup',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/CurrencyTopup'),
    meta: {
      title: "充币",
      navBarHidden: true
    }
  }, {
    path: '/currencyExtract',
    name: 'CurrencyExtract',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/CurrencyExtract.vue'),
    meta: {
      title: "提币",
      navBarHidden: true
    }
  }, {
    path: '/topupExtractRecode',
    name: 'TopupExtractRecode',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/TopupExtractRecode'),
    meta: {
      title: ''
    }
  }, {
    path: '/topupExtractRecodeDetail',
    name: 'TopupExtractRecodeDetail',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/TopupExtractRecodeDetail'),
    meta: {
      title: '交易详情'
    }
  }, {
    path: '/orderManager',
    name: 'OrderManager',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/OrderManager'),
    meta: {
      title: '订单管理',
      needLogin: true
    }
  }, {
    path: '/calcPowerManager',
    name: 'CalcPowerManager',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/CalcPowerManager'),
    meta: {
      title: '算力管理',
      needLogin: true
    }
  }, {
    path: '/calcPowerReward',
    name: 'CalcPowerReward',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/CalcPowerReward'),
    meta: {
      title: '算力明细',
      needLogin: true
    }
  }, {
    path: '/securityCenter',
    name: 'SecurityCenter',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/SecurityCenter/SecurityCenter'),
    meta: {
      title: '账户中心',
      needLogin: true
    }
  }, {
    path: '/securityLoginPwd',
    name: 'SecurityLoginPwd',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/SecurityCenter/SecurityLoginPwd'),
    meta: {
      title: '登录密码'
    }
  }, {
    path: '/securityEmailPwd',
    name: 'SecurityEmailPwd',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/SecurityCenter/SecurityEmailPwd'),
    meta: {
      title: '修改邮箱'
    }
  }, {
    path: '/securityTransPwd',
    name: 'SecurityTransPwd',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/SecurityCenter/SecurityTransPwd'),
    meta: {
      title: '修改资金密码'
    }
  }, {
    path: '/securityMobileModify',
    name: 'SecurityMobileModify',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/SecurityCenter/SecurityMobileModify'),
    meta: {
      title: '修改绑定手机号码'
    }
  }, {
    path: '/actual',
    name: 'actual',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/actual'),
    meta: {
      title: '实名认证'
    }
  }, {
    path: '/setting',
    name: 'Setting',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/Setting/Setting'),
    meta: {
      title: '设置'
    }
  }, {
    path: '/invite',
    name: 'Invite',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/Invite/Invite'),
    meta: {
      title: '邀请好友下载APP',
      needLogin: true
    }
  }, {
    path: '/inviteReward',
    name: 'InviteReward',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/Invite/InviteReward'),
    meta: {
      title: '我的奖励',
      needLogin: true
    },
  }, {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/Login'),
    meta: {}
  }, {
    path: '/forgetPwd',
    name: 'ForgetPwd',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/ForgetPwd'),
    meta: {
      isQuit: true,
    }
  }, {
    path: '/resetPwd',
    name: 'ResetPwd',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/ResetPwd')
  }, {
    path: '/register/:inviteCode?',
    name: 'Register',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/Register'),
    meta: {
      isQuit: true,
    }
  }, {
    path: '/setTransPwd',
    name: 'SetTransPwd',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/SetTransPwd')
  }, {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import('../views/Home/Dynamic'),
    meta: {
      title: '项目动态'
    }
  }, {
    meta: {
      title: '用户协议'
    },
    path: '/UserAgreement',
    name: 'UserAgreement',
    component: () => import('../views/Mine/Setting/UserAgreement')
  }, {
    path: '/AboutUs',
    name: 'AboutUs',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/Setting/AboutUs'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/googleBind',
    name: 'googleBind',
    component: () => import( /* webpackChunkName: "mine" */ '@/views/Mine/google/GoogleBind'),
    meta: {
      title: '谷歌验证'
    }
  },
  {
    path: '/googleModify',
    name: 'googleModify',
    component: () => import( /* webpackChunkName: "mine" */ '@/views/Mine/google/GoogleModify'),
    meta: {
      title: '谷歌验证'
    }
  }, {
    path: '/embed',
    name: 'Embed',
    component: () => import('../views/Embed')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import( /* webpackChunkName: "download" */ '@/views/Download'),
    meta: {
      title: '下载FILPool'
    }
  },
  {
    path: '/openIframe',
    name: 'openIframe',
    component: OpenIframe
  },
  {
    path: '/assetDetails',
    name: 'assetDetails',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/assetDetails/assetDetails.vue'),
    meta: {
      title: "资产明细",
      needLogin: true
    }
  },
  {
    path: '/availableAssets',
    name: 'availableAssets',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/availableAssets/availableAssets.vue'),
    meta: {
      title: "可用资产",
      needLogin: true
    }
  },
  {
    path: '/frozen',
    name: 'frozen',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/frozen/frozen.vue'),
    meta: {
      title: "冻结资产",
      needLogin: true
    }
  },
  {
    path: '/loan',
    name: 'loan',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/loan/loan.vue'),
    meta: {
      title: "借贷资金",
      needLogin: true
    }
  },
  {
    path: '/powerDetails',
    name: 'powerDetails',
    component: () => import( /* webpackChunkName: "mine" */ '../views/Mine/powerDetails/powerDetails.vue'),
    meta: {
      title: "详情",
      needLogin: true
    }
  },
  // {
  //   path: '/market',
  //   name: 'market',
  //   component: () => import( /* webpackChunkName: "mine" */ '../views/market/market.vue'),
  //   meta: {
  //     showTabBar: true,
  //     title: "行情",
  //     backBtnHidden: true,
  //     isQuit: true
  //   }
  // },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router