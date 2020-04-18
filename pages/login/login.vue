<template>
	<view>
		<view class="title">账号密码登录</view>
		<p class="hint">验证通过后完成登录</p>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" v-model="loginForm.username" type="text" placeholder="请输入账号" />
		</view>
		<view class="input uni-form-item uni-column">
			<input class="uni-input" v-model="loginForm.password" password  type="digit" placeholder="请输入密码" />
		</view>
		<view class="input uni-form-item uni-column">
			<button type="primary" @click="login">登录</button>
		</view>
		<view class="input">
			<!-- <span>忘记密码</span> -->
			<span class="register" @click="register">立即注册</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  loginForm: {
				username: "",
				password: "",
			  },
			}
		},
		methods: {
			login () {
				uni.request({
				    url: 'api/login',
					method:'POST',
					data:this.loginForm,
				    header: {
				        'content-type': 'application/json',
				    },
				    success: (res) => {
						if (res.data.code == 500) {
							uni.showToast({
							    title: res.data.msg,
								icon:"none",
							    duration: 2000
							});
						} else if (res.data.code == 200) {
							getApp().globalData.token = res.data.token;
							this.getInfo(res.data.token);
						}
				    }
				});
			},
			getInfo (token) {
				uni.request({
				    url: 'api/getInfo',
					method:'GET',
				    header: {
				        'content-type': 'application/json',
						'Authorization':token
				    },
				    success: (res) => {
						console.log(res.data.code)
						if (res.data.code == 200) {
							getApp().globalData.nickName = res.data.user.nickName;	
							uni.switchTab({
								url: '/pages/user/user'
							});					
						}
				    }
				});
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
