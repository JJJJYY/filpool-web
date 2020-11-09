<template>
  <div>
    <div style="padding-top: 16px; background-color: #fff">
      <van-nav-bar
        :title="$route.meta.title"
        @click-right="recode"
        @click-left="$router.goBack()"
      >
        <template #right>
          <div style="color: #86929d">提币记录</div>
        </template>
        <template #left>
          <img
            src="../../assets/img/tibi_icon_return.png"
            style="max-height: 16px"
            alt
            v-if="!$route.meta.backBtnHidden"
          />
        </template>
      </van-nav-bar>
    </div>
    <div class="page-container">
      <div class="currency" @click="setShowTypes">
        <div class="name">转账方式</div>
        <div class="select">{{ typeInfo.name }}</div>
        <img src="../../assets/img/mine/tab_icon_more.png" alt class="more" />
      </div>
      <div class="currency" @click="selectCurrency" style="margin-top: 0">
        <img :src="currSymbol.icon" alt class="icon" />
        <div class="name">
          {{
            currSymbol.type
              ? `${currSymbol.asset}(${currSymbol.type})`
              : currSymbol.asset
          }}
        </div>
        <div class="select">切换币种</div>
        <img src="../../assets/img/mine/tab_icon_more.png" alt class="more" />
      </div>
      <div class="amount">
        <div class="top">
          <div class="symbol">
            {{
              currSymbol.type
                ? `${currSymbol.asset}(${currSymbol.type})`
                : currSymbol.asset
            }}
          </div>
          <div class="balance">
            余额: {{ asset.recharge | parseFloatFilter }}
          </div>
        </div>
        <div class="input">
          <input
            type="number"
            title
            v-model.number="number"
            :placeholder="
              `${isWithdraw ? '最低提现数量' : '最小转账金额'}: ${parseFloat(
                currSymbol.minWithdraw
              )}${
                currSymbol.type
                  ? `${currSymbol.asset}(${currSymbol.type})`
                  : currSymbol.asset
              }`
            "
          />
          <div class="all" @click="number = theNumber(asset.recharge) || ''">
            <!-- <div class="all" @click="theNumber"> -->
            {{ isWithdraw ? "全部提取" : "全部划转" }}
          </div>
        </div>
      </div>
      <div class="address">
        <div class="top">
          <div class="title">{{ isWithdraw ? "提币地址" : "转账给" }}</div>
          <!--        <a class="scan" href=""><img src="" alt=""></a>-->
        </div>
        <input
          class="address-input"
          v-model="address"
          :placeholder="
            isWithdraw ? '请输入或粘贴钱包地址' : '请输入转账人手机号'
          "
        />
        <div class="hr"></div>
        <div class="fee">
          提币手续费: {{ currSymbol.minFee | parseFloatFilter }}
          {{
            currSymbol.type
              ? `${currSymbol.asset}(${currSymbol.type})`
              : currSymbol.asset
          }}
        </div>
      </div>
      <div class="pwd">
        <div class="pay-pwd">
          <div class="title">资金密码</div>
          <input
            type="password"
            class="pay-pwd-input input"
            v-model="pwd"
            title="paypw"
            placeholder="请输入资金密码"
          />
        </div>
        <!--      <div class="hr"></div>-->
        <div class="pay-pwd pay-pwd-img">
          <div class="title">图片验证码</div>
          <input
            type
            class="pay-pwd-input input"
            title="paypw"
            v-model="imgCode"
            :placeholder="`图片验证码`"
          />
          <div
            class="send-code"
            :class="{ gray: sendding }"
            @click="getImgCode"
          >
            <img
              :src="imgCodeUrl"
              alt="请重新加载"
              style="max-width: 120px; color: black"
            />
          </div>
        </div>
        <div class="pay-pwd">
          <div class="title">验证码</div>
          <input
            type="number"
            class="pay-pwd-input input"
            title="paypw"
            v-model="code"
            :placeholder="`输入${isMobileValid ? '短信' : '邮箱'}验证码`"
          />
          <div class="send-code" :class="{ gray: sendding }" @click="send">
            {{ sendding ? `${interval} s` : "发送" }}
          </div>
        </div>
        <!-- <div class="pay-pwd">
          <div class="title">谷歌验证码</div>
          <input
            type=""
            class="pay-pwd-input input"
            v-model="gaCaptcha"
            title="paypw"
            placeholder="请输入资金密码"
          />
        </div>-->
      </div>
      <div class="group tips" v-if="isWithdraw">
        温馨提示：
        <div>
          {{
            currSymbol.asset == "FIL"
              ? "FILPool矿池每天12：00发放上一日挖矿收益，如用户选择不提币，则可用资产将用于FILPool矿池第二天算力增长所需的质押币。 由于目前需要质押币才能保持算力稳定增长，如用户提币导致账户质押币不足将影响您的算力增长以及次日挖矿收益。"
              : ""
          }}
        </div>
        <br />1、您的提币操作一旦完成，对应的资产所有权将由您变更为目标地址所对应的账户所有人享有。
        <br />2、请您务必在提币操作前，仔细核对提币地址信息，确保提币属于自愿行为，并确认不涉及任何传销，非法集资，诈骗等违法情形，谨防上当受骗，避免造成不必要的财产损失。
        <br />
        3、最小提币数量：{{ currSymbol.minWithdraw | parseFloatFilter }}
        {{
          currSymbol.type
            ? `${currSymbol.asset}(${currSymbol.type})`
            : currSymbol.asset
        }}
        <br />4、修改绑定邮箱、绑定手机、登录密码、资金密码24小时之内不可提现
        <br />5、请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
        <!-- <br />6、待填写。 -->
      </div>
      <div class="group tips" v-else>
        温馨提示：
        <br />1、请在转账前仔细核对收账人的地址。
        <br />
        2、最小转账金额：{{ currSymbol.minWithdraw | parseFloatFilter }}
        {{
          currSymbol.type
            ? `${currSymbol.asset}(${currSymbol.type})`
            : currSymbol.asset
        }}
        <br />3、请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
        <br />
      </div>
      <div class="switch" @click="isMobileValid = !isMobileValid">
        {{ isMobileValid ? "切换邮箱验证" : "切换手机验证" }}
      </div>
      <div style="text-align: center">
        <button class="submit btn-gradient" @click="submit">
          {{ isWithdraw ? "提币" : "转账" }}
        </button>
      </div>
    </div>
    <google-valid-popup v-model="isShowGoogleValid" @enter="enter" />
    <van-action-sheet
      v-model="showTypes"
      :actions="types"
      @select="onSelect"
      cancel-text="取消"
      @cancel="showTypes = false"
    />
  </div>
