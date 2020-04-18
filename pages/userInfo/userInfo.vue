<template>
	<view>
		<div class="info">
			<p><span>昵称</span><span class="name">{{user.nickName}}</span></p>
			<p><span>账号</span><span class="name">{{user.userName}}</span></p>
		</div>
		<view class="btn">
			<button type="default" @click="logout">退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{}
			}
		},
		created() {
			this.getInfo(getApp().globalData.token)
		},
		methods: {
			getInfo (token) {
				uni.request({
				    url: 'api/getInfo',
					method:'GET',
				    header: {
				        'content-type': 'application/json',
						'Authorization':token
				    },
				    success: (res) => {
						if (res.data.code == 200) {
							this.user = res.data.user
						}
				    }
				});
			},
			logout() {
				uni.request({
				    url: 'api/logout',
					method:'GET',
				    header: {
				        'content-type': 'application/json',
				    },
				    success: (res) => {
						if (res.data.code == 200) {
							getApp().globalData.token = '';
							uni.switchTab({
								url: '/pages/user/user'
							});	
						}
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.info {
		padding: 10px;
	}
	p {
		padding: 10px;
		border-bottom: solid #999 1px;
	}
	.name {
		float: right;
	}
	.btn {
		margin: 20px;
	}
</style>
