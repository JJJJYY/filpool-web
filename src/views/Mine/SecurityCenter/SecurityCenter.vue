<template>
  <div class="list">
    <head-nav></head-nav>
    <div class="page-container">
      <div class="cell" v-for="item in items" :key="item.title" @click="jump(item)">
        <div class="name">{{item.title}}</div>
        <div class="desc">{{item.desc}}</div>
        <img style="height: 10px;" src="../../../assets/img/mine/tab_icon_more.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import HeadNav from '@/components/HeadNav';
  import { Toast } from 'vant';
  export default {
    name: "SecurityCenter",
    components: {
      HeadNav
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState(["userData"]),
      items() {
        return [
          {
            title: '登录密码',
            desc: '修改',
            push: '/securityLoginPwd'
          },
          {
            title: `${this.userData.phone?'修改':'绑定'}手机号`,
            desc: this.userData.phone,
            push: '/securityMobileModify'
          },
          {
            title: '绑定邮箱',
            desc: `${this.userData.email?'已绑定':'未绑定'}`,
            push: '/securityEmailPwd'
          },
          {
            title: '资金密码',
            desc: `${this.userData.payPwd === 1?'修改':'设置'}`,
            push: '/securityTransPwd',
            requireGa: true
          },
          {
            title: 'Google验证',
            desc: `${this.userData.ga === 1?'已绑定':'未绑定'}`,
            push: `${this.userData.ga === 1?'/googleModify':'/googleBind'}`,
          },
        ]
      }
    },
    created() {

    },
    methods: {
      jump(item) {
        if (item.requireGa && !this.userData.ga) {
          Toast("请先开启谷歌验证");
        } else {
          this.$router.push(item.push);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/base";

  .list {

  }

  .cell {
    background: $content-backgroun-color;
    padding: 16px;
    display: flex;
    font-size: 14px;
    align-items: center;
    border-bottom: 1px $divider-color solid;

    .name {
      color: $h2-color;
      flex: 1;
    }

    .desc {
      color: $h3-color;
      margin: 0 12px;
    }
  }
</style>