</template>

<script>
import GoogleValidPopup from "./GoogleValidPopup";
import { NavBar, Toast, ActionSheet, Dialog } from "vant";
import md5 from "md5";
import {
  assetTypeApi,
  myBalanceApi,
  authSendApi,
  withdrawalCurrencyApi,
  internalTransferApi
} from "@/net/api/userInfoApi";
import { serviceURL } from "@/config";

export default {
  name: "CurrencyExtract",
  components: {
    GoogleValidPopup,
    [NavBar.name]: NavBar,
    [ActionSheet.name]: ActionSheet,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      currSymbol: {},
      asset: {},
      isMobileValid: this.$store.state.userData.defaultAccount === 0,
      number: "",
      address: "",
      pwd: "",
      code: "",
      isShowGoogleValid: false,
      sendding: false,
      interval: 60,
      showTypes: false,
      types: [
        { name: "提现", value: "withdraw" },
        { name: "内部转账", value: "trans" }
      ],
      typeInfo: { name: "提现", value: "withdraw" },
      imgCode: "", // 图片验证码
      imgCodeUrl: "",
      gaCaptcha: ""
    };
  },
  computed: {
    isWithdraw() {
      return this.typeInfo.value === "withdraw";
    }
  },
  created() {},
  mounted() {
    this.loadAssetData();
    this.loadAmount();
    this.getImgCode();
  },
  methods: {
    theNumber(data) {
      return this.done(parseFloat(data), 6);
    },
    done(num, count) {
      var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
      return newNum;
    },
    getImgCode() {
      let newTime = new Date().getTime();
      this.imgCodeUrl = `${serviceURL}/public/ImageCode.php?uuid=${newTime}`;
    },
    setShowTypes() {
      this.showTypes = true;
    },
    onSelect(data) {
      this.typeInfo = data;
      this.showTypes = false;
    },
    /// 过滤当前币种
    loadAssetData() {
      assetTypeApi().then(res => {
        this.currSymbol = res.data.filter(
          x => x.asset === this.$route.query.asset
        )[0];
      });
    },
    /// 获取余额
    loadAmount() {
      myBalanceApi().then(res => {
        this.asset = res.data.filter(
          x => x.asset === this.$route.query.asset
        )[0];
      });
    },
    submit() {
      if (!this.number) {
        Toast("请输入提币数量");
        return;
      }
      if (this.number < this.currSymbol.minFee) {
        Toast("提币数量不能低于手续费");
        return;
      }
      /*if (this.number > this.asset.available) {
          Toast("提币数量超出可用余额");
          return;
        }*/
      if (!this.address) {
        Toast(this.isWithdraw ? "请输入提币地址" : "请输入收账手机号或邮箱");
        return;
      }
      if (!this.pwd) {
        Toast("请输入资金密码");
        return;
      }
      if (!this.code) {
        Toast("请输入验证码");
        return;
      }
      if (this.typeInfo.value === "trans") {
        this.trans();
      } else {
        if (this.number >= this.currSymbol.maxWithdraw) {
          Dialog.confirm({
            message: "为确保资金安全，请联系客服核查！"
          })
            .then(() => {
              this.isShowGoogleValid = true;
            })
            .catch(() => {
              // on cancel
            });
        } else {
          this.isShowGoogleValid = true;
        }
      }
    },
    // 内部转账
    trans() {
      const postData = {
        type: this.isMobileValid ? "phone" : "email",
        captcha: this.code,
        account: this.address,
        assetId: this.currSymbol.id,
        amount: this.number,
        payPwd: md5(this.pwd)
      };
      internalTransferApi(postData).then(res => {
        Toast("提交成功");
        this.$router.goBack();
      });
    },
    selectCurrency() {
      this.$router.replace({
        path: "/selectCurrency",
        query: { isTopUp: false }
      });
    },
    // 提现
    enter(x) {
      this.isShowGoogleValid = false;
      const postData = {
        type: this.isMobileValid ? "phone" : "email",
        captcha: this.code,
        address: this.address,
        assetId: this.currSymbol.id,
        gaCaptcha: x,
        amount: this.number,
        payPwd: md5(this.pwd)
      };
      withdrawalCurrencyApi(postData).then(res => {
        Toast("提交成功");
        this.$router.goBack();
      });
    },
    recode() {
      this.$router.push({
        path: "/topupExtractRecode",
        query: {
          isTopUp: false,
          asset: this.$route.query.asset
        }
      });
    },
    send() {
      if (this.sendding) {
        return;
      }
      this.sendding = true;
      const postData = {
        type: this.isMobileValid ? "phone" : "email",
        imageCaptcha: this.imgCode
      };
      authSendApi(postData)
        .then(res => {
          if (res.ret === 200) {
            Toast("验证码已发送，请注意查收");
            let timer = setInterval(() => {
              if (this.interval > 0) {
                this.interval -= 1;
              } else {
                this.sendding = false;
                clearInterval(timer);
                this.interval = 60;
              }
            }, 1000);
          }
        })
        .catch(() => {
          this.sendding = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base";

$place-color: #ccc;
$place-fontSize: 14px;

.currency {
  margin-top: 8px;
  background: $content-backgroun-color;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid $divider-color;

  .icon {
    @include size(20px);
    /*background: red;*/
  }

  .name {
    margin-left: 8px;
    color: $h2-color;
    font-size: 16px;
    flex: 1;
  }

  .select {
    font-size: 14px;
    color: $h2-color;
  }

  .more {
    max-height: 10px;
    margin-left: 8px;
  }
}

.amount {
  background: $content-backgroun-color;
  margin-top: 8px;
  padding: 12px 16px;

  .top {
    display: flex;
    justify-content: space-between;

    .symbol {
      font-size: 14px;
      color: $h2-color;
    }

    .balance {
      font-size: 13px;
      color: $h3-color;
    }
  }

  .input {
    font-size: 14px;
    color: $h2-color;
    display: flex;
    margin-top: 10px;

    input {
      flex: 1;
      border: none;
      box-shadow: none;

      &::placeholder {
        color: #ccc;
      }
    }

    .all {
      color: $main-color;
      font-size: 13px;
      text-decoration: none;
      padding-left: 12px;
      border-left: 1px solid $main-color;
    }
  }
}

.address {
  background: $content-backgroun-color;
  margin-top: 8px;
  padding: 12px 16px;

  .top {
    display: flex;
    align-items: center;

    .title {
      font-size: 14px;
      color: $h2-color;
    }
  }

  &-input {
    display: block;
    height: 20px;
    border: 0;
    margin: 8px 0;
    width: 100%;

    &::placeholder {
      color: $place-color;
      font-size: $place-fontSize;
    }
  }

  .hr {
    background: $divider-color;
    height: 1px;
    margin: 8px 0 12px;
  }

  .fee {
    color: $h3-color;
    font-size: 12px;
  }
}

.pwd {
  background: $content-backgroun-color;
  margin-top: 8px;
  display: flex;
  // align-items: center;
  flex-direction: column;
  .pay-pwd-img {
    .title {
      font-size: 14px;
      color: $h2-color;
      width: 80px !important;
    }
    padding: 0 0 0 16px !important;
    .send-code {
      border-left: none !important;
    }
  }
  .pay-pwd {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px $divider-color solid;

    .title {
      font-size: 14px;
      color: $h2-color;
      width: 80px;
    }

    .pay-pwd-input {
      flex: 1;
      margin-left: 12px;
      text-align: left;
    }

    .send-code {
      color: $main-color;
      font-size: 13px;
      padding-left: 12px;
      border-left: 1px solid $main-color;
      &.gray {
        color: #666;
        border-left-color: #666;
      }
    }
  }
}

.input {
  color: $h2-color;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
    font-size: 14px;
  }
}

.group {
  background: $content-backgroun-color;
  margin-top: 8px;
  padding: 12px 16px;
}

.tips {
  color: $h3-color;
  font-size: 12px;
  line-height: 180%;
}

.switch {
  color: $main-color;
  font-size: 13px;
  margin-top: 24px;
  margin-left: 12px;
  text-decoration: none;
  align-self: start;
  text-align: center;
}

.submit {
  height: 44px;
  border-radius: 22px;
  width: 80%;
  align-self: center;
  margin: 36px auto;
}
</style>
