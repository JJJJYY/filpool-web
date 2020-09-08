<template>
  <div class="main">
    <head-nav :styles="{marginBottom: 0}" :title="title"></head-nav>
    <div class="container page-container">
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import { getNoticeDetailListApi } from "../../net/api/homeApi";

export default {
  name: "HelpDetail",
  components: {
    HeadNav,
  },
  data() {
    return {
      detailData: this.$route.query.item || {},
      content: "",
      title: "",
      id: this.$route.query.id || "",
    };
  },
  created() {
    console.log(this.id);
    console.log(this.$route.query);
    this.title = this.$route.query.item.title;
    this.getDetail();
  },
  methods: {
    getDetail() {
      const getData = {
        id: this.id,
      };
      getNoticeDetailListApi(getData).then((res) => {
        this.title = res.data.title;
        this.content = res.data.content;
      });
      // let type = this.$route.query.type;
      // if (type === "0" || type === "1") {
      //   this.$http.get(`/message/detail/${this.id}`).then((res) => {
      //     this.title = res.content.title;
      //     this.content = res.content.content;
      //   });
      // } else if (type === "3") {
      //   this.$http
      //     .get(`/message/access/get_notice`, { id: this.id })
      //     .then((res) => {
      //       this.title = res.content.title;
      //       this.content = res.content.content;
      //     });
      // } else {
      //   this.$http.get(`/general/access/helpDetail/${this.id}`).then((res) => {
      //     this.title = res.content.title;
      //     this.content = res.content.content;
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

.main {
  .cover {
    display: block;
    width: 100%;
  }
  .container {
    /*margin-top: 8px;*/
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .content {
    line-height: 28px;
    color: $h2-color;
    font-size: 13px;
    text-align: justify;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /deep/img {
      width: 100%;
    }
  }

  .time {
    margin: 22px 0;
    text-align: right;
  }
}
</style>
