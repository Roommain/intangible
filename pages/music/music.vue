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
		<view class="grid">
			<uni-grid :column="3" :show-border="false"  :square="false" @change="selectGrid">
				<uni-grid-item>
					<view class="grid-item">
						<image class="img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=468344651,2427584021&fm=26&gp=0.jpg"></image>
					</view>
					<text class="text-title">热门歌手</text>
				</uni-grid-item >
				<uni-grid-item>
					<view class="grid-item">
						<image class="img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575437432673&di=a63cfc1e2c4d27a4b88a5235f2815263&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F8F%2FCgo8PFWwubKAC_n-AAAVMejmm0c046.png%3Fcc%3D0.3123178686410819"></image>
					</view>
					<text class="text-title">MV榜单</text>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item">
						<image class="img" src="https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"></image>
					</view>
					<text class="text-title">精品歌单</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="hot-singer">
			<view class="title"><text class="text-left">歌手列表</text><text class="text-right">查看更多</text> </view>
			<view class="singer-list">
				<view class="item" v-for="(item,index) in singerList" :key="index" @click="singerSongList(item.id)">
					<image class="singer-img" :src="item.picUrl"></image>
					<text class="singer-name">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="recommend">
			<view class="title"><text class="text-left">每日推荐</text><text class="text-right">查看更多</text></view>
			<view class="recommend-list">
				<view class="recommend-item" v-for="(item,index) in recommendList" :key="index" @click="recommendSongList(item.id)">
					<image class="recommend-img" :src="item.picUrl"></image>
					<image class="headset-img" src="../../static/tab-bar/erji.png"></image>
					<text class="recommend-name">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="play">
			<view class="play-box">
				<view class="play-img" @click="clickPlay">
					<image class="singer-pic rotate" :class="{'rotate-pause': !isPlay}" :src="playDataImg"></image>
				</view>
				<view class="singer-msg">
					<view class="song-name">{{songName}}-{{singer}}</view>
				</view>
				<view class="singer-icons">
					<!-- <view class="song-name">{{item.name}}</view> -->
				</view>
			</view>
		</view>
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
					{imageUrl:'../../static/c1.png'},
					{imageUrl:'../../static/c2.png'},
					{imageUrl:'../../static/c3.png'},
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
		width: 22vw;
		height: 110px;
		margin: 3px;
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
		width: 22vw;
		height: 22vw;
		border-radius: 50%;
	}
	.singer-name {
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
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
