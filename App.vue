<!-- <template>
    <div id="app">
        <router-view></router-view>
        <view class="play">
        	min播放
        </view>
    </div>
</template> -->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	@import './common/uni.css';
</style>
