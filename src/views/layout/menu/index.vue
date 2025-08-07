<template>
  <div style="height: 100vh">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <!-- <span slot="title">生鲜后台管理系统</span> -->
        <span slot="title">{{ $t("menu.homeTitle") }}</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
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
      <!-- 动态菜单导航 -->
      <MenuList :divMenuList="divMenuList"></MenuList>
    </el-menu>
  </div>
</template>

<script>
import MenuList from "./MenuList.vue";
import { mapState } from "vuex";
export default {
  name: "MenuPage",
  components: {
    MenuList,
  },
  computed: {
    ...mapState("menu", ["divMenuList"]),
  },
  data() {
    return {
      // isCollapse: false, // 控制菜单是否折叠
      active: "", // 当前激活的菜单项
    };
  },
  created() {
    // 初始化、刷新时设置激活菜单
    this.active = this.$route.meta.activeMenu || this.$route.path;
    // console.log("仓库的动态菜单导航", this.divMenuList);
  },
  watch: {
    // 设置动态路由，
    $route(to) {
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
