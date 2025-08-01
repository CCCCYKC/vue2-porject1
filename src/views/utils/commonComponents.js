// 全局引用的组件 
// 页面使用时不用导入，适合与多页面都使用该组件的时候

import Vue from 'vue'

// echarts 全局引用
// import * as echarts from 'echarts';
// Vue.prototype.$echarts = echarts

// 引入vue导出Excel插件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import Breadcrumb from '@/components/breadcrumb/breadcrumb.vue'
Vue.component('BreadcrumbNav', Breadcrumb)