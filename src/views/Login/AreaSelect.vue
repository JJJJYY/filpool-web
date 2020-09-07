<template>
    <van-popup v-model="showPicker" position="bottom" :style="{width: '100%', height: '100%'}">
      <div class="area">
        <van-sticky>
          <div class="nav-bar">
            <input type="text" v-model="searchKey" class="input">
            <div class="cancel" @click="cancle">取消</div>
          </div>
        </van-sticky>
        <div class="list">
          <div class="cell" v-for="(item, index) in countryAry" :key="index" @click="selectItem(item)">
            <div class="title">{{item.zh}}</div>
            <div class="code">+{{item.code}}</div>
          </div>
        </div>
      </div>
    </van-popup>
</template>

<script>
  import {Popup, Sticky} from "vant";
  import country from '@/utils/country';
  export default {
    name: "AreaSelect",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {
      [Popup.name]: Popup,
      [Sticky.name]: Sticky
    },
    data() {
      return {
        showPicker: this.value,
        country: country,
        searchKey: ""
      }
    },
    computed: {
      countryAry () {
        if (!this.searchKey) {
          return country;
        }
        return country.filter((item) => {
          let include = false;
          for (let variable in item) {
              if (item[variable].indexOf(this.searchKey) !== -1) {
                include = true;
              }
          }
          return include;
        })
      }
    },
    watch: {
      value: function (val) {
        this.showPicker = val;
      }
    },
    created() {
      this.$emit("select", country[0]);
    },
    methods: {
      cancle () {
        this.$emit("input", false);
      },
      selectItem (item) {
        this.$emit("select", item);
        this.$emit("input", false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .area {
    width: 100%;
    max-height: 100vh;
    padding-top: 24px;
    box-sizing: border-box;
    .nav-bar {
      display: flex;
      flex-direction: row;
      background: $background-color;
      align-items: center;
      padding-right: 12px;
      .input {
        background: $content-backgroun-color;
        border: 0;
        flex: 1;
        margin: 12px;
        padding: 0 16px;
        height: 32px;
        border-radius: 16px;
      }
    }
    .list {
      /*display: flex;
      flex-direction: column;*/
      height: calc(100vh - 80px);
      overflow: auto;
      .cell {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid $divider-color;
      }
    }
  }
</style>
