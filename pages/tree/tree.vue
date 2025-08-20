<template>
  <view class="content">
    <!-- 自定义顶部搜索框 用于搜索跳转 skipUrl:跳转url为绝对路径 /pages开头 -->
    <!-- <cc-headSearch skipUrl="/pages/index/search"></cc-headSearch> -->
    <view class="c__start">(～￣(OO)￣)ブ~</view>

    <!-- data:商品列表数组[{navtitle:标题 shop:展示列表}] @click:商品条目点击事件-->
    <cc-defineCateList
      :data="data"
      @itemClick="cateItemClick"
    ></cc-defineCateList>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 列表数组 navtitle:标题 shop:展示列表
      data: [
        // {
        //   navtitle: "分类1",
        //   shop: [
        //     {
        //       shoptitle: "手机一",
        //       shopimage:
        //         "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
        //     },
        //   ],
        // },
      ],
    };
  },
  mounted() {
    this.getCates();
  },
  methods: {
    cateItemClick(item) {
      if (item.shopimage) {
        uni.previewImage({
          current: 0, // 当前显示图片的索引
          urls: [item.shopimage], // 需要预览的图片列表
        });

        return;
      }
      uni.showToast({
        title: "这道菜没有上传图片",
        icon: "none",
        duration: 2000,
        mask: true,
      });
    },
    getCates() {
      const db = uniCloud.databaseForJQL();
      const tempCataDB = db.collection("opendb-mall-categories").getTemp();
      db.collection(tempCataDB, "menu")
        .get()
        .then((res) => {
          console.log("res", res);
          this.data = res.data.map((item) => {
            return {
              navtitle: item.name._value,
              shop: item.name.menu.map((cItem) => {
                return {
                  shoptitle: cItem.name,
                  shopimage: cItem.file.url,
                };
              }),
            };
          });
        });
    },
  },
};
</script>

<style>
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

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.c__start {
  font-size: 60rpx;
  font-style: oblique;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(180deg, #2979ff 0%, #00ff43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
