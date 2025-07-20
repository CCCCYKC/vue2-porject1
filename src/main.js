import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'
import api from '@/api/index.js' 

// echarts 全局引用
// import * as echarts from 'echarts';
// Vue.prototype.$echarts = echarts

Vue.prototype.$api = api
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
