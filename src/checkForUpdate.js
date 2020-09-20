import * as ajax from '@/utils/corsAjax'
import plusReady from '@/utils/plusReady.js'
import {
  versionAip
} from './net/api/userInfoApi'
import {
  Dialog,
  Toast
} from 'vant';
import {
  isiOS
} from '@/utils/utilTools';
let wgtVer = null;
let versionCode = null;
let wgtUrl = '';
class CheckUpdate {
  constructor(isAuto = true, callback) {
    this.isAuto = isAuto;
    this.callback = callback;
    //this.getCurentVersion();
  }
  getCurentVersion() {
    let self = this;
    plusReady(() => {
      console.log(window.plus)
      console.log(window.plus.runtime)
      // console.log(window.plus.runtime.version)
      window.plus.runtime.getProperty(window.plus.runtime.appid, function (inf) {
        console.log(inf)
        wgtVer = inf.version;
        versionCode = inf.versionCode;
        self.getServiceVersion(wgtVer, inf, versionCode)
      });
    })
  } ///asset/appVersion
  getServiceVersion() {
    let platform = isiOS() ? 'iOS' : 'android';
    console.log('wgtVer', wgtVer);
    console.log('platform', platform);
    console.log('versionCode', versionCode);
    // ajax.get('/asset/appVersion', {
    //   version: wgtVer,
    //   platform: platform,
    //   build: versionCode
    // })
    versionAip({
        version: wgtVer,
        platform: platform,
        build: versionCode
      })
      .then((response) => {
        console.log('response', response);
        if(response.data) {
          let resData = response.data;
          Dialog.confirm({
            title: '新版本上线啦!~',
            // message: resData.description,
            message: '修改bug，bug,bug',
            confirmButtonText: "前往下载",
            showCancelButton: false,
            beforeClose: (action, done) => {
              if (action === 'confirm') {
                let downloadURL = resData.downloadURL || "https://www.filpool.io/#/download";
                window.plus.runtime.openURL(downloadURL);
              } else {
                done(false);
              }
            }
          })
          // this.downWgt();
        } else {
          this.handleCallBack("已经是最新版本");
        }
        /*let newVer = response && response.data.flag;
        wgtUrl = response && response.data.fileName;*/
        // if (wgtVer === resData.version) {
        //   this.handleCallBack("已经是最新版本");
        //   return;
        // }
        // if (resData.updateType === 1) {
        //   Dialog.confirm({
        //     title: resData.updateTitle,
        //     message: resData.updateDetails,
        //     confirmButtonText: "前往下载",
        //     showCancelButton: false,
        //     beforeClose: (action, done) => {
        //       if (action === 'confirm') {
        //         let downloadURL = resData.downloadURL || "https://www.filpool.io/#/download";
        //         window.plus.runtime.openURL(downloadURL);
        //       } else {
        //         done(false);
        //       }
        //     }
        //   })
        // } else if (this.hasUpdate(resData.version) && !localStorage.getItem("closeUpdate")) {
        //   wgtUrl = isiOS() ? resData.appUrlIos : resData.appUrlAndroid;
        //   if (!wgtUrl) {
        //     return;
        //   }
        //   if (this.isAuto === false) {
        //     this.downWgt();
        //   } else {
        //     Dialog.confirm({
        //       title: "更新提示",
        //       message: "系统检测到有新版本，是否马上更新？",
        //       cancelButtonText: "不再提示"
        //     }).then(() => {
        //       this.downWgt();
        //     }).catch(() => {
        //       Toast("关闭后可在设置中手动检查更新");
        //       localStorage.setItem("closeUpdate", "true");
        //     })
        //   }
        // } else {
        //   this.handleCallBack("无版本更新");
        // }
      }).catch((err) => {
        this.handleCallBack("已经是最新版本");
      })
  }
  // hasUpdate(version) {
  //   let currentVersion = Number(wgtVer.replace(/\./g, ""));
  //   let newVersion = Number(version.replace(/\./g, ""));
  //   return newVersion > currentVersion;
  // }
  downWgt() {
    let that = this;
    window.plus.nativeUI.showWaiting("正在下载安装包...");
    window.plus.downloader.createDownload('https://www.filpool.io/#/download', {
      filename: "_doc/update/"
    }, function (d, status) {
      window.plus.nativeUI.closeWaiting();
      if (status == 200) {
        that.installWgt(d.filename); // 安装wgt包
      } else {
        //window.plus.nativeUI.alert("下载wgt失败！");
      }
      that.handleCallBack();
      //window.plus.nativeUI.closeWaiting();
    }, function () {
      window.plus.nativeUI.closeWaiting();
      //window.plus.nativeUI.alert("下载wgt失败！");
      that.handleCallBack("下载wgt失败！");
    }).start();
  }
  installWgt(path) {
    let that = this;
    window.plus.nativeUI.showWaiting("正在安装更新...");
    window.plus.runtime.install(path, {}, function () {
      window.plus.nativeUI.closeWaiting();
      /*window.plus.nativeUI.alert("应用资源更新完成！",function(){
          window.plus.runtime.restart();
      });*/
      Dialog.confirm({
        title: "更新提示",
        message: "更新完成，重启后即可升级至最新版本，是否马上重启？",
        confirmButtonText: "马上重启",
        cancelButtonText: "稍候重启"
      }).then(() => {
        window.plus.runtime.restart();
      });
      that.handleCallBack();
    }, function (e) {
      that.handleCallBack("安装wgt文件失败[" + e.code + "]：" + e.message);
    });
  }
  handleCallBack(msg) {
    if (this.callback) {
      this.callback(msg);
    }
  }
}

export default CheckUpdate
