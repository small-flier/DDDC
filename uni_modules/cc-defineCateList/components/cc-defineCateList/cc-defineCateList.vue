<template>

	<view>

     <!-- 关注"前端组件开发"公众号，可申请加入前端技术交流群 -->
	 <view class="cateBox">
	 		<!-- 左侧列表 -->
	 		<scroll-view class="cate-left" scroll-y="true" :scroll-top="verticalNavTop" scroll-with-animation>
	 			<view class="cate-left-list" v-for="(item,index) in data" :key="index" @click="tapselect(index)">
	 				<!-- activeItem为选中状态 -->
	 				<view class="cate-left-item " :class="{activeItem:currentTab==index}">
	 					<label></label><text>{{item.navtitle}}</text>
	 				</view>
	 			</view>
	 		</scroll-view>
	 
	 		<!-- 右侧列表 -->
	 		<scroll-view ref="rightScrollV" class="cate-right" scroll-y="true" @scroll="mainScroll" :scroll-into-view="'cate-'+mainCur"
	 			scroll-with-animation>
	 			<view v-for="(item,index) in data" :key="index" :id="'cate-'+index">
	 				<view class="cate-right-title">
	 					<view class="line"></view>
	 					<text>{{item.navtitle}}</text>
	 				</view>
	 				<view class="cate-right-list">
	 					<view class="cate-right-item" v-for="(child,childindex) in item.shop" :key="childindex"
	 						@click="itemClick(child)">
	 						<image :src="child.shopimage" mode=""></image>
	 						<text>{{child.shoptitle}}</text>
	 					</view>
	 				</view>
	 			</view>
	 			
	 			<view style="height: 260px;"></view>
	 		</scroll-view>
	 	</view>
	</view>

</template>

<script>
	export default {
		props: {

			data: {
				type: Array,
				default () {
					return []
				}
			}


		},
		data() {
			return {
				currentTab: 0,
				mainCur: 0,
				verticalNavTop: 0,
				list: [{}],

			}
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			itemClick(item) {

				this.$emit('itemClick', item)

			},
			//点击左侧按钮
			tapselect(index) {
				
				
				// 左边侧边栏点击了
				this.currentTab = index;
				// 设置右边滑动
				this.mainCur = index;
			    this.verticalNavTop = (index - 1) * 50;
			
			},
			//右侧滚动
			mainScroll(e) {
				console.log("在滑动");
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						
						console.log("执行了里面在滑动");
						
						this.currentTab = i;
						// this.mainCur = i;
					    this.verticalNavTop = (i - 1) * 50
						return true
						
						
					}
				}
			},
			//获取右侧每项的top和bottom,里面需获取对应dom元素的高度，所以只能在mounted生命周期里调用
			getHeight() {
				var top = 0;
				var bottom = 0;
				var temp = 0;
				for (let i = 0; i < this.data.length; i++) {
					let view = uni.createSelectorQuery().select("#cate-" + i)

					// #ifdef  MP-WEIXIN
					view = uni.createSelectorQuery().in(this).select("#cate-" + i);
					//	#endif


					view.fields({
						size: true
					}, data => {
						top = temp;
						bottom = temp + data.height;
						this.list[i] = {
							top: top,
							bottom: bottom
						};
						temp = bottom;
					}).exec();
				}

			}
		}


	}
</script>

<style>
	.cateBox {
		position: absolute;
		top: 120rpx;
		bottom: 0;
		background: #fff;
		width: 100%;
		display: flex;
	}

	.cate-left {
		width: 200rpx;
		background: #f4f4f4;
		height: 100%;
	}

	.cate-left-item {
		background: #f4f4f4;
		height: 50px;
		display: flex;
		align-items: center;
	}

	.cate-left-item.activeItem {
		background: #fff;
	}
	/* 
 */

	.cate-left-item label {
		width: 4rpx;
		height: 15px;
		float: left;
		background: #f4f4f4;
	}

	.cate-left-item.activeItem label {
		background: #0bbbef;
	}

	.cate-left-item text {
		width: 196rpx;
		font-size: 28rpx;
		display: block;
		text-align: center;
	}

	/* 右侧*/
	.cate-right {
		flex: 1;
	}

	.cate-right-title {
		text-align: center;
		font-size: 28rpx;
		margin-top: 20rpx;
		line-height: 80rpx;
		position: relative;
	}

	.cate-right-title .line {
		position: absolute;
		height: 2rpx;
		width: 300rpx;
		background: orange;
		top: 39rpx;
		left: 50%;
		margin-left: -150rpx;
	}

	.cate-right-title text {
		background: #fff;
		padding: 0 10px;
		position: relative;
		color: #999;
	}

	.cate-right-list {
		height: auto;
		overflow: hidden;
	}

	.cate-right-item {
		width: 33.33%;
		float: left;
		margin-top: 20rpx;
	}

	.cate-right-item image {
		width: 160rpx;
		height: 160rpx;
		display: block;
		margin: 0 auto;
	}

	.cate-right-item text {
		display: block;
		text-align: center;
		font-size: 24rpx;
	}
</style>