import Vue from 'vue'
import Vuex from 'vuex'
import * as ajaxH5 from '../utils/ajax'
import * as ajax from '../utils/corsAjax'
import {
  isH5
} from '@/utils/utilTools';
import {
  getUserInfoApi
} from '../net/api/loginApi'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    runtime: process.env.VUE_AreloadUserDataPP_CURRENTMODE,
    navBarTitle: "?",
    userData: JSON.parse(sessionStorage.getItem("userData") || "{}") || {},
    currentWebview: null
  },
  mutations: {
    setNavBarTitle(state, val) {
      state.navBarTitle = val
    },
    setUserData(state, data) {
      state.userData = data;
    },
    setWebview(state, view) {
      state.currentWebview = view;
    }
  },
  actions: {
    reloadUserData(store) {
      let $ajax = isH5 ? ajaxH5 : ajax;
      getUserInfoApi().then(res => {
        if (res.data) {
          sessionStorage.setItem("userData", JSON.stringify(res.data));
          store.commit("setUserData", res.data);
        }
      }).catch(err => {
        console.log(err)
      })
      // return $ajax.get('/auth/login_info').then(response => {
      //   console.log('loginInfo', response);
      //   if (response.content) {
      //     sessionStorage.setItem("userData", JSON.stringify(response.content));
      //     store.commit("setUserData", response.content);
      //   }
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    refreshUserData(store) {
      let $ajax = isH5 ? ajaxH5 : ajax;
      // return $ajax.get("/auth/refreshLoginInfo").then(response => {
      //   if (response.data && response.data.content) {
      //     sessionStorage.setItem("userData", JSON.stringify(response.data.content));
      //     store.commit("setUserData", response.data.content);
      //   }
      // })
    }
  },
  modules: {}
})