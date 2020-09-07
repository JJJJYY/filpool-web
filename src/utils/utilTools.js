const agent = navigator.userAgent;
/*android端*/
const isAndroid = () => {
    return agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;
};
/*Ios端*/
const isiOS = () => {
    return !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};
/*微信*/
const isWeixin = () => {
    return !!/MicroMessenger/i.test(agent);
};
//设置cookies
const setCookie = (name,value, delay) => {
  let date = new Date();
  date.setTime(date.getTime() + delay);
  document.cookie = name + "="+ escape (value) + ";expires=" + date.toGMTString();
};
//读取cookies
const getCookie = (name) => {
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if(arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};
//删除cookies
const delCookie = (name) => {
  var date = new Date();
  date.setTime(date.getTime() - 1);
  var cval = getCookie(name);
  if(cval!=null) {
    document.cookie= name + "="+cval+";expires="+date.toGMTString();
  }
};
/*判断safari浏览器*/
const isSafari = () => {
  return /Apple/.test(navigator.vendor);
};
const createWebview = (url, id, titleParams) => {
  let titleConfig = {
      backgroundColor: '#fff',
      titleText: 'filpcoin',
      titleColor: '#24375E',
      autoBackButton: true,
      titleSize: '18px'
  };
  let config = Object.assign({}, titleConfig, titleParams);
  return window.plus.webview.create(url, id, {
    titleNView: config
  });
};
/*时间格式化*/
const formatDate = (dateStr, format) => {
  if (isSafari() && isNaN(dateStr)) {
    dateStr = dateStr.replace(/(\d{2})(\d{2})$/, "$1:$2");
  }
  let dateObejct = new Date(dateStr);
  let date = {
    "M+": dateObejct.getMonth() + 1,
    "d+": dateObejct.getDate(),
    "h+": dateObejct.getHours(),
    "m+": dateObejct.getMinutes(),
    "s+": dateObejct.getSeconds(),
    "q+": Math.floor((dateObejct.getMonth() + 3) / 3),
    "S+": dateObejct.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dateObejct.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
/*下载并保存图片到相册*/
const downloadImg = (url) => {
  return new Promise((resolve, reject) => {
      //图片保存到手机后的路径
      //picname="_downloads/erwei.png";
      let dtask = window.plus.downloader.createDownload(url, {}, function ( d, status ) {
          if ( status === 200 ) {
            window.plus.gallery.save(d.filename,function() {//保存到相册方法
              resolve();
            }, function() {
              reject("保存失败");
            });
            saveToGallery(d.filename).then(() => {
              resolve();
            }).catch((err) => {
              reject(err);
            })
          } else {
            reject("下载图片失败");
          }
      });
      dtask.start();
  })
};
//保存到相册方法
const saveToGallery = (path) => {
  return new Promise((resolve, reject) => {
    window.plus.gallery.save(path,function() {
      resolve();
    }, function() {
      reject("保存失败");
    });
  });
};

/*保存base64图片*/
const saveBase64Img = (data64) => {
  return new Promise((resolve, reject) => {
    let bm = new window.plus.nativeObj.Bitmap("barcode");
    bm.loadBase64Data(data64, function () {
      let path ="_doc/invite_code.jpg";
      let options = {"overwrite":true,"format":"jpg","quality":50};
      bm.save( path, options, (event) => {
        saveToGallery(event.target).then(() => {
          resolve();
          //保存到相册后，回收Bitmap图片内存
          bm.recycle();
        }).catch((err) => {
          reject(err);
        })
      }, () => {
        reject("保存失败");
      });//将图片保存到指定的路径（仅支持本地文件系统）
    });//加载base64为数据到bm实例对象
  });
};
/*处理字节大小*/
const bytesToSize = (size) => {
  if (!size || size === '0') {
    return size;
  }
  let num = 1024.00;
  let sizeList = ['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
  let index = Math.floor(Math.log(size)/Math.log(num));
  let precision = size>num?3:0;
  return (size / Math.pow(num, index)).toFixed(precision) + ` ${sizeList[index]}`;
};
/*以，分隔数字*/
const formatNumber = (amount, splitor = ",") => {
  if (Number(amount) > 1000 && !isNaN(amount)) {
    let numAry = String(amount).split('.');
    let numStr = numAry[0].split("").reverse().join("");
    let length = numStr.length;
    let newStr = numStr.replace(/\d{3}/gi, function(a, b){
      if (b/3 + 1 < Math.ceil(length/3)) {
        return a + splitor;
      } else {
        return a;
      }
    });
    return newStr.split("").reverse().join("") + (numAry[1]?`.${numAry[1]}`:'');
  }
  return amount;
};
/*随机颜色*/
const getRandomColor = function(){
  return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);
};
/*const getFormatTime = function (time) {
    const formatStr = this.$i18n.locale === 'en_US'
        ? "MMM Do YYYY HH:mm:ss (UTCZ)"
        : "YYYY-MM-DD HH:mm:ss (UTCZ)";
    return dayjs(time * 1000).format(formatStr);
};*/
/*动态字符串
* @param str 动态字符串
* @param obj 对象
*/
const regExpTemplate = (str, obj) => {
  return str.replace(/\${[^}]+}/g,  (variableStr) => {
    let variable = variableStr.replace(/\${(.+)}/, "$1");
    return obj[variable];
  })
};
/*判断h5页面*/
const isH5 = process.env.VUE_APP_CURRENTMODE !== 'production';
/*下载谷歌验证器*/
const appStore = 'https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8';
const googlePlay = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2';

export {
  isAndroid,
  isiOS,
  isWeixin,
  isH5,
  isSafari,
  appStore,
  googlePlay,
  setCookie,
  getCookie,
  delCookie,
  createWebview,
  formatDate,
  downloadImg,
  saveBase64Img,
  bytesToSize,
  formatNumber,
  getRandomColor,
  //getFormatTime,
  regExpTemplate
}