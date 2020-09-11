import {
  postRequest
} from '../request';

// 获取总算力
export function myWeightApi(data) {
  return postRequest('App.Weight.MyWeight', data);
}
// 获取钱包
export function myBalanceApi() {
  return postRequest('App.Balance.My');
}

// 获取币种
export function assetTypeApi() {
  return postRequest('App.Asset.Tokens');
}
// 充值地址
export function userAddressApi(data) {
  return postRequest('App.DepositAddress.UserAddress', data);
}
// 充值记录
export function rechargeRecordApi(data) {
  return postRequest('App.Deposit.RechargeRecord', data);
}
// 提现记录
export function withdrawalApi(data) {
  return postRequest('App.Withdrawal.WithdrawRecord', data);
}

// 邀请好友
export function distributionDetailApi() {
  return postRequest('App.AuthUser.DistributionDetail')
}
// 邀请记录
export function inviteRecordApi() {
  return postRequest('App.AuthUser.InviteRecord')
}

// 推广订单记录
export function rewardRecordApi() {
  return postRequest('App.BalanceModify.RewardRecord');
}
// 订单列表
export function orderListApi(data) {
  return postRequest('App.Weight.OrderList', data);
}

// 算力管理
export function myWeightGroupApi() {
  return postRequest('App.Weight.MyWeightGroup')
}
// 修改密码
export function modifyPasswordApi(data) {
  return postRequest('App.AuthUser.ModifyPassword', data)
}
// 登录后发送验证码
export function authSendApi(data) {
  return postRequest('App.SMS.AuthSend', data)
}
// 修改手机号码
export function modifyPhoneApi(data) {
  return postRequest('App.AuthUser.ModifyPhone', data)
}
// 修改邮箱
export function modifyEmailApi(data) {
  return postRequest('App.AuthUser.ModifyEmail', data)
}
// 创建谷歌秘钥
export function createGaApi() {
  return postRequest('App.AuthUser.CreateGa')
}
// 绑定谷歌验证
export function bindGaApi(data) {
  return postRequest('App.AuthUser.BindGa', data)
}
// 旧谷歌验证
export function checkOldGaApi(data) {
  return postRequest('App.AuthUser.CheckOldGa', data)
}