import axios from 'axios';
import {
  Toast
} from "vant";
import router from "../router";
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.withCredentials = true;
// =>设置请求拦截器
axios.interceptors.request.use(config => {
    // let userInfoStr = sessionStorage.getItem('userInfo');
    // let userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
    if (config.headers && config.headers.common) {
      // config.headers.common['token'] = userInfo.token || sessionStorage.getItem('token');
      // config.headers.common['language'] = sessionStorage.getItem('lang') || 'zh_CN';
      // config.headers.common['language'] = 0;
      // config.headers.common['Cookie'] = `APP_COOKIE=${window.localStorage.getItem('APP_COOKIE')}`
      config.headers.common['token'] = window.localStorage.getItem('token')
      //config.headers.common['APP_COOKIE'] = getCookie("APP_COOKIE")
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// =>设置响应拦截器
axios.interceptors.response.use(response => {
    if (response.config.url.includes('/public/')) {
      if (response.data.ret !== 200) {
        Toast(response.data.msg);
        return Promise.reject(response);
      }
      return Promise.resolve(response);
    }



    if (response.status === 200) {
      /*特殊处理blob数据*/
      if (response.config.responseType) {
        return Promise.resolve(response.data);
      }
      if (response.data.responseCode === "00" || response.data.status === "success") {
        return Promise.resolve(response.data);
      } else {
        Toast(response.data.responseMsg || '请求服务器失败');
        // if (response.data.responseCode === 'b000001') {
        //   router.push({
        //     path: "/login"
        //   })
        // }
        return Promise.reject(response.data);
      }
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    let status = error && error.response && error.response.status || '';
    Toast(`请求服务器失败 ${status}`);
    router.push({
      path: "/login"
    })
    return Promise.reject(error);
  }
);

export {
  axios
}