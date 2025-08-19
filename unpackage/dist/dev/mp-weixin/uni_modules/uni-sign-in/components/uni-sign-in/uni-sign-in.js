"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniSignIn_utils_ad = require("../../utils/ad.js");
const common_assets = require("../../../../common/assets.js");
const db = common_vendor.tr.database();
const signInTable = db.action("signIn").collection("opendb-sign-in");
new Date((/* @__PURE__ */ new Date()).toLocaleDateString()).getTime();
const _sfc_main = {
  name: "uni-signIn",
  data() {
    return {
      total: 0,
      scores: 0,
      weekdays: [1, 2, 3, 4, 5, 6, 7],
      signInRes: {
        days: [],
        n: 0
      }
    };
  },
  mounted() {
  },
  methods: {
    async getSignedInInfo(ToastText = "今日已签过") {
      const date = new Date((/* @__PURE__ */ new Date()).toLocaleDateString()).getTime();
      let res = await signInTable.where(`'user_id' == $env.uid && 'date' == ${date} && 'isDelete' == false`).get();
      if (res.result.data.length) {
        this.signInRes = res.result;
        this.$refs.popup.open();
        common_vendor.index.showToast({
          title: ToastText,
          duration: 3e3,
          icon: "none"
        });
      }
      return res.result.data;
    },
    //看激励视频广告签到
    async showRewardedVideoAd() {
      let res = await this.getSignedInInfo();
      common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:83", res);
      if (res && res.length == 0) {
        let {
          _id: userId
        } = common_vendor.index.getStorageSync("userInfo");
        common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:88", userId, common_vendor.index.getStorageSync("userInfo"));
        if (!userId) {
          return common_vendor.index.navigateTo({
            url: "/pages/ucenter/login-page/index/index"
          });
        }
        uni_modules_uniSignIn_utils_ad.AD.show({
          adpid: 1733738477,
          // HBuilder 基座测试广告位
          adType: "RewardedVideo",
          urlCallback: {
            userId,
            extra: "uniSignIn"
          }
        }, (res2) => {
          if (res2 && res2.isEnded) {
            common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:106", "onClose " + res2.isEnded);
            let i = 0;
            common_vendor.index.showLoading({
              mask: true
            });
            let myIntive = setInterval(async (e) => {
              i++;
              res2 = await this.getSignedInInfo("签到成功");
              if (i > 2 || res2.length) {
                if (!res2.length) {
                  common_vendor.index.showToast({
                    title: "签到失败！",
                    icon: "error",
                    duration: 6e3
                  });
                }
                clearInterval(myIntive);
                common_vendor.index.hideLoading();
              }
            }, 2e3);
          } else {
            common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:130", "onClose " + res2.isEnded);
            common_vendor.index.showToast({
              title: "播放中途退出,签到失败！",
              icon: "error",
              duration: 5e3
            });
          }
        }, (err) => {
          common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:140", err);
          common_vendor.index.showToast({
            title: err.errMsg,
            icon: "none"
          });
        });
      }
    },
    //普通点击签到
    async open() {
      common_vendor.index.showLoading({
        mask: true
      });
      try {
        let res = await this.getSignedInInfo();
        if (res && res.length == 0) {
          let res2 = await signInTable.add({});
          common_vendor.index.__f__("log", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:157", res2);
          common_vendor.index.hideLoading();
          this.signInRes = res2.result;
          this.$refs.popup.open();
          if (this.signInRes.days.length == 7) {
            common_vendor.index.showToast({
              title: "你已完成7日连续签到，获得60积分！",
              icon: "none",
              duration: 5e3
            });
          } else {
            common_vendor.index.showToast({
              title: "签到成功,获得10积分！",
              icon: "none",
              duration: 5e3
            });
          }
        }
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("error", "at uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.vue:177", e);
      }
    },
    closeMe(e) {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: common_vendor.t($data.signInRes.days.length),
    c: common_vendor.t($data.signInRes.score),
    d: common_vendor.f($data.weekdays, (item, index, i0) => {
      return common_vendor.e({
        a: $data.signInRes.days.includes(item - 1)
      }, $data.signInRes.days.includes(item - 1) ? {
        b: "dc1d9ace-1-" + i0 + ",dc1d9ace-0",
        c: common_vendor.p({
          color: "#FFFFFF",
          type: "checkmarkempty"
        })
      } : common_vendor.e({
        d: item < $data.signInRes.n
      }, item < $data.signInRes.n ? {
        e: "dc1d9ace-2-" + i0 + ",dc1d9ace-0",
        f: common_vendor.p({
          color: "#FFFFFF",
          type: "closeempty"
        })
      } : {
        g: "dc1d9ace-3-" + i0 + ",dc1d9ace-0",
        h: common_vendor.p({
          type: "checkmarkempty",
          color: "#FFFFFF"
        })
      }), {
        i: $data.signInRes.days.includes(item - 1) || item > $data.signInRes.n
      }, $data.signInRes.days.includes(item - 1) || item > $data.signInRes.n ? {
        j: common_vendor.t(item),
        k: item > $data.signInRes.n ? 1 : ""
      } : {}, {
        l: index
      });
    }),
    e: common_vendor.o($options.closeMe),
    f: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#AAAAAA"
    }),
    g: common_vendor.sr("popup", "dc1d9ace-0"),
    h: common_vendor.p({
      type: "center"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dc1d9ace"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.js.map
