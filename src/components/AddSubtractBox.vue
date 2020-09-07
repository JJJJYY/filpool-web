<template>
  <div class="box" @click.stop="clickContent">
    <button class="sub flex-box" @click.stop="sub" :disabled="number<=limit">
      <img :src="subIcon" alt="" style="width: 12px;">
    </button>
    <input type="number" :value="number" v-only-number @input="handleInput($event)" title=""/>
    <button class="add flex-box" @click.stop="add">
      <img :src="addImg" alt="" style="width: 12px;">
    </button>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "AddSubtractBox",
    props: {
      value: Number,
      limit: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        subImg: require('@/assets/img/sub.png'),
        subGrayImg: require('@/assets/img/subGray.png'),
        addImg: require('@/assets/img/add.png'),
        number: this.value < this.limit?this.limit:this.value
      }
    },
    computed: {
      subIcon () {
        return this.number>this.limit?this.subImg:this.subGrayImg
      }
    },
    watch: {
      value: function (val) {
        this.number = val;
      },
      limit: function (val) {
        if (this.number < val) {
          this.number = val;
          this.$emit('input', this.number);
        }
      }
    },
    methods: {
      add() {
        this.number += 1;
        this.$emit('input', this.number)
      },
      sub() {
        if (this.number <= this.limit) {
          Toast("最少购买数量：" + this.limit)
          return;
        }
        this.number -= 1
        this.$emit('input', this.number)
      },
      clickContent () {

      },
      handleInput(event) {
        let val = Number(event.target.value);
        if (val >= this.limit) {
          this.$emit('input', val)
        }
      }
    }
  };
</script>

<style lang="scss">
  @import '../assets/scss/base.scss';

  $box-height: 32px;

  .box {
    display: flex;
    height: $box-height;
    border: 1px $divider-color solid;

    .add,
    .sub {
      width: $box-height;
      background: white;
      border: none;
      text-align: center;
    }

    .add {
      border-left: 1px $divider-color solid;
    }

    .sub {
      border-right: 1px $divider-color solid;
    }

    input {
      width: 52px;
      font-size: 14px;
      color: $main-color;
      text-align: center;
    }
  }
</style>
