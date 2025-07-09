<template>
    <div class="layout">
        <!-- 左侧导航 -->
         <div class="menu">
            <Menu />
         </div>
        <!-- 右侧内容 -->
         <div class="content">
            <Content />
         </div>
    </div>
</template>

<script>
import Menu from './menu/index.vue'
import Content from './content/index.vue'
export default {    
    name: 'LayoutPage',
    components: {
        Menu,
        Content
    }   
}
</script>

<style lang="less" scoped>
.layout{
    .menu{
        width: 200px;
        background: #112f50;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
    }
    .content{
        padding-left: 200px;
    }
}
</style>