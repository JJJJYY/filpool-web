<template>
  <div class="main">
    <head-nav :styles="{marginBottom: 0}" :title="title"></head-nav>
    <!--<img :src="$route.query.item.image" alt="" class="cover">
    <div class="content">{{$route.query.item.content}}</div>-->
    <!--    <div class="time">{{$route.query.}}</div>-->
    <div class="container page-container">
      <!--<h3>{{detailData.title}}</h3>-->
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import HeadNav from "@/components/HeadNav";

  export default {
    name: "HelpDetail",
    components: {
      HeadNav
    },
    data () {
      return {
        detailData: this.$route.query.item || {},
        content: "",
        title: "",
        id: this.$route.params.id
      }
    },
    created() {
      this.content = this.detailData.content;
      this.title = this.$route.query.item.title;
      if (!this.content) {
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        let type = this.$route.query.type;
        if (type === "0" || type === "1") {
          this.$http.get(`/message/detail/${this.id}`).then((res) => {
            this.title = res.content.title;
            this.content = res.content.content;
          })
        } else if (type === "3") {
          this.$http.get(`/message/access/get_notice`, {id: this.id}).then((res) => {
            this.title = res.content.title;
            this.content = res.content.content;
          })
        } else {
          this.$http.get(`/general/access/helpDetail/${this.id}`).then((res) => {
            this.title = res.content.title;
            this.content = res.content.content;
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/base";

  .main {
    .cover {
      display: block;
      width: 100%;
    }
    .container{
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
      /deep/img{
        width: 100%;
      }
    }

    .time {
      margin: 22px 0;
      text-align: right;
    }
  }
</style>
