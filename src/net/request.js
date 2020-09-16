import axios from 'axios';

const fetchData = (response, resolve, reject) => {
  let json = response.data;
  if (json.ret != 200) {
    reject(error);
  }
  resolve(json);
}

const doGetFetch = url => new Promise((resolve, reject) => {
  axios(url, {
      method: 'GET',
    })
    .then(response => {
      // resolve(response.data)
      fetchData(response, resolve, reject)
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
  let url = '/public/';
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
  return doGetFetch(url);
};
// post请求
export const postRequest = (api, data, baseUrl = null) => {
  if (baseUrl) {
    return doPostFetch(baseUrl, data);
  } else {
    let url = '/public/';
    data = {
      s: api,
      ...data,
    }
    return doPostFetch(url, data);
  }
};