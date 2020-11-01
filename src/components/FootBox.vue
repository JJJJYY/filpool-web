<template>
  <div class="FootBox">
    <van-tabbar
      v-model="active"
      active-color="#E49C3A"
      inactive-color="#86929D"
      :safe-area-inset-bottom="true"
    >
      <van-tabbar-item
        v-for="item in items"
        :key="item.title"
        :to="item.router"
      >
        {{ item.title }}
        <template #icon="props">
          <img :src="props.active ? item.selectImage : item.image" alt="" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, NavBar } from "vant";
export default {
  name: "FootBox",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      active: 0,
      items: [
        {
          image: require("@/assets/img/tab_icon_home_normal.png"),
          selectImage: require("@/assets/img/tab_icon_home_selected.png"),
          title: "首页",
          router: "/"
        },
        {
          image: require("@/assets/img/tab_icon_count_normal.png"),
          selectImage: require("@/assets/img/tab_icon_count_selected.png"),
          title: "云算力",
          router: "/rate"
        },
        {
          image: require("@/assets/img/icon-market-select.png"),
          selectImage: require("@/assets/img/icon-market.png"),
          title: "行情",
          router: "/market"
        },
        {
          image: require("@/assets/img/tab_icon_my_normal.png"),
          selectImage: require("@/assets/img/tab_icon_my_selected.png"),
          title: "我的",
          router: "/mine"
        }
      ]
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        /*底部栏状态*/
        this.items.forEach((item, index) => {
          if (val.path === item.router) {
            this.active = index;
          }
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.FootBox {
}
</style>
