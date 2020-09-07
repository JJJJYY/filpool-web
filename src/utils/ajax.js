import {axios} from '@/utils/axios.js';

const qs = require('qs');


//参数转换处理
const stringify = (obj) => {
  let str = "";
  for (let i in obj) {
    str += i + '=' + unescape(obj[i]) + '&'
  }
  return str.slice(0, -1);
};

const post = (url, data = {}, config = {
  // withCredentials: true
}) => {
  if (data instanceof FormData) {     //目前用于上传图片
    return axios.post(url, data, config);
  } else if (config.postType === 'form') {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return axios.post(url, qs.stringify(data), config);
  } else {
    return axios.post(url, JSON.stringify(data), config);
  }
};

const get = (url, data, config) => {
  let reqURL = data ? `${url}?${stringify(data)}` : url;
  return axios.get(reqURL, config);
};

export {
  post,
  get
}
