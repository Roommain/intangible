import Vue from 'vue'
import App from './App'
Vue.prototype.$api = 'http://139.199.179.144:8080';
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
