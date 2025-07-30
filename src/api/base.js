//接口公共地址
const base = {
    // 首页
    totalInfo: '/api/home/dataCount', //首页统计数据
    orderInfo: '/api/home/orderinfo', //今日订单统计数据
    lineInfo: '/api/home/format', //首页图表数据

    // 产品管理----产品列表----
    projectList: '/api/goods/projectList', //产品列表分页获取数据
    search: '/api/goods/search', //搜索产品名称
    deleteItemById: '/api/goods/deleteItemById',//删除单个商品
    batchDelete: '/api/goods/batchDelete', //批量删除商品

    // 产品管理----产品列表----添加产品
    selectItemCategoryByParentId: '/api/goods/itemCategory/selectItemCategoryByParentId',//商品类目
    uploadImgURL: '/api/upload',  //上传图片
    insertTbItem: '/api/goods/item/insertTbItem',//添加商品
    updateTbItem: '/api/goods/item/updateTbItem',//编辑商品

    // 产品分类
    itemCategory: '/api/itemCategory',//获取商品分类
    insertCategory:'/api/itemCategory/insertCategory',//添加一级商品分类
    insertItemCategory: '/api/itemCategory/insertItemCategory',//添加二级商品分类
    updateCategory:'/api/itemCategory/updateCategory',//修改商品分类
    deleteContentCategoryById:'/api/content/deleteContentCategoryById',//删除商品分类
}

// 单一导出
export const host = 'http://localhost:7788'
// 导出图片上传URL地址
export const uploadImgURL = '/api/upload';

// 全部导出
export default base