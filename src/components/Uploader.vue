<template>
  <div class="uploadBox">
    <img :src="loadImgUrl ? loadImgUrl : value" class="bg" alt />
    <p class="text">{{ text }}</p>
    <div class="uploadButtonBox">
      <van-button
        icon="photo"
        type="primary"
        style="width: 120px"
        color="#f18a2d"
        :loading="loading"
        loading-text="正在上传"
        @click="openAcsheel"
        >上传</van-button
      >
      <input
        type="file"
        accept="image/*"
        class="uploadInput"
        @change="onChange"
        v-if="isH5"
      />
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
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      loadImgUrl: "",
      loading: false,
      isH5: isH5,
      token: ""
    };
  },
  created() {
    getTokenApi().then(res => {
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
        .then(res => {
          this.loading = false;
          this.loadImgUrl = URL.createObjectURL(file);
          this.$emit("input", res.key);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openAcsheel() {
      let actions = [
        {
          title: "拍照"
        },
        {
          title: "从手机相册选择"
        }
      ];
      window.plus.nativeUI.actionSheet(
        {
          title: "选择上传方式",
          cancel: "取消",
          buttons: actions
        },
        btn => {
          /*actionSheet 按钮点击事件*/
          switch (btn.index) {
            case 0:
              break;
            case 1:
              this.getImage(); /*拍照*/
              break;
            case 2:
              this.galleryImg(); /*打开相册*/
              break;
            default:
              break;
          }
        }
      );
    },
    /*拍照*/
    getImage() {
      let cmr = window.plus.camera.getCamera();
      cmr.captureImage(
        path => {
          this.checkImgSize(path);
        },
        function() {
          console.log("取消拍照");
        },
        {
          filename: "_doc/camera/",
          index: 1
        }
      );
    },
    /*从相册选择*/
    galleryImg() {
      window.plus.gallery.pick(
        path => {
          this.checkImgSize(path);
        },
        function() {
          console.log("取消选择图片");
        },
        {
          filename: "_doc/camera/",
          filter: "image",
          system: false
        }
      );
    },
    checkImgSize(path, overwrite) {
      console.log(path);
      window.plus.io.getFileInfo({
        filePath: path,
        success: res => {
          console.log("走targetPath");
          plus.io.resolveLocalFileSystemURL(path, entry => {
            let e = entry.toLocalURL() + "?version=" + new Date().getTime();
            console.log("entry", e);

            this.uploadByPlus(e);
          });
        }
      });
    },

    uploadByPlus(item) {
      let path = item;
      console.log(path);
      this.loading = true;
      this.loadImgUrl = path;
      let formData = new FormData();
      this.loading = true;
      formData.append("file", path);
      formData.append("token", this.token);
      let task = window.plus.uploader.createUpload(
        "https://up-z2.qiniup.com/",
        {},
        (t, status) => {
          let resData = JSON.parse(t.responseText);
          console.log(resData);
          if (status === 200) {
            this.loading = false;
            console.log(this.loadImgUrl);
            this.$emit("input", resData.key);
          } else {
            this.loading = false;
            Toast("图片上传失败！");
          }
        }
      );
      task.addData("file", path);
      task.addData("token", this.token);
      task.addFile(path, { key: "file" });
      task.start();
    }
  }
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
