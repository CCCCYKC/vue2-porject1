<template>
    <div>
        <!-- 面包屑导航 -->
         <BreadcrumbNav></BreadcrumbNav>
         <div class="list">
            <!-- 左侧树形组件 -->
            <div class="left">左侧树形组件</div>
            <!-- 右侧表格 -->
            <div class="right">右侧表格</div>
         </div>
    </div>
</template>

<script>
export default {    
    name: 'advertListPage'
}
</script>

<style lang="less" scoped>
.list{
    display: flex;
    flex-direction: row;
    .left{
        flex-grow: 1;
        padding: 15px;
        margin-right: 20px;
        background: pink;
    }
    .right{
        background: #fff;
        flex-grow: 3;
        padding: 15px;
    }
}
</style>