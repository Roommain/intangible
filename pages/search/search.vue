<template>
	<view>
		<view>
			<uni-search-bar :radius="100" placeholder="请输入非遗编号" @confirm="search"></uni-search-bar>
		</view>
		<view class="hot-singer">
			<view class="singer-list">
				<view class="item" v-for="(item,index) in searchList" :key="index" @click="singerSongList(item.id)">
					<image  v-if="item.url" class="singer-img"  :src="disposeImg(item.url)"></image>
					<image v-else class="singer-img" src="../../static/timg1.jpg"></image>
					<text class="singer-name">{{item.detail}}</text>
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
			disposeImg (img) {
				var arr = img.split(",");
				return '/api'+ arr[0];
			},
			getDataList(id) {
				uni.request({
				    url: 'api/app/heritage/heritage',
					data:{
						heritageNum:id
					},
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						console.log(res.data.data)
						this.searchList = res.data.data;
				    }
				});
			},
			search(val){
				console.log(val.value);
				this.getDataList(val.value);
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
.singer-img {
	width: 100vw;
	height: 80vw;
}
.singer-song {
	position: relative;
	width: 100%;
	height: 60px;
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
	left: 120px;
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
.singer-list {
	display: flex;
	/* justify-content:center; */
	flex-wrap:wrap;
}
.item {
	width: 46vw;
	height: 240px;
	margin: 5px;
	text-align: center;
}
.singer-img {
	width: 45vw;
	height: 200px;
	border-radius: 5px;
}
.singer-name {
	width: 45vw;
	height: 30px;
	font-size: 12px;
	text-align: left;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
</style>
