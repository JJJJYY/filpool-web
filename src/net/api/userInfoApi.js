import {
  postRequest
} from '../request';


// 登录信息
export function myWeightApi() {
  return postRequest('App.Weight.MyWeight');
}