<template>
  <!-- 遍历动态路由 -->
  <div>
    <!-- 判断是一级还是多级菜单 -->
    <template v-for="item in divMenuList">
      <!-- 多级菜单 -->
      <el-submenu
        :index="item.path"
        :key="item.name"
        v-if="item.children && item.children.length > 0"
      >
        <template slot="title">
          <!-- 系统管理的图标不同 -->
          <i class="el-icon-location" v-if="item.path != '/manage'"></i>
          <i class="el-icon-setting" v-else></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 继续判断item.children是一级还是多级菜单-----递归 -->
        <el-menu-item-group>
          <MenuList :divMenuList="item.children" :itemPath="item.path"></MenuList>
        </el-menu-item-group>
      </el-submenu>

      <!-- 一级菜单 点击一级菜单才会跳转 -->
      <el-menu-item
        :index="itemPath + '/' + item.path"
        :key="item.name"
        v-else-if="item.path != 'addProduct'"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuList", //组件名称 调用name就是调用当前组件本身
  props: {
    // 接受要遍历的对象
    divMenuList: Array,
    // 上级的路径
    itemPath: {
      type: String,
      default: "",
    },
  },
  // created() {
  //   console.log("props--divMenuList", this.divMenuList);
  // },
};
</script>

<style>
.is-active {
  background: #1e78bf !important;
  color: #fff !important;
}
</style>