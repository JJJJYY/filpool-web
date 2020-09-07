import plusReady from './plusReady';
import { Toast } from 'vant';
import router from "@/router";
import { serviceURL } from '@/config';
//import { getCookie } from '@/utils/utilTools';
const browserService = 'http://47.57.10.160';

//参数转换处理
const stringify = (obj = {}) => {
  let str = "";
  for (let i in obj) {
    str += i + '=' + unescape(obj[i]) + '&'
  }
  return str.slice(0, -1);
};

export default (params,callback) => {
    return new Promise((resolve,reject) => {
        plusReady(() => {
            let xhr = new window.plus.net.XMLHttpRequest();
            let type = params.type && params.type.toUpperCase() || 'POST';
            let reqParams = params.data || null;
            let targetUrl = params.url.indexOf("/api/v1") === 0?browserService:serviceURL;
            let url = params.isRelative?params.url:`${targetUrl}${params.url}`;
            if (type === "GET") {
              url += `?${stringify(reqParams)}`;
            } else {
              reqParams = JSON.stringify(reqParams);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                  let res = JSON.parse(xhr.responseText);
                  if (xhr.status === 200 || xhr.status === 304) {
                    if (res.responseCode === "00" || res.status === "success") {
                      resolve(res);
                    } else {
                      Toast(res.responseMsg || '请求服务器失败');
                      if(res.responseCode === 'b000001') {
                        router.push({path: "/login"});
                      }
                      reject();
                    }
                  } else {
                    Toast("请求服务器失败");
                  }
                  typeof callback === 'function' && callback(res)
                }
              };
              xhr.open( type, url );
              if (type === 'POST') {
                let contentType = params['Content-Type'] || 'application/json';
                xhr.setRequestHeader('Content-Type',contentType);
              }
              if (params.config && params.config.headers) {
                if (params.config.responseType) {
                  xhr.responseType = params.config.responseType;
                }
                for (let field in params.config.headers) {
                  xhr.setRequestHeader(field, params.config.headers[field]);
                }
              }

              xhr.send(reqParams);
        })
    })
}