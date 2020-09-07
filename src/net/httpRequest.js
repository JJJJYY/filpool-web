import axios from 'axios';
import qs from 'qs';

const prodBaseUrl = '/';
const devBaseUrl = '';
// const devBaseUrl = '';
// const devBaseUrl = '';
function getBaseUrl(baseUrl = null) {
  if (baseUrl) {
    return baseUrl;
  } if (process.env.NODE_ENV === 'production') {
    return prodBaseUrl;
  }
  return devBaseUrl;
}
function getParams(param) {
  let url = '';
  // for (const key in param) {
  //   if (param[key] !== null) {
  //     url ? url += `&${key}=${param[key]}` : url += `${key}=${param[key]}`;
  //   }
  // }
  Object.keys(param).forEach((key) => {
    if (param[key] !== null) {
      url ? url += `&${key}=${param[key]}` : url += `${key}=${param[key]}`;
    }
  });
  return url ? `?${url}` : '';
}

export function postRequest(url, queryData, baseUrl = null, customHeaders = {

}) {
  const base = getBaseUrl(baseUrl);
  return axios.post(`${base}${url}`, qs.stringify(queryData), customHeaders);
}

// export function postTokenRequest(url, queryData, baseUrl = null, customHeaders = {
//   headers: {
//     'Content-type': 'application/json;charset=UTF-8',
//   },
// }) {
//   console.log(queryData);
//   return axios.post(`${base}${url}`, queryData, customHeaders);
// }

export function postJSONRequest(url, queryData, baseUrl = null, customHeaders = {

}) {
  const base = getBaseUrl(baseUrl);
  return axios.post(`${base}${url}`, queryData, customHeaders);
}

export function getRequest(url, queryData = {}, baseUrl = null) {
  const base = getBaseUrl(baseUrl);

  return axios.get(`${base}${url}${getParams(queryData)}`);
}

export function postUrlRequest(url, queryData = {}, baseUrl = null, customHeaders = {
    
}) {
  const base = getBaseUrl(baseUrl);
  return axios.post(`${base}${url}${getParams(queryData)}`, '', customHeaders);
}

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    console.log(`err: ${error}`); // for debug
    const res = error.response;
    if (error.response.status === 401) {
      window.location.href = res.data.data.redirect_url;
    }
    return Promise.reject(error.response);
  },
);

// create an axios instance
const BaseService = axios.create({
  baseURL: '', // api 的 base_url
  // baseURL: '/api',
  withCredentials: true,
});

// request interceptor
BaseService.interceptors.request.use(
  config => config
  // Do something before request is sent
  // if (store.getters.token) {
  // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = getToken();
  // }
  // config.headers.token = getToken();
  ,
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
BaseService.interceptors.response.use(
  response => response,
  /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  (error) => {
    console.log(`err${error}`); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  },
);

export default axios;
