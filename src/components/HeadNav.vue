<template>
  <div class="HeadNav" :style="cStyle">
    <van-nav-bar v-show="!$route.meta.navBarHidden" class="header" :border="border"
         :style="vStyle"
         @click-left="clickLeft"
         @click-right="handdleRight">
      <template #left>
        <img src="@/assets/img/tibi_icon_return.png" style="max-height: 16px;"
             alt="" v-if="!$route.meta.backBtnHidden">
        <span class="leftText" v-if="leftText">{{leftText}}</span>
      </template>
      <span slot="title" class="title">{{title || $route.meta.title}}</span>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from 'vant';
import plusready from "@/utils/plusReady";
export default {
    name: "HeadNav",
    props: {
        title: {
            default: ""
        },
        leftText: {
          type: String,
          default: ""
        },
        bgColor: {
          default: "#fff"
        },
        styles: {
          default: () => ({})
        },
        vanStyle: {
          default: () => ({})
        },
        overrideBack: {
          type: Boolean,
          default: false
        },
        border: {
          type: Boolean,
          default: true
        }
    },
    components: {
      [NavBar.name]: NavBar
    },
  data() {
      return {
        paddingTop: this.$isH5?"0":"20px"
      }
  },
  computed: {
    cStyle () {
      return Object.assign({},this.styles, {backgroundColor: this.bgColor, paddingTop: this.paddingTop});
    },
    vStyle () {
      return Object.assign({},this.vanStyle, {backgroundColor: this.bgColor});
    }
  },
  created() {
    plusready(() => {
      //window.plus.navigator.setStatusBarStyle("light");//白色
      this.paddingTop = window.plus.navigator.getStatusbarHeight() || "20px";
    })
  },
  methods: {
      clickLeft() {
        if (this.overrideBack) {
          this.$emit("back");
        } else {
          this.$router.goBack();
        }
      },
      handdleRight() {
          this.$emit("clickRight")
      }
  }
}
</script>

<style lang="scss" scoped>
.HeadNav{
  background-color: #fff;
  /*padding-top: 16px;*/
  width: 100%;
  margin-bottom: 8px;
  .title{
    font-size: 18px;
    color: #24375E;
  }
  .leftText{
    margin-left: 3vw;
    font-size: 16px;
    color: #24375E;
  }
}
</style>