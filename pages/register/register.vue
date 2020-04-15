<template>
	<view>
		<view class="title">注册账号</view>
		<p class="hint">验证通过后完成注册</p>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" type="number" placeholder="请输入手机号码" />
		</view>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" password  type="digit" placeholder="请输入密码" />
		</view>
		<view class="input uni-form-item uni-column">
			<button type="primary" @click="register">注册</button>
		</view>
		<view class="input">
			<span class="register" @click="login">返回登录</span>
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
				uni.navigateTo({
				    url: '../login/login'
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
