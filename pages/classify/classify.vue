<template>
	<view class="singer">
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#dd524d"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="singer-song" :class="{'active': (item.id == id)}" v-for="(item,index) in singerData.hotSongs" :key="index" @click="play(item.id)">
						<view class="singer-index">{{index+1}}</view>
						<view class="singer-left">
							<image class="singer-pic" :src="item.al.picUrl"></image>
						</view>
						<view class="singer-message">
							<view class="song-name">{{item.name}}</view>
							<view class="song-singer" :class="{'active': (item.id == id)}">{{item.ar[0].name}}-{{item.name}}</view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					暂不实现
				</view>
				<view v-show="current === 2">
					暂不实现
				</view>
				<view v-show="current === 3">
					暂不实现
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {uniSegmentedControl},
		data() {
			return {
				singerData:{},
				artist:{},
				singerSongList:[],
				items: ['民间文学','传统舞蹈','传统技艺','民俗'],
				current: 0,
				imgurl:'',
				isPlay:false,
				id:''
			};
		},
		created() {
			this.id = uni.getStorageSync('play_id');
		},
		onLoad (val) {
			console.log(val.id);
			this.getSingerSongList(val.id);
		},
		methods:{
			getSingerSongList(id) {
				uni.request({
				    url: this.$api + '/artists?id=' + id,
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						this.singerData = res.data;
						this.imgurl = res.data.artist.picUrl;
				    }
				});
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			play(id,e) {
				uni.setStorageSync('play_id', id);
				uni.$emit('update',{id:id});
				this.id = uni.getStorageSync('play_id');
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
