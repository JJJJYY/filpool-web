import axios from 'axios';
import {
  Toast
} from "vant";
import router from "../router";
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.withCredentials = true;
// =>设置请求拦截器
axios.interceptors.request.use(config => {
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// =>设置响应拦截器
axios.interceptors.response.use(response => {
    if (response.config.url.includes('/public/')) {
      if (response.data.ret == 200) {
        return Promise.resolve(response);
      } else if (response.data.ret == 401) {
        // 401为请登录
        Toast(response.data.msg)
        router.push({
          path: "/login"
        })
        return Promise.reject(response);
      } else {
        Toast(response.data.msg)
        return Promise.reject(response);
      }
    }
    if (response.config.url.includes('up-z2')) {
      return Promise.resolve(response);
    } else {
      Toast('请求异常');
    }
  },
  error => {
    // console.table(error)
    // let status = error.response || '未知错误';
    console.log(`请求频繁，取消请求`);
    // router.push({
    //   path: "/login"
    // })
    return Promise.reject(error);
  }
);

export {
  axios
}