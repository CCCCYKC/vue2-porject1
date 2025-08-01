<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item -->
    <el-breadcrumb-item
      v-for="item in navs"
      :key="item.path"
      :to="{ path: item.path }"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadcrumbNav",
  computed: {
    navs() {
      console.log("路由信息", this.$route.matched);
      let routes = this.$route.matched; //this.$route.matched包含了当前的路由信息 以及父级的路由信息
      //   对首页路由进行处理
      routes[0].path = "/";
      //   由于二级路由的页面为空，所以在router/index.js里面重定向
      return routes;
    },
  },
  created() {
    console.log(this.$route.matched);
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>