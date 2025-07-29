import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import product from './modules/product.js'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Store({
  state: {},     // 数据状态
  mutations: {}, // 同步修改状态
  actions: {},   // 异步操作
  modules: {
    product,      // 产品模块
  },
  plugins: [
    createPersistedstate({
      // storage: window.localStorage, // 使用本地存储(默认是localStorage)
      key: 'info', // 存储vuex数据的任意键名key--本地存储里面 localStorage.info
      paths: ['product'], // 只持久化product模块的数据--存储的模块名称一级全局state数据  不写默认存储所有内容
    })]
})

export default store