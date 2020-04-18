<template>
	<view class="singer">
		<view>
			<uni-segmented-control :current="current" :values="typeList" @clickItem="onClickItem" style-type="text" active-color="#dd524d"></uni-segmented-control>
			<view class="content">
				<view v-show="current === index" v-for="(item,index) in typeList" :key="index">
					<view class="singer-list">
						<view class="item" v-for="(item,index) in dataList" :key="index" @click="singerSongList(item.id)">
							<image  v-if="item.url" class="singer-img"  :src="disposeImg(item.url)"></image>
							<image v-else class="singer-img" src="../../static/timg1.jpg"></image>
							<text class="singer-name">{{item.detail}}</text>
						</view>
					</view>
				</view>
				<view class="no-data" v-show="noDataShow">
					<image class="collect-img" src="../../static/timg.jpg"></image>
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
				typeLists:[],
				noDataShow:false,
				dataList:[
					{imageUrl:'../../static/fl1.png',title:'苗族分布在我国西南数省区。按方言划分苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl2.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl3.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl4.png',title:'苗族分布在我国西南数省区。按方言划分'},
					{imageUrl:'../../static/fl5.png',title:'苗族分布在我国西南数省区。按方言划分'},
				],
				typeList: [],
				current: 0,
				imgurl:'',
				isPlay:false,
				id:''
			};
		},
		created() {
			this.getTypeList();
		},
		onLoad (val) {
		},
		methods:{
			disposeImg (img) {
				var arr = img.split(",");
				return '/api'+ arr[0];
			},
			getTypeList () {
				this.typeList = [];
				uni.request({
				    url: 'api/app/heritage/heritageType',
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						this.typeLists = res.data.data;
						res.data.data.forEach((key) => {
							this.typeList.push(key.typeName)
						})
						this.getDataList(0);
				    }
				});
			},
			getDataList(id) {
				var _this = this;
				var obj = this.typeLists.find(function (x) {
				    return x.typeName == _this.typeList[id]
				})
				uni.request({
				    url: 'api/app/heritage/heritage',
					data:{
						type:obj.id
					},
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						console.log(res.data.data)
						this.dataList = res.data.data;
						if (this.dataList.length == 0) {
							this.noDataShow = true;
						} else {
							this.noDataShow = false;
						}
				    }
				});
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.getDataList(e.currentIndex);
				}
			},
			play(id,e) {
				uni.setStorageSync('play_id', id);
				uni.$emit('update',{id:id});
				this.id = uni.getStorageSync('play_id');
			}
		},
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
.no-data {
	text-align: center;
}
</style>
