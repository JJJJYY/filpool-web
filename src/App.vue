<template>
  <div
    id="app"
    :class="{ mContainer: $isH5 }"
    v-on:touchstart="bodyTouchStart"
    v-on:touchmove="bodyTouchMove"
    v-on:touchend="bodyTouchEnd"
  >
    <transition :name="transitionName" v-on:after-enter="afterEnter">
      <keep-alive>
        <router-view
          class="tabContent"
          :class="{ isQuit: isMainPage, mContainer: $isH5 }"
          :style="mStyle"
          v-if="$route.meta.isQuit"
        ></router-view>
      </keep-alive>
    </transition>
    <router-view
      class="tabContent"
      :class="{ mContainer: $isH5 }"
      :style="mStyle"
      v-if="!$route.meta.isQuit"
    ></router-view>
  </div>
</template>

<script>
let swidth = document.documentElement.clientWidth;
export default {
  data() {
    return {
      transitionName: "",
      isMainPage: true,
      // touchLeft 划动起点界限，起点在靠近屏幕左侧时才有效
      touchLeft: (swidth * 2) / 5,
      // touchStartPoint 记录起始点X,Y坐标
      touchStartPoint: 0,
      touchStartPointY: 0,
      // distance 记录划动的距离
      distance: 0,
      distanceY: 0,
    };
  },
  computed: {
    mStyle() {
      if (this.$isH5) {
        return { height: "initial", transition: "none" };
      } else {
        return {};
      }
    },
  },
  watch: {
    $route: function (val, old) {
      /*路由动画*/
      let isBack = this.$router.isBack;
      if (
        (val.meta.isQuit && old.meta.isQuit) ||
        (val.meta.isQuit && old.path === "/")
      ) {
        this.transitionName = "";
        this.isMainPage = true;
        return;
      }
      this.isMainPage = false;
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    },
  },
  mounted() {
    if (!this.$isH5) {
      /*document.body.style.height=document.documentElement.clientHeight + 'px';*/
      document.body.style.cssText = `height:${document.documentElement.clientHeight}px;overflow: hidden;`;
    } else {
      let cssEl = document.createElement("link");
      cssEl.rel = "stylesheet";
      cssEl.href = "./h5.css";
      document.head.appendChild(cssEl);
    }
  },
  methods: {
    afterEnter() {
      if (this.$route.meta.isQuit) {
        this.transitionName = "";
        this.isMainPage = true;
      }
    },
    bodyTouchStart: function (event) {
      if (this.$route.meta.isQuit || this.$isH5) {
        return;
      }
      // 获得起点X,Y坐标，初始化distance为0
      this.touchStartPoint = event.targetTouches[0].clientX;
      this.touchStartPointY = event.targetTouches[0].clientY;
      this.distance = 0;
      this.distanceY = 0;
    },
    bodyTouchMove: function (event) {
      if (this.$route.meta.isQuit || this.$isH5) {
        return;
      }
      if (this.touchStartPoint < this.touchLeft) {
        // 只监听单指划动，多指划动不作响应
        if (event.targetTouches.length > 1) {
          return;
        }
        // 实时计算distance
        this.distance = event.targetTouches[0].clientX - this.touchStartPoint;
        this.distanceY = event.targetTouches[0].clientY - this.touchStartPointY;
      }
    },
    bodyTouchEnd: function () {
      if (this.$route.meta.isQuit || this.$isH5) {
        return;
      }
      if (
        this.touchStartPoint < this.touchLeft &&
        Math.abs(this.distanceY / this.distance) < 0.5
      ) {
        // 划动结束，重置数据
        this.touchStartPoint = 0;
        this.touchStartPointY = 0;
        // 当划动距离超过70px时，触发返回事件
        if (this.distance > 70) {
          this.distance = 0;
          this.distanceY = 0;
          this.$router.goBack();
        }
      }
    },
  },
};
</script>

<style lang="scss">
html {
  background: #eee;
}

#app {
  background: #eeeaed;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "\5FAE\8F6F\96C5\9ED1", SimSun, sans-serif;
  overflow: hidden;
  /*box-sizing: border-box;*/

  .tabContent {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    /*top: 46px;*/

    //padding-bottom: 50px;
    box-sizing: border-box;
    overflow: hidden;
    &.isQuit {
    }
  }
}

input {
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0;
}

.slide-left-enter,
.slide-right-leave-active {
  /* opacity: 0; */
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  transition-timing-function: ease-out;
}
.slide-left-leave-active,
.slide-right-enter {
  /* opacity: 0; */
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
.v-leave-active {
  z-index: -5;
}
</style>
