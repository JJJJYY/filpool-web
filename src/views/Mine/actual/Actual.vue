<template>
    <div class="form">
      <div class="form-container actual-form" style="padding-bottom: 50px">
        <h3 class="title">实名认证</h3>
        <p class="normalText">请上传清晰的证件照片，必须能看清证件号和姓名；仅支持PNG、JPG、JPEG格式，每张大小限制在2M以内</p>
        <div class="inputItem form-item">
          <div class="form-title">国家和地区</div>
          <div class="form-input">
            <input type="text" :value="country" placeholder="请选择国家" :disabled="userData.authStatus === 1" readonly @click="showCountryPanel" />
            <van-icon name="arrow-down" class="downIcon" />
          </div>
        </div>
        <div class="inputItem form-item">
          <div class="form-title">姓名</div>
          <div class="form-input">
            <input type="text" v-model="realName" :disabled="userData.authStatus === 1" placeholder="请输入姓名"  />
          </div>
        </div>
        <div class="inputItem form-item">
          <div class="form-title">证件号码</div>
          <div class="form-input">
            <input type="text" v-model="idCardNo" :disabled="userData.authStatus === 1" placeholder="请输入证件号码"  />
          </div>
        </div>
        <div v-if="userData.authStatus !== 1" style="text-align: center;">
          <div class="uploadContainer">
            <Uploader :value="idFrontBg" @input="setIdFront" text="请上传身份证正面" bg-img=""></Uploader>
            <Uploader :value="idVersoBg" @input="setIdVerso" text="请上传身份证反面"></Uploader>
          </div>
          <button class="submit" style="margin-top: 40px;" @click="submit">提交审核</button>
        </div>
      </div>
      <area-select v-model="showAreaPicker" @select="setCountry"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { Toast, Icon, Button } from 'vant';
    import AreaSelect from "@/views/Login/AreaSelect";
    import Uploader from '@/components/Uploader';
    export default {
      name: "Actual",
      components: {
        AreaSelect,
        [Icon.name]: Icon,
        [Button.name]: Button,
        Uploader
      },
      data() {
          return {
            areaCode: "",
            idFrontBg: require("@/assets/img/mine/card-right.png"),
            idVersoBg: require("@/assets/img/mine/card-back.png"),
            idFront: "",
            idVerso: "",
            actualData: {},
            country:"",
            realName: "",
            idCardNo: "",
            countryInfo: {},
            showAreaPicker:false,
            fileList: []
          }
      },
      computed: {
        ...mapState(['userData'])
      },
      created() {
        if (this.userData.authStatus === 1) {
          this.getActualInfo()
        }
      },
      methods: {
        setIdFront(img) {
          this.idFront = img;
        },
        setIdVerso(img) {
          this.idVerso = img;
        },
        getActualInfo() {
          this.$http.get('/setting/getSubmitInfo').then((res) => {
            this.actualData = res.data;
            this.areaCode = res.data.country;
            this.realName = res.data.realName;
            this.idCardNo = res.data.idCardNo;
          })
        },
        showCountryPanel() {
          if (this.userData.authStatus !== 1) {
            this.showAreaPicker=true
          }
        },
        /*设置国家*/
        setCountry (item) {
          this.countryInfo = item;
          this.areaCode = item.code;
          this.country = item.zh;
        },
        submit() {
          if (!this.areaCode || !this.realName || !this.idCardNo || !this.idFront || !this.idVerso) {
            Toast("请填写完整信息");
            return;
          }
          this.$http.post('/setting/submitInfo', {
            country: this.areaCode,
            realName: this.realName,
            idCardNo: this.idCardNo,
            idFront: this.idFront,
            idVerso: this.idVerso
          }).then((res) => {
            if (res.responseCode === "00") {
              Toast("实名认证已提交");
              this.$store.dispatch("refreshUserData");
              this.$emit("submited");
            } else {
              Toast(res.responseMsg);
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/base";
  @import "../../../assets/scss/form";
  .actual-form{
    background-color: $content-backgroun-color;
    padding-bottom: 50px;
  }
  .title{
    font-size: 16px;
    color: $h1-color;
    font-weight: normal;
  }
  .normalText{
    font-size: 14px;
    color: $h3-color;
    margin-top: 6px;
  }
  .uploadContainer{
    display: flex;
  }
</style>