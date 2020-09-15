<template>
  <div class="main">
    <head-nav></head-nav>
    <div v-html="content" class="content page-container"></div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { getTextInfoApi } from "../../../net/api/userInfoApi";
export default {
  name: "AboutUs",
  components: {
    HeadNav,
  },
  data() {
    return {
      content: "",
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    getContent() {
      const postData = {
        key: "about",
      };
      getTextInfoApi(postData).then((res) => {
        this.content = res.data.content;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .content {
    padding: 20px 10px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
