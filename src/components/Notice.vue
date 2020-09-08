<template>
  <div class="Notice">
    <div class="left">
      <span class="iconfont" style="margin-right: 12px;">&#xe6d2;</span>
      <div style="flex: 1;overflow: hidden;">
        <swiper :options="swiperOption" ref="noticesSwiper" style="height: 32px;">
          <swiper-slide
            v-for="(item, index) in notices"
            :key="index"
            style="display: flex;align-items: center;"
          >
            <p class="noticeItem">{{item.title}}</p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="right">
      <router-link :to="{path: '/NoticeList'}" class="checkMore">
        <span>查看更多</span>
        <span class="iconfont">&#xe62d;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { getNoticeListApi } from "../net/api/homeApi";
let vm = null;
export default {
  name: "Notice",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      notices: [],
      swiperOption: {
        autoplay: true,
        loop: true,
        direction: "vertical",
        on: {
          click: function () {
            vm.handleClick(this.realIndex);
          },
        },
      },
    };
  },
  created() {
    this.getNotices();
    vm = this;
  },
  methods: {
    getNotices() {
      const getData = {
        page: 1,
        count: 10,
      };
      getNoticeListApi(getData).then((res) => {
        this.notices = res.data;
        this.$nextTick(() => {
          if (this.$refs.noticesSwiper) {
            this.$refs.noticesSwiper.swiperInstance.loopCreate();
          }
        });
      });
      // this.$http
      //   .post("/message/access/public/notice", {
      //     pageNo: 1,
      //     pageSize: 10,
      //   })
      //   .then((res) => {
      //     console.log("", res);
      //     // console.log(res);
      //     this.notices = res.data.content;
      //     this.$nextTick(() => {
      //       if (this.$refs.noticesSwiper) {
      //         this.$refs.noticesSwiper.swiperInstance.loopCreate();
      //       }
      //     });
      //   });
    },
    handleClick(index) {
      let item = this.notices[index];
      this.$router.push({
        path: `/helpDetail/${item.id}`,
        query: {
          item: this.notices[index],
          type: "3",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Notice {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #575c62;
  }
  .noticeItem {
    font-size: 12px;
    color: #575c62;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .checkMore {
    display: flex;
    align-items: center;
    color: #575c62;
  }
}
</style>