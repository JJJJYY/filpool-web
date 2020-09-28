import axios from 'axios';
import {
  serviceURL
} from "@/config";
import {
  get,
  post
} from '../utils/corsAjax';
import {
  isH5
} from '@/utils/utilTools';
import {
  Form
} from 'vant';

const doGetFetch = url => new Promise((resolve, reject) => {
  axios(url, {
      method: 'GET',
    })
    .then(response => {
      resolve(response.data)
    })
    // .then(res => resolve(res))
    .catch(err => reject(err));
});

const doPostFetch = (url, jsondata) => new Promise((resolve, reject) => {
  axios(url, {
      method: 'POST',
      data: jsondata,
    })
    .then(response => {
      resolve(response.data)
    })
    .catch((err) => {
      reject(err)
    });
});

// get请求
export const getRequest = (api, params) => {
  let url = `${serviceURL}/public/`;
  params = {
    s: api,
    ...params,
  }
  if (params) {
    const paramsArray = [];
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  }
  if (isH5) {
    return doGetFetch(url);
  } else {
    return get(url)
  }
};
// post请求
export const postRequest = (api, data, baseUrl = null) => {
  if (baseUrl) {
    if (isH5) {
      return doPostFetch(baseUrl, data);
    } else {
      return post(baseUrl, data)
    }
  } else {
    let url = `${serviceURL}/public/`;
    data = {
      s: api,
      ...data,
    }
    if (isH5) {
      return doPostFetch(url, data);
    } else {
      return post(url, data)
    }
  }
};