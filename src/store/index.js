import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

const store = new Store({
  state: {},     // 数据状态
  mutations: {}, // 同步修改状态
  actions: {},   // 异步操作
  modules: {}    // 模块化
})

export default store