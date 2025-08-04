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
      // console.log("路由信息", this.$route.matched);
      // 深拷贝一份 matched，防止污染原路由对象
      let routes = JSON.parse(JSON.stringify(this.$route.matched));
      if (routes.length > 0) {
        routes[0].path = "/"; // 只修改副本
      }
      return routes;
    },
  },
  created() {
    console.log("面包屑导航所在界面的路由", this.$route.matched);
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>