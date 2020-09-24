import {
  getRequest,
} from '../request';

export function downloadApi(data) {
  return getRequest('App.AppVersion.DownloadUrl', data);
}