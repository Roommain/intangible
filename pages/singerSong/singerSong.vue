<template>
	<view class="singer">
		详情页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		created() {
			
		},
		onLoad (val) {
			console.log(val.id);
			this.getParticularsData(val.id);
		},
		methods:{
			getParticularsData (id) {
				uni.request({
				    url: 'api/app/heritage/heritageType/'+id,
				    header: {
				        'content-type': 'application/json'
				    },
				    success: (res) => {
						console.log(res.data.data)
						// this.dataList = res.data.data;
				    }
				});
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
