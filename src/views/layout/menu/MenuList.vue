<template>
  <el-submenu index="/produce">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ $t("menu.productTitle") }}</span>
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
</template>

<script>
export default {
  name: "menuList",
  created() {
    console.log("仓库的动态菜单导航", this.$store.state.menu.divMenuList);
  },
};
</script>

<style>
</style>