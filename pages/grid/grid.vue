<template>
  <view class="warp">
    <!-- #ifdef APP -->
    <statusBar></statusBar>
    <!-- #endif -->

    <!-- banner -->
    <!-- <unicloud-db
      ref="bannerdb"
      v-slot:default="{ data, loading, error, options }"
      collection="opendb-banner"
      field="_id,bannerfile,open_url,title"
      @load="onqueryload"
    > -->
    <!-- 当无banner数据时显示占位图 -->
    <!-- <image
        v-if="!(loading || data.length)"
        class="banner-image"
        src="/static/uni-center/headers.png"
        mode="aspectFill"
        :draggable="false"
      /> -->

    <!-- <swiper
        v-else
        class="swiper-box"
        @change="changeSwiper"
        :current="current"
        indicator-dots
      >
        <swiper-item v-for="(item, index) in data" :key="item._id">
          <image
            class="banner-image"
            :src="item.bannerfile.url"
            mode="aspectFill"
            @click="clickBannerItem(item)"
            :draggable="false"
          />
        </swiper-item>
      </swiper> -->
    <!-- </unicloud-db> -->

    <!-- 宫格 -->
    <!-- <view class="section-box">
      <text class="decoration"></text>
      <text class="section-text">嘟嘟点餐</text>
    </view> -->

    <!-- :options="{ forceUpdate: true }" -->
    <unicloud-db
      ref="udb"
      v-slot:default="{ data, loading, error, options }"
      collection="menu"
      field="name,file,type"
      @load="handleLoad"
    >
      <view class="example-body">
        <view v-for="(item, i) in data" :key="i">
          <view class="example-body__title">{{ i + 1 }}</view>
          <view @click="() => handleClick(item)">
            <view
              style="
                width: 100%;
                height: 400rpx;
                border: 1px solid rgb(243 243 243);
                border-radius: 22rpx;
                position: relative;
              "
            >
              <view
                style="position: absolute; right: 10rpx; top: 10rpx; z-index: 1"
              >
                <uni-tag
                  :inverted="true"
                  :text="item.type"
                  type="success"
                  size="small"
                  :circle="true"
                  :custom-style="getStyle(item.type)"
                />
              </view>
              <image
                v-if="item.file && item.file.url"
                :src="item.file.url"
                class="image"
                mode="aspectFill"
              />
              <view
                style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #dedede;
                "
                v-else
              >
                暂未上传封面
              </view>
            </view>
            <view style="text-align: center">
              <text class="big-number">{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
      <uni-load-more
        :status="loading ? 'loading' : loadMoreStatus"
      ></uni-load-more>
    </unicloud-db>
    <!-- 编辑 -->
    <uni-popup ref="popup" type="bottom" background-color="#fff" safe-area>
      <view style="padding: 40rpx 40rpx 160rpx">
        <view class="warp-title">
          <text>{{ formData.name }}</text>
        </view>
        <button
          plain
          size="default"
          type="success"
          hover-class="is-hover"
          @click="handleView"
        >
          查看大图
        </button>
        <button
          plain
          style="margin-top: 20rpx"
          size="default"
          type="primary"
          hover-class="is-hover"
          @click="handleEdit"
        >
          编辑
        </button>
        <button
          style="margin-top: 20rpx"
          size="default"
          type="warn"
          hover-class="is-hover"
          @click="handleDel"
        >
          删除
        </button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// #ifdef APP
import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
// #endif

export default {
  // #ifdef APP
  components: {
    statusBar,
  },
  // #endif
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
              errorMessage: "菜名必填",
            },
          ],
        },
      },
      loadMoreStatus: "more",
      formData: {},
      noNeedFetfh: false,
      typeColors: {
        // 'success', 'primary', 'warning', 'error', 'info', ''
        荤菜: {
          "background-color": "#4335d6",
          "border-color": "#4335d6",
          color: "#fff",
        },
        素菜: {
          "background-color": "#35d650",
          "border-color": "#35d650",
          color: "#fff",
        },
        水果: {
          "background-color": "#732626",
          "border-color": "#732626",
          color: "#fff",
        },
        主食: {
          "background-color": "#B93EAA",
          "border-color": "#B93EAA",
          color: "#fff",
        },
        汤: {
          "background-color": "#32947F",
          "border-color": "#32947F",
          color: "#fff",
        },
        饮品: {
          "background-color": "#366CA1",
          "border-color": "#366CA1",
          color: "#fff",
        },
        其他: {
          "background-color": "#C3DA91",
          "border-color": "#C3DA91",
          color: "#fff",
        },
      },
    };
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData(
      {
        clear: true,
      },
      () => {
        uni.stopPullDownRefresh();
      }
    );
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  },
  onShow() {
    const needFetch = uni.getStorageSync("needFetch");
    if (needFetch) {
      this.$refs.udb?.reset();
      this.$refs.udb?.refresh();
      uni.setStorageSync("needFetch", false);
    }
  },
  onLoad() {},
  methods: {
    change(e) {
      // const db = uniCloud.database()
      // db.collection('menu')
      //   .get()
      //   .then((res) => {
      //     // res 为数据库查询结果
      //     console.log(res, '结果啊')
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
      uni.showToast({
        title:
          this.$t("grid.clickTip") +
          " " +
          `${e.detail.index + 1}` +
          " " +
          this.$t("grid.clickTipGrid"),
        icon: "none",
      });
    },
    /**
     * banner加载后触发的回调
     */
    onqueryload(data) {},
    changeSwiper(e) {
      this.current = e.detail.current;
    },
    /**
     * 点击banner的处理
     */
    clickBannerItem(item) {
      // 有外部链接-跳转url
      if (item.open_url) {
        uni.navigateTo({
          url:
            "/uni_modules/uni-id-pages/pages/common/webview/webview?url=" +
            item.open_url +
            "&title=" +
            item.title,
          success: (res) => {},
          fail: () => {},
          complete: () => {},
        });
      }
      // 其余业务处理
    },
    handleClick(item) {
      this.formData = { ...item };
      this.$refs.popup.open();
      // const hO = {
      //   0: () => {
      //     this.handleEdit();
      //   },
      //   1: () => {
      //     this.handleDel(item);
      //   },
      // };
      // hO[e.index]();
    },
    handleView() {
      if (this.formData?.file?.url) {
        uni.previewImage({
          current: 0, // 当前显示图片的索引
          urls: [this.formData.file.url], // 需要预览的图片列表
        });

        return;
      }
      uni.showToast({
        title: "这道菜没有上传图片",
        icon: "none",
        duration: 2000,
        mask: true,
      });
      // debugger;
    },
    handleEdit() {
      // 编辑
      // 这他妈什么bug
      setTimeout(() => {
        // this.$refs.popup.open();
        const id = this.formData._id;
        uni.setStorageSync("tabbarParams", { id });
        this.$refs.popup.close();
        uni.switchTab({
          url: `/pages/menu/menu`,
        });
      }, 300);
    },
    handleDel() {
      // 删除
      this.$refs.udb.remove(this.formData._id, {
        success: () => {
          uni.showToast({
            title: "删除成功",
            icon: "none",
          });
          this.$refs.popup.close();
          // 刷新列表
        },
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
    //       console.log("表单错误信息：", err);
    //     });
    // },
    handleLoad(data, ended) {
      this.loadMoreStatus = ended ? "noMore" : "more"; // oading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    },
    getStyle(type) {
      let t = this.typeColors[type];
      let str = "";
      for (let key in t) {
        str += `${key}:${t[key]};`;
      }
      return str;
    },
  },
};
</script>

<style>
/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100%;
  height: auto;
}
view {
  font-size: 14px;
  line-height: inherit;
}
/* #endif */

.section-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx;
}
.decoration {
  width: 4px;
  height: 12px;
  border-radius: 10px;
  background-color: #2979ff;
}
.section-text {
  color: #333;
  margin-left: 15rpx;
}

.example-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding: 0 15px 15px;
  background-color: #ffffff;
}

.example-body__title {
  font-size: 70rpx;
  font-style: oblique;
  font-weight: bold;
  background: linear-gradient(180deg, #2979ff 0%, #00ff43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 22rpx;
}

.big-number {
  font-size: 30rpx;
  font-weight: 500;
  font-stretch: condensed;
  /* font-style: oblique; */
  background: linear-gradient(-180deg, #2979ff 20%, #00ff43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text {
  text-align: center;
  font-size: 26rpx;
  margin-top: 10rpx;
}

.banner-image {
  width: 100%;
  height: 400rpx;
}

.swiper-box {
  height: 400rpx;
}

.search-container-bar {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
}

.uni-grid-item {
  box-sizing: border-box;
  padding: 20rpx;
}

.warp-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30rpx;
  /* font-style: oblique; */
}

/* #ifndef APP-NVUE || VUE3*/
::v-deep
	/* #endif */
	.uni-searchbar__box {
  border-width: 0;
}

/* #ifndef APP-NVUE || VUE3 */
::v-deep
	/* #endif */
	.uni-input-placeholder {
  font-size: 28rpx;
}
</style>
