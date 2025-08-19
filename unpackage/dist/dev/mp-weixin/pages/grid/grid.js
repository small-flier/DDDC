"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentPage: 1,
      current: 0,
      hasLogin: false,
      rules: {
        // 对name字段进行必填验证
        name: {
          rules: [
            {
              required: true,
              errorMessage: "菜名必填"
            }
          ]
        }
      },
      loadMoreStatus: "more",
      formData: {},
      noNeedFetfh: false
    };
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData(
      {
        clear: true
      },
      () => {
        common_vendor.index.stopPullDownRefresh();
      }
    );
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  },
  onShow() {
    var _a, _b;
    const needFetch = common_vendor.index.getStorageSync("needFetch");
    if (needFetch) {
      (_a = this.$refs.udb) == null ? void 0 : _a.reset();
      (_b = this.$refs.udb) == null ? void 0 : _b.refresh();
      common_vendor.index.setStorageSync("needFetch", false);
    }
  },
  onLoad() {
  },
  methods: {
    change(e) {
      common_vendor.index.showToast({
        title: this.$t("grid.clickTip") + ` ${e.detail.index + 1} ` + this.$t("grid.clickTipGrid"),
        icon: "none"
      });
    },
    /**
     * banner加载后触发的回调
     */
    onqueryload(data) {
    },
    changeSwiper(e) {
      this.current = e.detail.current;
    },
    /**
     * 点击banner的处理
     */
    clickBannerItem(item) {
      if (item.open_url) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/common/webview/webview?url=" + item.open_url + "&title=" + item.title,
          success: (res) => {
          },
          fail: () => {
          },
          complete: () => {
          }
        });
      }
    },
    handleClick(item) {
      this.formData = { ...item };
      this.$refs.popup.open();
    },
    handleView() {
      var _a, _b;
      if ((_b = (_a = this.formData) == null ? void 0 : _a.file) == null ? void 0 : _b.url) {
        common_vendor.index.previewImage({
          current: 0,
          // 当前显示图片的索引
          urls: [this.formData.file.url]
          // 需要预览的图片列表
        });
        return;
      }
      common_vendor.index.showToast({
        title: "这道菜没有上传图片",
        icon: "none",
        duration: 2e3,
        mask: true
      });
    },
    handleEdit() {
      setTimeout(() => {
        const id = this.formData._id;
        common_vendor.index.setStorageSync("tabbarParams", { id });
        this.$refs.popup.close();
        common_vendor.index.switchTab({
          url: `/pages/menu/menu`
        });
      }, 300);
    },
    handleDel() {
      this.$refs.udb.remove(this.formData._id, {
        success: () => {
          common_vendor.index.showToast({
            title: "删除成功",
            icon: "none"
          });
          this.$refs.popup.close();
        }
      });
    },
    // submit() {
    //   this.$refs.formRef
    //     .validate()
    //     .then((res) => {
    //       this.$refs.udb.update(
    //         this.formData._id,
    //         {
    //           name: this.formData.name,
    //         },
    //         {
    //           success: () => {
    //             this.$refs.popup.close();
    //             this.$refs.udb.refresh();
    //           },
    //         }
    //       );
    //     })
    //     .catch((err) => {
    //       uni.__f__('log','at pages/grid/grid.vue:313',"表单错误信息：", err);
    //     });
    // },
    handleLoad(data, ended) {
      this.loadMoreStatus = ended ? "noMore" : "more";
    }
  }
};
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_unicloud_db2 + _easycom_uni_load_more2 + _easycom_uni_popup2)();
}
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_uni_load_more + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: !(loading || data.length)
      }, !(loading || data.length) ? {
        b: common_assets._imports_0
      } : {
        c: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item.bannerfile.url,
            b: common_vendor.o(($event) => $options.clickBannerItem(item), item._id),
            c: item._id
          };
        }),
        d: common_vendor.o((...args) => $options.changeSwiper && $options.changeSwiper(...args)),
        e: $data.current
      }, {
        f: i0,
        g: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "4554b4e6-0"
    }),
    b: common_vendor.sr("bannerdb", "4554b4e6-0"),
    c: common_vendor.o($options.onqueryload),
    d: common_vendor.p({
      collection: "opendb-banner",
      field: "_id,bannerfile,open_url,title"
    }),
    e: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return {
        a: common_vendor.f(data, (item, i, i1) => {
          return common_vendor.e({
            a: common_vendor.t(i + 1),
            b: item.file && item.file.url
          }, item.file && item.file.url ? {
            c: item.file.url
          } : {}, {
            d: common_vendor.t(item.name),
            e: common_vendor.o(() => $options.handleClick(item), i),
            f: i
          });
        }),
        b: "4554b4e6-2-" + i0 + ",4554b4e6-1",
        c: common_vendor.p({
          status: loading ? "loading" : $data.loadMoreStatus
        }),
        d: i0,
        e: s0
      };
    }, {
      name: "d",
      path: "e",
      vueId: "4554b4e6-1"
    }),
    f: common_vendor.sr("udb", "4554b4e6-1"),
    g: common_vendor.o($options.handleLoad),
    h: common_vendor.p({
      collection: "menu",
      field: "name,file"
    }),
    i: common_vendor.t($data.formData.name),
    j: common_vendor.o((...args) => $options.handleView && $options.handleView(...args)),
    k: common_vendor.o((...args) => $options.handleEdit && $options.handleEdit(...args)),
    l: common_vendor.o((...args) => $options.handleDel && $options.handleDel(...args)),
    m: common_vendor.sr("popup", "4554b4e6-3"),
    n: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff",
      ["safe-area"]: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/grid/grid.js.map
