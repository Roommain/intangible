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
			<view class="singer-list">
				<view class="item" v-for="(item,index) in dataList" :key="index" @click="singerSongList(item.id)">
					<image  v-if="item.url" class="singer-img"  :src="disposeImg(item.url)"></image>
					<image v-else class="singer-img" src="../../static/timg1.jpg"></image>
					<text class="singer-name">{{item.detail}}</text>
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
					{imageUrl:'../../static/fy1.png',name:'苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy2.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy3.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy4.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy3.png',name:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fy4.png',name:'苗族分布在我国西南数省区。按方言划分'},
				],
				dataList:[
					{imageUrl:'../../static/fl1.png',title:'苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl2.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl3.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl4.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl5.png',title:'苗族分布在我国西南数省区。按方言划分'},
				],
				recommendList:[],
				playDataImg:'',
				songName:'',
				singer:'',
				isPlay:false
			}
		},
		created() {
			const id = uni.getStorageSync('play_id');
			this.getSingerList();
		},
		onLoad () {
			var _this = this;
			uni.$on('update',function(data){
				_this.getPlayData(data.id);
			})
		},
		methods: {
			disposeImg (img) {
				var arr = img.split(",");
				return '/api'+ arr[0];
			},
			getSingerList () {
				uni.request({
				    url: 'api/app/heritage/heritage',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						console.log(res.data.data)
						this.dataList = res.data.data;
				    }
				});
			},
			singerSongList (id) {
				uni.navigateTo({
					url: '/pages/singerSong/singerSong?id=' + id
				})				
			},
			recommendSongList(id) {
				console.log(id);
			},
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
		height: 30px;
		font-size: 12px;
		text-align: left;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
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
