"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShow() {
    const params = common_vendor.index.getStorageSync("tabbarParams");
    if (params.id) {
      common_vendor.index.removeStorageSync("tabbarParams");
      const db = common_vendor.tr.database();
      db.collection("menu").where({
        _id: params.id
      }).get().then((res) => {
        if (res.result && res.result.data) {
          this.formData = res.result.data[0];
          this.imageValue = res.result.data[0].file;
        }
      });
    }
  },
  onHide() {
  },
  data() {
    return {
      imageValue: [],
      formData: {},
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "菜名不能为空"
            }
          ]
        }
      },
      loading: false,
      isUpload: false
    };
  },
  methods: {
    formSubmit() {
      this.$refs.baseFormRef.validate().then((res) => {
        let data = { ...this.formData };
        if (this.imageValue && this.imageValue[0]) {
          const { name, extname, url } = this.imageValue[0];
          data = {
            ...this.formData,
            file: {
              name,
              extname,
              url
            }
          };
        }
        if (this.isUpload) {
          common_vendor.index.showToast({
            title: "请等待图片上传完成",
            icon: "none"
          });
          return;
        }
        this.loading = true;
        if (this.formData._id) {
          this.update(data);
          return;
        }
        this.add(data);
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/menu/menu.vue:101", "err", err);
      });
    },
    add(data) {
      const db = common_vendor.tr.database();
      db.collection("menu").add(data).then((res) => {
        this.operSuccess();
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/menu/menu.vue:112", "新增失败", err);
      }).finally(() => {
        this.loading = false;
      });
    },
    update(data) {
      const db = common_vendor.tr.database();
      db.collection("menu").where({ _id: this.formData._id }).update(data).then(() => {
        this.operSuccess();
      }).finally(() => {
        this.loading = false;
      });
    },
    operSuccess() {
      common_vendor.index.showToast({
        title: "操作成功"
      });
      setTimeout(() => {
        this.imageValue = [];
        this.formData = {};
        common_vendor.index.setStorageSync("needFetch", true);
        common_vendor.index.switchTab({
          url: "/pages/grid/grid"
        });
      }, 1e3);
    },
    // 获取上传状态
    select(e) {
      this.isUpload = true;
      common_vendor.index.__f__("log", "at pages/menu/menu.vue:147", "选择文件：", e);
    },
    // 获取上传进度
    progress(e) {
      common_vendor.index.__f__("log", "at pages/menu/menu.vue:151", "上传进度：", e);
    },
    // 上传成功
    success(e) {
      common_vendor.index.__f__("log", "at pages/menu/menu.vue:156", "上传成功", e);
      this.isUpload = false;
    },
    // 上传失败
    fail(e) {
      common_vendor.index.__f__("log", "at pages/menu/menu.vue:162", "上传失败：", e);
      this.noClear = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.name = $event),
    b: common_vendor.p({
      placeholder: "请输入菜名",
      modelValue: $data.formData.name
    }),
    c: common_vendor.p({
      label: "菜名",
      required: true,
      name: "name"
    }),
    d: common_vendor.o($options.select),
    e: common_vendor.o($options.progress),
    f: common_vendor.o($options.success),
    g: common_vendor.o($options.fail),
    h: common_vendor.o(($event) => $data.imageValue = $event),
    i: common_vendor.p({
      fileMediatype: "image",
      mode: "grid",
      limit: 1,
      modelValue: $data.imageValue
    }),
    j: common_vendor.p({
      label: "图片"
    }),
    k: common_vendor.sr("baseFormRef", "62c74c86-0"),
    l: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.formData,
      ["label-position"]: "top"
    }),
    m: $data.loading,
    n: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/menu.js.map
