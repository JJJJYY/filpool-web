<template>
  <div>
    <head-nav title="用户云算力租赁协议" :styles="{marginBottom: 0}"></head-nav>
    <div class="content page-container" v-html="content"></div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { getTextInfoApi } from "../net/api/userInfoApi";
export default {
  name: "ServiceDetail",
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
        key: "service",
      };
      getTextInfoApi(postData).then((res) => {
        this.content = res.data.content;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  line-height: 26px;
  padding: 0 10px;
  text-align: justify;
}
</style>