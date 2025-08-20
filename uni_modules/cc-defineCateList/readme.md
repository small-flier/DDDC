# cc-defineCateList


##uniapp专属精品组件页面模板（由前端组件开发出品）精品组件页面模板

###●组件模板规划：
由前端组件开发出品的精品组件页面模板，将陆续发布，预计高达约几百种供您使用，是快速快发项目、创业的必备精品。

合集地址： uni-app模板合集地址：(https://ext.dcloud.net.cn/publisher?id=274945) 如查看全部页面模板，请前往上述uniapp插件市场合集地址；

###●组件模板效果图：
可下载项目后预览，效果图见右侧图片；

###●组件模板费用：
学习：免费下载，进行学习，无费用；

使用/商用：本页面地址赞赏10元后，可终身商用；

###●组件模板使用版权/商用：
本组件模板免费下载可供学习，如需使用及商用，请在本组件页面模板进行赞赏10元

（仅需10元获取精品页面模板代码-物有所值，1个组件页面市场价100元 ）

赞赏10后（当前项目产生赞赏订单可追溯）即可终身商用当前本地址下载的页面模版代码，不同下载地址需进行不同的赞赏。（不赞赏就进行商用使用者，面临侵权！保留追究知识产权法律责任！后果自负！）



### 我的技术公众号(私信可加前端技术交流群)

群内气氛颇为不错，应该可能算为数不多专门进行技术交流的前端群，同时也涵盖后端技术产品交流，偶尔成员们会聊天摸鱼。

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)


#### 使用方法

```使用方法

<!-- data:商品列表数组[{navtitle:标题 shop:[] 展示列表}] @itemClick:商品条目点击事件-->
<cc-defineCateList :data="data" @itemClick="cateItemClick"></cc-defineCateList>


```

#### HTML代码实现部分
```html

<template>
	<view class="content">

		<!-- 自定义顶部搜索框 用于搜索跳转 skipUrl:跳转url为绝对路径 /pages开头 -->
		<cc-headSearch skipUrl="/pages/index/search"></cc-headSearch>

		<!-- data:商品列表数组[{navtitle:标题 shop:展示列表}] @click:商品条目点击事件-->
		<cc-defineCateList :data="data" @itemClick="cateItemClick"></cc-defineCateList>



	</view>
</template>

<script>
	export default {


		data() {
			return {
				// 列表数组 navtitle:标题 shop:展示列表
				data: [{
						navtitle: '精品推荐1',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '手机数码2',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '声学设备3',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '精品推荐4',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '手机数码5',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '手机数码6',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},
					{
						navtitle: '手机数码7',
						shop: [{
								shoptitle: "手机一",
								shopimage: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
							},
							{
								shoptitle: "手机二",
								shopimage: "https://cdn.pixabay.com/photo/2015/05/12/09/13/social-media-763731_1280.jpg",
							},
							{
								shoptitle: "手机三",
								shopimage: "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg",
							},
							{
								shoptitle: "手机四",
								shopimage: "../../static/image/p4.png",
							}
						]
					},

				]


			}
		},
		mounted() {

		},
		methods: {

			cateItemClick(item) {

				uni.showModal({
					title: '点击条目',
					content: '点击条目数据 = ' + JSON.stringify(item)
				})
			}

		}
	}
</script>

<style>
	page {

		background-color: #f7f7f7;
	}

	.content {
		display: flex;
		flex-direction: column;

	}
</style>





```
