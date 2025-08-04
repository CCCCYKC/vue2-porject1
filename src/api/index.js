//公共的请求方法
import axios from 'axios';
import base from './base'
import instance from '@/views/utils/request';

// 单独导出  api内的可以删除
export function permission(params) {
    return axios.get(base.permission, { params })
}

const api = {
    // 登录界面
    // 登录接口 post params = { user, pwd }
    login(params) {
        return instance.post(base.login, params)
    },
    // 用户权限  params = { token: '' }
    permission(params) {
        return axios.get(base.permission, { params })
    },
    // vue组件实例:this.$api.permission
    // 仓库store中:1.单独导出permission方法 2.单独导入请求的接口方法  import { permission } from "@/api/index.js"

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
        return axios.get(base.insertTbItem, { params })
    },
    // 编辑商品  params = {id, title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
    updateTbItem(params) {
        return axios.get(base.updateTbItem, { params })
    },

    // 产品管理----产品分类
    // 获取商品分类
    itemCategory() {
        return axios.get(base.itemCategory)
    },
    // 添加一级商品分类 params = {name}
    insertCategory(params) {
        return axios.get(base.insertCategory, { params })
    },
    // 添加二级商品分类 params = {cid, name}
    insertItemCategory(params) {
        return axios.get(base.insertItemCategory, { params })
    },
    // 修改商品分类 params = {id, name}
    updateCategory(params) {
        return axios.get(base.updateCategory, { params })
    },
    // 删除商品分类 id
    deleteContentCategoryById(params) {
        return axios.get(base.deleteContentCategoryById, { params })
    },

    // 订单管理----订单列表
    // 获取订单列表数据 params = { page }
    list(params) {
        return axios.get(base.list, { params })
    },
    // 订单汇总按钮 params = { ids: '1,2,3' } ids为字符串
    changeStatus(params) {
        return axios.get(base.changeStatus, { params })
    },
    // 获取订单详情     假数据，不用传参
    detail() {
        return axios.get(base.detail)
    },


    // 订单管理----订单汇总
    // 获取订单汇总列表数据 params = { page: xx }
    collect(params) {
        return axios.get(base.collect, { params })
    },
    // 撤销汇总 params = { id: xx } id为汇总单的id
    cancel(params) {
        return axios.get(base.cancel, { params })
    },
};


export default api;