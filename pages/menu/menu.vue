<template>
  <view class="menu">
    <uni-forms
      ref="baseFormRef"
      :rules="rules"
      :modelValue="formData"
      label-position="top"
    >
      <uni-forms-item label="菜名" required name="name">
        <uni-easyinput v-model="formData.name" placeholder="请输入菜名" />
      </uni-forms-item>
      <uni-forms-item label="图片">
        <uni-file-picker
          v-model="imageValue"
          fileMediatype="image"
          mode="grid"
          @select="select"
          @progress="progress"
          @success="success"
          @fail="fail"
          :limit="1"
        />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" :loading="loading" @click="formSubmit">提交</button>
  </view>
</template>

<script>
export default {
  onShow() {
    const params = uni.getStorageSync("tabbarParams");
    if (params.id) {
      uni.removeStorageSync("tabbarParams");
      const db = uniCloud.database();
      db.collection("menu")
        .where({
          _id: params.id,
        })
        .get()
        .then((res) => {
          if (res.result && res.result.data) {
            this.formData = res.result.data[0];
            this.imageValue = res.result.data[0].file;
          }
        });
    }
  },
  onHide() {},
  data() {
    return {
      imageValue: [],
      formData: {},
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "菜名不能为空",
            },
          ],
        },
      },
      loading: false,
      isUpload: false,
    };
  },
  methods: {
    formSubmit() {
      this.$refs.baseFormRef
        .validate()
        .then((res) => {
          let data = { ...this.formData };
          if (this.imageValue && this.imageValue[0]) {
            const { name, extname, url } = this.imageValue[0];
            data = {
              ...this.formData,
              file: {
                name,
                extname,
                url,
              },
            };
          }
          if (this.isUpload) {
            uni.showToast({
              title: "请等待图片上传完成",
              icon: "none",
            });
            return;
          }
          this.loading = true;
          // 根据编辑或者新增，来处理不同的方式
          if (this.formData._id) {
            this.update(data);
            return;
          }
          this.add(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    add(data) {
      const db = uniCloud.database();
      db.collection("menu")
        .add(data)
        .then((res) => {
          this.operSuccess();
        })
        .catch((err) => {
          console.error("新增失败", err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    update(data) {
      const db = uniCloud.database();
      db.collection("menu")
        .where({ _id: this.formData._id })
        .update(data)
        .then(() => {
          this.operSuccess();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    operSuccess() {
      uni.showToast({
        title: "操作成功",
      });
      setTimeout(() => {
        // 清除一下表单数据
        this.imageValue = [];
        this.formData = {};
        uni.setStorageSync("needFetch", true);
        uni.switchTab({
          url: "/pages/grid/grid",
        });
      }, 1000);
    },
    // 获取上传状态
    select(e) {
      this.isUpload = true;
      console.log("选择文件：", e);
    },
    // 获取上传进度
    progress(e) {
      console.log("上传进度：", e);
    },

    // 上传成功
    success(e) {
      console.log("上传成功", e);
      this.isUpload = false;
    },

    // 上传失败
    fail(e) {
      console.log("上传失败：", e);
      this.noClear = false;
    },
  },
};
</script>

<style lang="scss">
.menu {
  padding: 30rpx;
}
</style>
