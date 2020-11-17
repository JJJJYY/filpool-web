import {
  getRequest,
} from '../request';

//banner
export function getGeneralBannerApi() {
  return getRequest('App.Banner.List');
}

// 商品列表
export function getGoodListApi() {
  return getRequest('App.Goods.List');
}

// 公告列表
export function getNoticeListApi(params) {
  return getRequest('App.Announcement.List', params);
}
// 公告详情
export function getNoticeDetailListApi(params) {
  return getRequest('App.Announcement.Detail', params);
}


// 官方视频
export function getVideoListApi() {
  return getRequest('App.LinksInfo.Advertisement');
}

// 合作伙伴
export function getPartnerListApi() {
  return getRequest('App.PartnerInfo.List');
}
// 存储空间
export function getPoolInfoApi(data, fun) {
  return getRequest('App.PoolInfo.Info', data, fun);
}