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
    // 搜索产品名称     params = { search:xx }
    search(params) {
        return axios.get(base.search, { params })
    },
    // 删除单个商品 id
    deleteItemById(params) {
        return axios.get(base.deleteItemById, { params })
    },
    // 批量删除商品 params = { ids: item.id }
    batchDelete(params) {
        return axios.get(base.batchDelete, { params })
    },

    // 产品管理----产品列表----添加产品
    // 商品类目获取     parmas = {type:cid}
    selectItemCategoryByParentId(params) {
        return axios.get(base.selectItemCategoryByParentId, { params })
    },
    // 添加商品  params = {title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
    insertTbItem(params) {
        return axios.get(base.insertTbItem, {params})
    },
    // 编辑商品  params = {id, title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
    updateTbItem(params) {
        return axios.get(base.updateTbItem, { params })
    },
};

export default api;