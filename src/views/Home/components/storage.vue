<template>
  <div>
    <div class="storage">存储空间</div>
    <div class="storage-content">
      <div class="content-text">
        <p class="content-text-size">矿池填充进度</p>
        <p class="content-text-size-small">最新区块高度：555,444</p>
      </div>
      <van-progress class="progress-storage" :percentage="percentage" />
      <div class="storage-data">
        <div class="data-text">
          <p>总储存空间</p>
          <p class="text-color">152,555T</p>
        </div>
        <div class="wire"></div>
        <div class="data-text">
          <p>总有效算力</p>
          <p class="text-color">152,555T</p>
        </div>
        <div class="wire"></div>
        <div class="data-text">
          <p>全网有效算力</p>
          <p class="text-color">152,555T</p>
        </div>
      </div>
      <div class="title-flex">矿池数据信息</div>
      <div class="storage-earnings">
        <div class="earnings-margin">
          <div class="earnings-width">
            <img class="earnings-image" src="../../../assets/img/webPageIcon/矿池总收益.png" alt="">
            <div class="earnings-center">
              <p>矿池总收益</p>
              <p  class="earnings-center-size">155,588 FIL</p>
            </div>
          </div>
          <div class="earnings-width">
            <img class="earnings-image" src="../../../assets/img/webPageIcon/昨日收益.png" alt="">
            <div class="earnings-center">
              <p>昨日收益</p>
              <p  class="earnings-center-size">155,588 FIL</p>
            </div>
          </div>
        </div>
        <div class="earnings-margin">
          <div class="earnings-width">
            <img class="earnings-image" src="../../../assets/img/webPageIcon/累计单t收益.png" alt="">
            <div class="earnings-center">
              <p>累计单T收益</p>
              <p class="earnings-center-size">155,588 FIL</p>
            </div>
          </div>
          <div class="earnings-width">
            <img class="earnings-image" src="../../../assets/img/webPageIcon/昨日单t收益.png" alt="">
            <div class="earnings-center">
              <p>昨日单T收益</p>
              <p class="earnings-center-size">155,588 FIL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from 'vant';
export default {
  name: 'storage',
  components: {
    [Progress.name]: Progress
  },
  data () {
    return {
      percentage: 99.99
    }
  },
  mounted () {
    this.createDom();
  },
  methods: {
    createDom() {
      const creatClass = document.querySelector('.progress-storage .van-progress__portion .van-progress__pivot');
      creatClass.remove();
      const myComp = document.querySelector('.progress-storage .van-progress__portion');
      console.log(myComp)
      const span = document.createElement("span");
      span.innerHTML = `${this.percentage}%`;
      // 判断数字左还是右
      if (this.percentage >= 9) {
          span.className = 'van-progress__pivot-left';
      } else {
          span.className = 'van-progress__pivot-right';
      }
      myComp.appendChild(span);
    }
  }
}

</script>

<style lang="scss" scoped>
.storage{
  text-align: center;
  font-size: 16px;
  color: #333333;
  font-weight: 700;
}
.storage-content{
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  .content-text{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
    .content-text-size{
      font-size: 13px;
      color: #333333;
    }
    .content-text-size-small{
      font-size: 12px;
      color: #666;
    }
  }
  .progress-storage{
    margin-top: 20px;
    height: 15px !important;
    /deep/.van-progress__portion{
      background: #F0AC25;
      .van-progress__pivot-right{
        color: #FFFFFF;
        position: absolute;
        right: -38px;
        top: 1px;
      }
      .van-progress__pivot-left{
        color: #FFFFFF;
        position: absolute;
        right: 6px;
        top: 1px;
      }
    }
  }
  .storage-data{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    color: #666;
        font-weight: 600;
    .data-text{
      text-align: center;
      .text-color{
        color: #E59C0D;
        font-size: 18px;
        margin-top: 8px;
      }
    }
    .wire{
      height: 16px;
      width: 1px;
      background-color: #E9E7E7;
    }
  }
  .title-flex{
    margin-top: 30px;
    font-size: 13px;
    color: #333333;
  }
  .storage-earnings{
    margin-top: 20px;
    .earnings-margin{
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .earnings-width{
        width: 49%;
        height: 60px;
        background: #F4F4F4;
        border-radius: 4px;
        display: flex;
        justify-content: space-around;
        // padding: 8px;
        align-items: center;
        color: #666666;
        .earnings-image{
          width: 40px;
          height: 40px;
        }
        .earnings-center{
          text-align: center;
          margin-right: 5px;
          .earnings-center-size{
            margin-top: 8px;
            font-size: 14px;
            color: #E59C0D;
          }
        }
      }
    }
  }
}
</style>