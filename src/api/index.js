// // 导入封装的 request 实例（而非原生 axios）
// import request from '@/views/utils/request';
// import base from './base'

// const api = {
//     // 获取首页统计数据
//     totalInfo() {
//         return request.get(base.totalInfo)
//     },
//     // 获取今日订单统计数据
//     orderInfo() {
//         return request.get(base.orderInfo)
//     },
//     // 获取首页图表数据
//     lineInfo() {
//         return request.get(base.lineInfo)
//     },
//     // 获取产品列表分页数据
//     projectList(params) {
//         return request.get(base.projectList, { params }) // 使用 request 实例
//     },
// }

// export default api




//公共的请求方法
import axios from 'axios';
import base from './base'

const api = {
    // 首页
    // 获取首页统计数据
    totalInfo() {
        return axios.get(base.totalInfo)
    },
    // 获取今日订单统计数据
    orderInfo() {
        return axios.get(base.orderInfo)
    },
    // 获取首页图表数据
    lineInfo() {
        return axios.get(base.lineInfo)
    },

    // 产品管理----产品列表
    // 获取产品列表分页数据
    projectList(params) {
        return axios.get(base.projectList, { params })
    },
    // 搜索产品名称
    // params = { search:xx }
    search(params) {
        return axios.get(base.search, { params })
    },
    // 删除单个商品 id
    deleteItemById(params) {
        return axios.get(base.deleteItemById, { params })
    },

    // 产品管理----产品列表----添加产品
    // 商品类目获取
    // parmas = {type:cid}
    selectItemCategoryByParentId(params) {
        return axios.get(base.selectItemCategoryByParentId, { params })
    }
};

export default api;