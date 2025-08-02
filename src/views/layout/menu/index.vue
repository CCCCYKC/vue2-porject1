<template>
  <div style="height: 100vh">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <!-- <span slot="title">生鲜后台管理系统</span> -->
        <span slot="title">{{ $t('menu.homeTitle') }}</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
         <span slot="title">{{ $t('menu.home') }}</span>
      </el-menu-item>
      <el-submenu index="/produce">
        <template slot="title">
          <i class="el-icon-location"></i>
          <!-- <span>产品管理</span> -->
           <span>{{ $t('menu.productTitle') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/produce/list">
            <i class="el-icon-menu"></i>
            <span slot="title">产品列表</span>
          </el-menu-item>
          <el-menu-item index="/produce/category">
            <i class="el-icon-menu"></i>
            <span slot="title">产品分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/list">
            <i class="el-icon-menu"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/collection">
            <i class="el-icon-menu"></i>
            <span slot="title">订单汇总</span>
          </el-menu-item>
          <el-menu-item index="/order/examine">
            <i class="el-icon-menu"></i>
            <span slot="title">订单审核</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/list">
            <i class="el-icon-menu"></i>
            <span slot="title">广告列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/manage">
        <i class="el-icon-setting"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MenuPage",
  data() {
    return {
      // isCollapse: false, // 控制菜单是否折叠
      active: "", // 当前激活的菜单项
    };
  },
  created() {
    // 初始化、刷新时设置激活菜单
    this.active = this.$route.meta.activeMenu || this.$route.path;
  },
  watch: {
    // 设置动态路由，
    $route(to) {
      // console.log("路由变化", to);
      // 当路由变化时，更新菜单的激活状态
      let { meta, path } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = path;
      }
    },
  },
  props: {
    isCollapse: {
      // 从父组件接收折叠状态
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style land="less" scoped>
.el-menu {
  border: 0;
}
.is-active {
  background: #1e78bf !important;
  color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
