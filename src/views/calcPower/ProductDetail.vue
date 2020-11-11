<template>
  <div class="ProductDetail">
    <head-nav></head-nav>
    <div class="container list page-container">
      <div class="goodBox">
        <CalcPowerItem
          v-if="detailInfo"
          :good-data="detailInfo"
          @select="onSelect"
          style="margin-top: 0"
          :show="true"
        />
      </div>
      <van-tabs v-model="active" color="#ff933c">
        <van-tab title="排队列表">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="vanTab-r" v-for="(item, index) in list" :key="index">
              <div class="vanTab-padding">
                <div class="vanTab-flex">
                  <div>排序： {{ index + 1 }}</div>
                  <div>数量： {{ item.power | parseFloatFilter }}TiB</div>
                </div>
                <div class="vanTab-flex">
                  <div>ID： {{ item.auth_user_id }}</div>
                  <div style="color: #666666 ; font-size: 12px">
                    {{ item.create_time }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
        <!-- <van-tab title="详细规则">
          <div class="detail">
            <p class="label">具体细则</p>
            <div class="content">
              <p>
                1.FILPool矿池“算力加速计划”-期初定于11月10日开始实施，将采用新的独立节点运行，新节点有效算力及挖矿收益并入FILPool-期矿池，FILPool-期矿池总存储容量不再增加，每名用户将根据其账户有效算力占矿池总有效算力占比来分配收益;
              </p>
              <br />
              <p>
                2.“算力加速计划”每天限量申请1PiB (1024TiB)
                ，1TiB有效算力所需质押币按6.4枚FIL计算，最小申请单位为0.001TiB,
                11月9日12:00开放申请，11月10日开启新节点。FILPool矿池用户可申请(充值)
                FIL数量的.
                上限以其所购买的存储空间剩余所未封装扇区所需要的质押币为，上限，如用户充值的FIL超过质押所需要的FIL,多余部分再算力加速计划结束之后自动转至其“可用资产”账户，用户可申请提现;
                举例说明:客户A购买了-台存储容量为192TB蜘蛛矿机，其有效算力上限为128TiB,目前已完成封装的有效算力约为28TiB,还需封装100TiB的有效算力，共还需质押640枚FIL，也就是其最高可申请(充值)的FIL数量为640枚。
              </p>

              <br />
              <p>
                3.参与申请“算力加速计划”的用户，则其账户在申请后第三天对应增加其所申请的有效算力。因矿池每日新增有效算力会存在-定波动如新节点每天有效算力增长未达到预期值，则按比例分配有效算力，不足部分后续补足;用户有效算力达到上线后，每日挖矿收益中可用部分均可全部提取。
              </p>

              <br />
              <p>
                4.未参与“算力加速计划”的用户且未将其可用资产提取，则其有效算力将根据FILPool-期矿池原有节点“f02770、
                f02775、
                f02767”每日新增有效算力与其个人账户剩余可用资产及对应比例进行同步增长;如用户未参与“算力加速计划”并且将当日可用资产全部提取，则其有效算力当日不再增长，如后续其暂停提币，则其有效算力继续增长;
              </p>

              <br />
              <p>
                5.“算力加速计划”暂定截止时间为FILPool-
                期矿池达到有效算力。上限为止;
              </p>

              <br />
              <p>
                6.目前Fil
                ecoin挖矿所采用的扇区生命周期默认为540天，即质押币质押周期为540天，质押期到期后质押币一次性释放。
                如用户所购买的服务器托管服务或存储空间租赁服务一年到期后不续约，FILPool矿
                池可回购用户账户的有效算力，提前给用户兑付释放质押币。
              </p>
            </div>
          </div>
        </van-tab> -->
      </van-tabs>
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        :safe-area-inset-bottom="true"
      >
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, List } from "vant";
import CalcPowerBuyPopup from "@/views/calcPower/CalcPowerBuyPopup";
import CalcPowerItem from "@/views/calcPower/CalcPowerItem";
import HeadNav from "@/components/HeadNav";
import {
  getPurchaseInfo,
  orderApi,
  getListTopFlashUsers
} from "@/net/api/userInfoApi";

export default {
  name: "ProductDetail",
  components: {
    HeadNav,
    CalcPowerItem,
    CalcPowerBuyPopup,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List
  },
  data() {
    return {
      show: false,
      detailInfo: {},
      number: this.$route.params.amount || 1,
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      count: 10
    };
  },
  created() {
    this.getDetailById();

    // getListTopFlashUsers().then(res => {
    //   console.log(res);
    //   this.list = res.data.list;
    // });
  },
  methods: {
    onLoad() {
      const postData = {
        page: this.page,
        count: this.count
      };
      getListTopFlashUsers(postData)
        .then(res => {
          if (res.ret === 200) {
            let newList = res.data.list;
            if (res.data.list.length) {
              this.list = this.page === 1 ? newList : this.list.concat(newList);
              this.page += 1;
            } else {
              this.finished = true;
            }
          }
        })
        .catch(() => (this.finished = true))
        .finally(() => (this.loading = false));
    },
    /*根据id获取详情*/
    getDetailById() {
      let rateId = this.$route.params.id || this.$route.query.id;
      const postData = {
        product_id: rateId
      };
      getPurchaseInfo(postData).then(res => {
        this.detailInfo = res.data.product;
        this.detailInfo.avl_buy_power = res.data.avl_buy_power;
        this.detailInfo.avl_fil = res.data.avl_fil;
      });
    },
    onSelect(item) {
      this.selectedItem = Object.assign({}, item);
      this.number = this.selectedItem.amount;
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.ProductDetail {
  .container {
    /*height: calc(100vh - 62px);
    overflow: auto;*/
  }
  .detail {
    padding: 16px;
    margin-top: 8px;
    background-color: #fff;
    .label {
      margin-bottom: 16px;
    }
    /deep/.content {
      font-size: 12px;
      line-height: 26px;
      p {
        white-space: pre-wrap;
        min-height: 1em;
      }
    }
  }
}
.vanTab-r {
  // padding: 0 10px;
  margin-top: 8px;
  .vanTab-padding {
    border-radius: 8px;
    background: #fff;
    padding: 10px 0;
    .vanTab-flex {
      padding: 0 20px;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      font-size: 14px;
      color: #666666ff;
    }
  }
}
</style>
