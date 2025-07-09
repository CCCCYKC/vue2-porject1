<template>
    <div class="right">
        <!-- 顶部 -->
        <Header />
        <!-- 右侧内容 -->
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './header.vue'
export default {    
    name: 'rightContent',
    components: {
        Header
    }  
}
</script>

<style>

</style>