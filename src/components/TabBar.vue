<template>
  <div class="tab-bar">
    <div
      class="tab-bar-item"
      v-for="(item, index) in items"
      :key="item.title"
      @click="setSelectedItem(index)"
    >
      <img
        :src="index === selectedIndex ? item.selectImage : item.image"
        alt=""
      />
      <span :class="{ selected: selectedIndex === index }">{{
        item.title
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      selectedIndex: 0,
      items: [
        {
          image: require("../assets/img/tab_icon_home_normal.png"),
          selectImage: require("../assets/img/tab_icon_home_selected.png"),
          title: "首页",
          router: "/"
        },
        {
          image: require("../assets/img/tab_icon_count_normal.png"),
          selectImage: require("../assets/img/tab_icon_count_selected.png"),
          title: "云计算",
          router: "/count"
        },
        {
          image: require("../assets/img/tab_icon_my_normal.png"),
          selectImage: require("../assets/img/tab_icon_my_selected.png"),
          title: "我的",
          router: "/mine"
        }
      ]
    };
  },
  methods: {
    setSelectedItem(index) {
      this.selectedIndex = index;
      this.$router.push(this.items[index].router);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base";

.tab-bar {
  display: flex;
  background: white;
  height: 54px;
  align-items: stretch;
  border-top: 1px solid #eee;
  /*padding-bottom: env(safe-area-inset-bottom);*/
  /*padding-bottom: constant(safe-area-inset-bottom);*/

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #86929d;
    font-size: 12px;

    span {
      margin-top: 6px;
    }

    .selected {
      color: #2559a5ff;
    }

    img {
      width: 20px;
    }
  }
}
</style>
