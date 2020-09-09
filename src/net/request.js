import axios from 'axios';

const fetchData = (response, resolve, reject) => {
  let json = response.data;
  if (json.ret != 200) {
    const errortext = json.msg;
    console.log(errortext);
    const error = new Error(errortext);
    error.name = json.ret;
    error.response = response;
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        language: 0,
        token: "123456"
      },
      data: jsondata,
    })
    .then(response => {
      fetchData(response, resolve, reject)
    })
    // .then(res => resolve(res))
    .catch(err => reject(err));
});

// const doFormFetch = (url, form) => new Promise((resolve, reject) => {
//   axios(url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//       },
//       data: form,
//     })
//     .then(response => {
//       resolve(response)
//     })
//     // .then(res => resolve(res))
//     .catch(err => reject(err));
// });

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
export const postRequest = (api, data) => {
  let url = '/public/';
  data = {
    s: api,
    ...data,
  }
  return doPostFetch(url, data);
};

// export const form = async (url, params) => {
//   const formdata = new FormData();
//   for (const i in params) {
//     if (Array.isArray(params[i])) {
//       params[i].forEach((item) => {
//         formdata.append(i, item);
//       });
//     } else {
//       formdata.append(i, params[i]);
//     }
//   }

//   try {
//     return await doFormFetch(url, formdata);
//   } catch (e) {}
//   return {
//     response_msg: 'network abort'
//   };
// };