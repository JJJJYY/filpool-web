<template>
  <div class="GoogleBind">
    <head-nav></head-nav>
    <div class="page-container">
      <div class="title">绑定谷歌验证</div>
      <div class="explain">
        谷歌验证器是一款动口令工具，工作原理类似短信动态验证。 绑定后每 30s
        生成一个动态验证码，验证码可用于登录、提
        现、修改安全设置等操作的安全验证。
      </div>
      <div class="stepBox">
        <div class="stepItem" :class="{ active: stepIndex === 1 }">
          <span class="icon" :class="{ active: stepIndex > 1 }">
            <span v-if="stepIndex <= 1">1</span>
            <van-icon v-else name="success" size="13px" color="#2559A5FF" />
          </span>
          <span class="stepText">下载谷歌验证器</span>
        </div>
        <div class="stepItem" :class="{ active: stepIndex === 2 }">
          <span class="icon" :class="{ active: stepIndex > 2 }">
            <span v-if="stepIndex <= 2">2</span>
            <van-icon v-else name="success" size="13px" color="#2559A5FF" />
          </span>
          <span class="stepText">添加秘钥并备份</span>
        </div>
        <div class="stepItem" :class="{ active: stepIndex === 3 }">
          <span class="icon" :class="{ active: stepIndex > 3 }">
            <span v-if="stepIndex <= 3">3</span>
            <van-icon v-else name="success" size="13px" color="#2559A5FF" />
          </span>
          <span class="stepText">绑定验证</span>
        </div>
      </div>
      <component :is="middleComponent" @setStep="setStep"></component>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import HeadNav from "@/components/HeadNav";
export default {
  name: "GoogleBind",
  components: {
    "van-icon": Icon,
    Step1,
    Step2,
    Step3,
    HeadNav
  },
  data() {
    return {
      stepIndex: 1,
      middleComponent: "Step1"
    };
  },
  mounted() {
    this.$el.style.height = document.documentElement.clientHeight + "px";
  },
  methods: {
    setStep(index) {
      this.stepIndex = index;
      this.middleComponent = `Step${index}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base.scss";
@import "~@/assets/scss/form.scss";
.GoogleBind {
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
  height: $pageHeight;
  font-size: 12px;
  line-height: 18px;
  position: relative;
}
.title {
  font-size: 16px;
  color: #24375e;
  text-align: center;
  padding: 16px 0;
}
.explain {
  padding: 7px 14px;
  background-color: #dddddd;
  border-radius: 5px;
  color: #86929d;
  font-size: 12px;
  line-height: 16px;
}
.stepBox {
  margin: 25px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .stepItem {
    display: flex;
    align-items: center;
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      padding: 2px;
      border: 1px solid #ddd;
      border-radius: 50%;
      text-align: center;
      line-height: 12px;
      margin-right: 8px;
      font-size: 12px;
      &.active {
        border-color: #2559a5ff;
      }
    }
    .stepText {
      font-size: 11px;
      color: #86929d;
    }
    &.active {
      color: #fff;
      .icon {
        background-color: $main-color;
        border: none;
      }
      .stepText {
        color: $main-color;
      }
    }
  }
}
.btnBox {
  position: absolute;
  bottom: 34px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
