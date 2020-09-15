<template>
  <div class="uploadBox">
    <img :src="loadImgUrl ? loadImgUrl : value" class="bg" alt />
    <p class="text">{{ text }}</p>
    <div class="uploadButtonBox">
      <van-button
        icon="photo"
        type="primary"
        style="width: 120px;"
        color="#f18a2d"
        :loading="loading"
        loading-text="正在上传"
      >上传</van-button>
      <input type="file" accept="image/*" class="uploadInput" @change="onChange" v-if="isH5" />
    </div>
  </div>
</template>

<script>
import { Button, Toast } from "vant";
import { isH5 } from "@/utils/utilTools";
import { serviceURL } from "@/config";
import { getTokenApi, filePictureApi } from "../net/api/userInfoApi";

export default {
  name: "Uploader",
  props: {
    text: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      loadImgUrl: "",
      loading: false,
      isH5: isH5,
      token: "",
    };
  },
  created() {
    getTokenApi().then((res) => {
      this.token = res.data;
    });
  },
  methods: {
    onChange(event) {
      if (event.target.files && event.target.files.length === 0) {
        return;
      }
      let file = event.target.files[0];
      let formData = new FormData();
      this.loading = true;
      formData.append("file", file);
      formData.append("token", this.token);
      filePictureApi(formData, "https://up-z2.qiniup.com/")
        .then((res) => {
          this.loading = false;
          this.loadImgUrl = URL.createObjectURL(file);
          this.$emit("input", res.key);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // openAcsheel() {
    //   let actions = [
    //     {
    //       title: "拍照"
    //     },
    //     {
    //       title: "从手机相册选择"
    //     }
    //   ];
    //   window.plus.nativeUI.actionSheet(
    //     {
    //       title: "选择图片",
    //       cancel: "取消",
    //       buttons: actions
    //     },
    //     btn => {
    //       /*actionSheet 按钮点击事件*/
    //       switch (btn.index) {
    //         case 0:
    //           break;
    //         case 1:
    //           this.getImage(); /*拍照*/
    //           break;
    //         case 2:
    //           this.galleryImg(); /*打开相册*/
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   );
    // },
    // /*拍照*/
    // getImage() {
    //   let cmr = window.plus.camera.getCamera();
    //   cmr.captureImage(path => {
    //     this.checkImgSize(path, true);
    //     //this.uploadByPlus(path);
    //   });
    // },
    // /*从相册选择*/
    // galleryImg() {
    //   window.plus.gallery.pick(
    //     path => {
    //       this.checkImgSize(path);
    //       //this.uploadByPlus(path);
    //     },
    //     function() {
    //       console.log("取消选择图片");
    //     },
    //     { filter: "image" }
    //   );
    // },
    // /*检查图片大小，超过2M压缩*/
    // checkImgSize(path, overwrite) {
    //   window.plus.io.getFileInfo({
    //     filePath: path,
    //     success: res => {
    //       if (res.size / (1024 * 1024) > 2) {
    //         let matchArr = path.match(/\/[^\/]+\.[a-zA-Z]+$/g);
    //         let fileName = matchArr[0].slice(1);
    //         let targetPath = `_doc/${fileName}${overwrite ? "" : "(1)"}`;
    //         window.plus.zip.compressImage(
    //           {
    //             src: path,
    //             dst: targetPath,
    //             overwrite: !!overwrite
    //           },
    //           () => {
    //             this.uploadByPlus(targetPath);
    //           },
    //           () => {}
    //         );
    //       } else {
    //         this.uploadByPlus(path);
    //       }
    //     }
    //   });
    // },
    // uploadByPlus(path) {
    //   this.loading = true;
    //   let task = window.plus.uploader.createUpload(
    //     `${serviceURL}/setting/upload`,
    //     { blocksize: 2000 },
    //     (t, status) => {
    //       let resData = JSON.parse(t.responseText);
    //       this.loading = false;
    //       // 上传完成
    //       if (resData.responseCode === "00") {
    //         this.loadImgUrl = resData.content;
    //         this.$emit("input", resData.content);
    //       } else {
    //         Toast(resData.responseMsg);
    //       }
    //     }
    //   );
    //   task.addFile(path, { key: "file" });
    //   task.start();
    // }
  },
};
</script>

<style lang="scss" scoped>
.uploadBox {
  width: 160px;
  text-align: center;
  margin: 30px auto;
  .bg {
    width: 100%;
    height: 95px;
  }

  .text {
    margin-top: 8px;
  }

  .uploadButtonBox {
    position: relative;
    margin-top: 10px;
    .uploadButton {
      width: 99px;
      height: 28px;
      background: linear-gradient(
        90deg,
        rgba(241, 138, 45, 1) 0%,
        rgba(252, 177, 80, 1) 100%
      );
      border-radius: 14px;
      margin-top: 18px;
      color: #fff;
    }

    .uploadInput {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
