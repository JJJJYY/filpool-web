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
import { getNoticeDetailListApi } from "@/net/api/homeApi";
import {
  helpInfoDetailApi,
  advertisementInfoDetail,
} from "@/net/api/userInfoApi";

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
    this.title = this.$route.query.item.title;
    this.getDetail();
  },
  methods: {
    getDetail() {
      let type = this.$route.query.type;
      let apiData = {
        id: this.id,
      };
      // 公告列表跳转
      if (type === "4") {
        getNoticeDetailListApi(apiData).then((res) => {
          this.title = res.data.title;
          this.content = res.data.content;
        });
      } else if (type === "3") {
        //帮助中心列表跳转
        helpInfoDetailApi(apiData).then((res) => {
          this.title = res.data.title;
          this.content = res.data.content;
        });
      } else if (type === "1") {
        // 小课堂&项目动态
        advertisementInfoDetail(apiData).then((res) => {
          this.title = res.data.title;
          this.content = res.data.content;
        });
      }
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
