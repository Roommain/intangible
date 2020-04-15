<template>
	<view>
		<view class="login">
			<view class="head" @click="login">
				<image class="head-img" src="../../static/head.jpeg"></image>
				<span class="login-btn">登录/注册</span>
			</view>

		</view>
		<view class="collect">
			收藏
		</view>
		<view class="no-data">
			<image class="collect-img" src="../../static/timg.jpg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login() {
				uni.navigateTo({
				    url: '../login/login'
				});
			}
		}
	}
</script>

<style scoped>
.login{
	width: 100vw;
	height: 100px;
	background-color: #fffbfa;
}
.head{
	padding: 10px;
}
.head-img {
	width: 70px;
	height: 70px;
	border-radius: 50%;
}
.login-btn {
	position: relative;
	top:-20px;
}
.collect {
	height: 40px;
	background-color: #fefff7;
	line-height: 40px;
	text-align: center;
}
.no-data {
	text-align: center;
}
</style>
