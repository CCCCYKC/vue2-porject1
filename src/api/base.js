//接口公共地址
const base = {
    // 首页
    totalInfo:'/api/home/dataCount', //首页统计数据
    orderInfo:'/api/home/orderinfo', //今日订单统计数据
    lineInfo:'/api/home/format', //首页图表数据

    // 产品管理----产品列表----
    projectList:'/api/goods/projectList', //产品列表分页获取数据
    search:'/api/goods/search', //搜索产品名称
    deleteItemById:'/api/goods/deleteItemById',//删除单个商品

    // 产品管理----产品列表----添加产品
    selectItemCategoryByParentId:'/api/goods/itemCategory/selectItemCategoryByParentId'//商品类目
}


export default base