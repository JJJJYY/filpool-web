import {
  isH5
} from '@/utils/utilTools';
//const serviceURL = 'http://192.168.1.22:9001';
const serviceURL = isH5 ? '' : 'https://api.filpool.io';
//http://47.56.229.55:9001
const ios = 'https://testflight.apple.com/join/4ooaLADg';
const android = 'https://filpool.oss-cn-hongkong.aliyuncs.com/app/filpool001.apk';

const pcOrigin = "https://filpool.io";
// const pcOrigin = "http://192.168.10.204:8081"
const commonHash = ["#/login", "#/register", "#/rate", "#/rate_detail"];

export const colors = [{
  "item": "#F7B500",
  "area": "#F7B500"
},
{
  "item": "#0099EA",
  "area": "#0099EA"
},
{
  "item": "#2DD8D3",
  "area": "#2DD8D3"
},
{
  "item": "#F93C53",
  "area": "#F93C53"
},
{
  "item": "#235CA8",
  "area": "#235CA8"
},
{
  "item": "#63499D",
  "area": "#63499D"
},
{
  "item": "#6DD0E0",
  "area": "#6DD0E0"
},
{
  "item": "#3C7500",
  "area": "#3C7500"
},
{
  "item": "#FF8D8D",
  "area": "#FF8D8D"
},
{
  "item": "#FF7C00",
  "area": "#FF7C00"
},
{
  "item": "#FF66CF",
  "area": "#FF66CF"
},
{
  "item": "#D28D14",
  "area": "#D28D14"
},
{
  "item": "#8901FF",
  "area": "#8901FF"
},
{
  "item": "#013EFF",
  "area": "#FF66CF"
},
{
  "item": "#00FF7E",
  "area": "#00FF7E"
},
{
  "item": "#F9BBD4",
  "area": "#F9BBD4"
},
{
  "item": "#FA887A",
  "area": "#FA887A"
},
{
  "item": "#FDCAB4",
  "area": "#FDCAB4"
},
{
  "item": "#0091FF",
  "area": "#0091FF"
},
{
  "item": "#6236FF",
  "area": "#6236FF"
}
];

export {
  serviceURL,
  pcOrigin,
  ios,
  android,
  commonHash
}