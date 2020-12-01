<template>
  <div class="percentloop">
    <div :id="styleId" class="circle-left">
      <div ref="leftcontent" />
    </div>
    <div :id="styleId" class="circle-right">
      <div ref="rightcontent" />
    </div>
    <div :id="styleSize" class="number">质押</div>
  </div>
</template>

<script>
export default {
  name: "progressCircle",
  props: {
    percentNum: {
      type: [String, Number],
      default: null
    },
    speed: {
      // 动画速度 建议取值为0-3
      type: [String, Number],
      default: null
    }
    // valueStylemin: {
    //   type: [String, Number],
    //   default: null
    // },
    // valueStylemax: {
    //   type: [String, Number],
    //   default: null
    // }
  },
  data() {
    return {
      percent: 0,
      //  数字递增动画
      initDeg: 0,
      timeId: null,
      animationing: false,
      // 颜色
      styleRed: "styleRed",
      stylesky: "stylesky",
      stylegreen: "stylegreen",
      //   环形颜色
      styleId: "stylesky",
      // 字体颜色
      styleRedSize: "styleRedSize",
      styleskySize: "styleskySize",
      stylegreenSize: "stylegreenSize",
      styleSize: "styleRedSize"
    };
  },
  watch: {
    percentNum: function(val) {
      if (this.animationing) return;
      this.goRotate(this.transformToDeg(val));
    }
  },
  created() {
    this.goRotate(this.transformToDeg(this.percentNum));
  },
  methods: {
    // 数字计算
    transformToDeg(percent) {
      let deg = 0;
      if (percent >= 100) {
        deg = 360;
      } else {
        deg = parseInt((360 * percent) / 100);
      }
      return deg;
    },
    // 环形动画计算
    transformToPercent(deg) {
      let percent = 0;
      if (deg >= 360) {
        percent = 100;
      } else {
        percent = parseInt((100 * deg) / 360);
      }
      this.styleId = this.stylesky;
      this.styleSize = this.styleRedSize;
      return percent;
    },
    rotateLeft(deg) {
      // 大于180时，执行的动画
      if (this.$refs.leftcontent) {
        this.$refs.leftcontent.style.transform =
          "rotate(" + (deg - 180) + "deg)";
      }
    },
    rotateRight(deg) {
      // 小于180时，执行的动画
      if (this.$refs.rightcontent) {
        this.$refs.rightcontent.style.transform = "rotate(" + deg + "deg)";
      }
    },
    goRotate(deg) {
      this.animationing = true;
      this.timeId = setInterval(() => {
        if (deg > this.initDeg) {
          // 数字递增动画
          this.initDeg += Number(this.speed);
          // console.log(this.initDeg);
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg);
            this.rotateRight(180);
          } else {
            this.rotateRight(this.initDeg);
          }
        } else {
          // 递减动画
          this.initDeg -= Number(this.speed);
          if (this.initDeg >= 180) {
            // console.log(8)
            this.rotateLeft(this.initDeg);
          } else {
            this.rotateLeft(180);
            this.rotateRight(this.initDeg);
          }
        }
        this.percent = this.transformToPercent(this.initDeg);
        const remainer = Number(deg) - this.initDeg;
        if (Math.abs(remainer) < this.speed) {
          this.initDeg += remainer;
          if (this.initDeg > 180) {
            this.rotateLeft(deg);
          } else {
            this.rotateRight(deg);
          }
          this.animationFinished();
        }
      }, 10);
    },
    animationFinished() {
      this.percent = this.percentNum;
      this.animationing = false;
      clearInterval(this.timeId);
      this.$emit("animationFinished");
    }
  }
};
</script>

<style scoped lang="scss">
.percentloop {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  .circle-left,
  .circle-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    // background-color: green;
    overflow: hidden;
    & > div {
      width: 100%;
      height: 100%;
      background-color: #f2f7ff;
      transform-origin: right center;
      /*transition: all .5s linear;*/
    }
  }
  .circle-right {
    left: 50%;
    & > div {
      transform-origin: left center;
    }
  }
  .number {
    position: absolute;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    // font-size: 40px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666ff;
  }
}
// 进度条颜色
#styleRedSize {
  color: #666666ff;
}
#styleskySize {
  color: #2559a5ff;
}
#stylegreenSize {
  color: #67c23a;
}

#styleRed {
  background-color: #666666ff;
}
#stylesky {
  background-color: #2559a5ff;
}
#stylegreen {
  background-color: #67c23a;
}
</style>
