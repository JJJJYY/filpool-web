<template>
  <div class="Partner">
    <div class="title">合作伙伴</div>
    <div class="list-box">
      <a
        v-for="item in partners"
        :key="item.id"
        @click.prevent="$isH5?openURL(item):openWebview(item)"
        style="text-align: center;margin-bottom: 24px;"
      >
        <img :src="item.image" class="img" alt />
      </a>
    </div>
  </div>
</template>

<script>
import { createWebview } from "@/utils/utilTools";
import { getPartnerListApi } from "../net/api/homeApi";
export default {
  name: "Partner",
  data() {
    return {
      partners: [],
    };
  },
  created() {
    this.getPartners();
  },
  methods: {
    getPartners() {
      getPartnerListApi().then((res) => {
        this.partners = res.data;
      });
    },
    openURL(item) {
      window.location.href = item.link;
    },
    openWebview(item) {
      let webview = createWebview(item.link, item.title, {
        titleText: item.title,
      });
      webview.show("slide-in-right");
      this.$store.commit("setWebview", webview);
    },
  },
};
</script>

<style lang="scss" scoped>
.Partner {
  background-color: #fff;
  margin-top: 12px;
  .list-box {
    display: grid;
    align-self: stretch;
    grid-template-columns: repeat(2, 2fr);
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #24375e;
    text-align: center;
    padding-top: 28px;
    margin-bottom: 35px;
  }
  .img {
    width: 138px;
  }
}
</style>