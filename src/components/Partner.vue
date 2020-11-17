<template>
  <div class="Partner">
    <div class="title">
      <span class="zhu"></span>
      <span>合作伙伴</span>
    </div>
    <div class="list-box">
      <a
        v-for="item in partners"
        :key="item.id"
        @click.prevent="$isH5 ? openURL(item) : openWebview(item)"
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
      partners: []
    };
  },
  created() {
    this.getPartners();
  },
  methods: {
    getPartners() {
      getPartnerListApi().then(res => {
        this.partners = res.data;
      });
    },
    openURL(item) {
      window.location.href = item.link;
    },
    openWebview(item) {
      let webview = createWebview(item.link, item.title, {
        titleText: item.title
      });
      webview.show("slide-in-right");
      this.$store.commit("setWebview", webview);
    }
  }
};
</script>

<style lang="scss" scoped>
.Partner {
  // background-color: #fff;
  // margin-top: 12px;
  padding: 10px 10px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #24375e;
    padding-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .zhu {
      display: inline-block;
      width: 4px;
      height: 16px;
      background: #ffab17ff;
      margin-right: 8px;
    }
  }
  .list-box {
    display: grid;
    // flex-wrap: wrap;
    // grid-template-columns: 33.33% 33.33% 33.33%;
    // grid-template-rows: 33.33% 33.33% 33.33%;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 8px;
    grid-column-gap: 8px;
    a {
    }
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
