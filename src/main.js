import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'
import api from '@/api/index.js' 
// 引入全局组件定义文件
import './views/utils/commonComponents.js';
import i18n from './lang'

Vue.prototype.$api = api
Vue.config.productionTip = false

Vue.config.productionTip = false

// 可以用this访问
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
