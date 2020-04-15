<template>
    <view>
        <view class="">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-active-color="indicatorColor" circular=true :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item v-for="(item,index) in banners" :key="index">
                            <view class="swiper-item img-box">
								<image class="img" :src="item.imageUrl"></image>
							</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
		<view class="hot-singer">
			<!-- <view class="title"><text class="text-left">歌手列表</text><text class="text-right">查看更多</text> </view> -->
			<view class="singer-list">
				<view class="item" v-for="(item,index) in banners" :key="index" @click="singerSongList(item.id)">
					<image class="singer-img" :src="item.imageUrl"></image>
					<text class="singer-name">{{item.name}}</text>
				</view>
			</view>
		</view>
<!-- 		<view class="recommend">
			<view class="title"><text class="text-left">每日推荐</text><text class="text-right">查看更多</text></view>
			<view class="recommend-list">
				<view class="recommend-item" v-for="(item,index) in recommendList" :key="index" @click="recommendSongList(item.id)">
					<image class="recommend-img" :src="item.picUrl"></image>
					<image class="headset-img" src="../../static/tab-bar/erji.png"></image>
					<text class="recommend-name">{{item.name}}</text>
				</view>
			</view>
		</view> -->
    </view>
</template>

<script>
	const bgAudioMannager = uni.getBackgroundAudioManager();
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {uniGrid,uniGridItem},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				indicatorColor:"#fff",
				interval: 3000,
				duration: 1000,
				banners:[
					{imageUrl:'../../static/fy1.png',name:'苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy2.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy3.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy4.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy3.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy4.png',name:'苗族分布在我国西南数省区。按方言划分'},
				],
				singerList:[],
				recommendList:[],
				playDataImg:'',
				songName:'',
				singer:'',
				isPlay:false
			}
		},
		created() {
			const id = uni.getStorageSync('play_id');
			this.getBanner();
			this.getSingerList();
			this.getRecommendList();
			// this.getPlayData(id);
		},
		onLoad () {
			var _this = this;
			uni.$on('update',function(data){
				_this.getPlayData(data.id);
			})
		},
		methods: {
			getBanner () {
				uni.request({
				    url: this.$api + '/banner', 
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
				        console.log(res.data.banners);
						this.banners = res.data.banners;
				    }
				});
			},
			getSingerList () {
				uni.request({
				    url: this.$api + '/top/artists?offset=0&limit=8',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						this.singerList = res.data.artists;
				    }
				});
			},
			getRecommendList () {
				uni.request({
				    url: this.$api + '/personalized?limit=6',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						this.recommendList = res.data.result;
				    }
				});
			},
			singerSongList (id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/singerSong/singerSong?id=' + id
				})				
			},
			recommendSongList(id) {
				console.log(id);
			},

			getPlayData(id) {
				uni.request({
				    url: this.$api + '/song/detail?ids=' + id,
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						var _this = this;
						bgAudioMannager.title = res.data.songs[0].name;
						this.songName = res.data.songs[0].name;
						bgAudioMannager.singer = res.data.songs[0].ar[0].name;
						this.singer = res.data.songs[0].ar[0].name;
						bgAudioMannager.coverImgUrl = res.data.songs[0].al.picUrl;
						this.playDataImg = res.data.songs[0].al.picUrl;
						bgAudioMannager.src = 'https://music.163.com/song/media/outer/url?id='+ id +'.mp3';
						bgAudioMannager.onPlay (() => {
							_this.isPlay = true;
						})						
				    }
				});
			},
			clickPlay () {
				if (this.isPlay) {
					bgAudioMannager.pause();
					this.isPlay = false;
				} else {
					bgAudioMannager.play();
					this.isPlay = true;
				}
			},
			selectGrid (e) {
				if (e.detail.index == 0) {
					console.log(1);
					// uni.navigateTo({
					// 	url: '/pages/music/hotSinger/index'
					// })
				} else if (e.detail.index == 1) {
					console.log(2);
					// uni.navigateTo({
					// 	url: '/pages/recommendMv/index'
					// })
				} else if (e.detail.index == 2) {
					console.log(3);
					// uni.navigateTo({
					// 	url: '/pages/songMenu/index'
					// })
				}
			}
		},
	}
</script>

<style scoped>
	.img-box {
		width: 100%;
		height: 150px;
		background-size: cover;		
	}
	.grid {
		margin-top: 20px;
	}
	.grid-item {
		width: 40px;
		height: 40px;
		margin: auto;
	}
	.text-title {
		font-size: 14px;
		text-align: center;
	}
	.img {
		width: 100%;
		height: 100%;
	}
	.flex-img {
		width: 138px;
		height: 138px;
	}
	.singer-list,.recommend-list {
		display: flex;
		justify-content:center;
		flex-wrap:wrap;
	}
	.item {
		width: 46vw;
		height: 260px;
		margin: 5px;
		text-align: center;
	}
	.recommend-item {
		position: relative;
		width: 30vw;
		height: 140px;
		margin: 3px;
		text-align: center;
	}
	.title {
		margin: 20px 15px 10px;
		font-size: 16px;
	}
	.text-right {
		float: right;
	}
	.singer-img {
		width: 45vw;
		height: 200px;
		border-radius: 5px;
	}
	.singer-name {
		width: 45vw;
		height: 50px;
		font-size: 12px;
		text-align: left;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.recommend-img {
		width: 30vw;
		height: 30vw;
		border-radius: 10px;
	}
	.recommend-name {
		display: inline-block;
		width: 100%;
		height: 30px;
		font-size: 12px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.headset-img {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 100;
		width: 20px;
		height: 20px;
	}
	.play {
		position: fixed;
		bottom: 0;
		z-index: 100;
		width: 100%;
		height: 40px;
		background-color: rgba(0,0,0,0.8);
	}
	.recommend {
		margin-bottom: 10px;
	}
	.play-img {
		position: absolute;
		top: -8px;
		left: 26px;		
		width: 40px;
		height: 40px;
	}
	.play-box {
		position: relative;
	}
	.singer-pic {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.singer-msg {
		position: absolute;
		left: 75px;
		line-height: 40px;
	}
	.rotate{
	    animation: rotateAnimation 22s linear infinite;
	}
	.rotate-pause{
	    animation-play-state: paused
	}
	@keyframes rotateAnimation{
	    0% {
	        transform: rotate(0deg);
	    }
	    100% {
	        transform: rotate(360deg);
	    }
	}
	.song-name {
		font-size: 14px;
		color: rgba(197, 193, 193,0.8);
	} 
</style>
