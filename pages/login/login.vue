<template>
	<view>
		<view class="title">账号密码登录</view>
		<p class="hint">验证通过后完成登录</p>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" type="number" placeholder="请输入手机号码" />
		</view>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" password  type="digit" placeholder="请输入密码" />
		</view>
		<view class="input uni-form-item uni-column">
			<button type="primary" @click="login">登录</button>
		</view>
		<view class="input">
			<span>忘记密码</span>
			<span class="register" @click="register">立即注册</span>
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
			login () {
				
			},
			register () {
				uni.navigateTo({
				    url: '../register/register'
				});
			}
		}
	}
</script>

<style scoped>
	.title {
		padding: 30px;
		font-size: 26px;
		text-align: center;
	}
	.hint {
		text-align: center;
		font-size: 16px;
	}
	.input {
		margin: 20px;
	}
	.register {
		float: right;
	}
</style>
