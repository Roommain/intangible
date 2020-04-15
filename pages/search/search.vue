<template>
	<view>
		<view>
			<uni-search-bar :radius="100" placeholder="请输入搜索内容" @confirm="search"></uni-search-bar>
		</view>
		<view>
			<view class="singer-song" :class="{'active': (item.id == id)}" v-for="(item,index) in searchList" :key="index" @click="play(item.id)">
			<!-- 	<view class="singer-index">{{index+1}}</view> -->
				<view class="singer-message">
					<view class="song-name">{{item.name}}</view>
					<!-- <view class="song-singer" :class="{'active': (item.id == id)}">{{item.ar[0].name}}-{{item.name}}</view> -->
				</view>
			</view>				
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {uniSearchBar},
		data() {
			return {
				searchList:[],
				id:''
			}
		},
		created() {
			
		},
		onShow() {
			this.searchList = [];
		},
		methods: {
			getSearchData (value) {
				uni.request({
				    url: this.$api + '/search?keywords=' + value,
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						this.searchList = res.data.result.songs;
				    }
				});
			},
			search(val){
				console.log(val.value);
				this.getSearchData(val.value);
			},
			play(id,e) {
				uni.setStorageSync('play_id', id);
				uni.$emit('update',{id:id});
				this.id = uni.getStorageSync('play_id');
			}
		}
	}
</script>

<style scoped>
.singer-img {
	width: 100vw;
	height: 80vw;
}
.singer-song {
	position: relative;
	width: 100%;
	height: 40px;
	border-bottom: 1px solid #F2F2F2;
}
.singer-index {
	margin-left: 30px;
	line-height: 60px;
}
.singer-pic {
	position: absolute;
	top: 10px;
	left: 60px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.singer-message {
	position: absolute;
	left: 20px;
	top: 10px;
	font-size: 14px;
}
.song-singer {
	overflow: hidden;
	width: 230px;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: rgba(197, 193, 193,0.8);
}
.active {
	color: #007AFF;
}
</style>
