<template>
  <!--
    分页组件 
    layout: "total, sizes, prev, pager, next, jumper" 布局
    可传递参数:pageSize, total ,currentPage
  -->
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    pageSize: {
      type: Number,
      default: 8,
    },
    total: {
      type: Number,
      default: 100,
    },
    currentPage: {
      // 父组件传递给分页组件当前页面，默认为1
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 处理页码变化(传递给父组件用$emit)
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("pageChanged", val);
    },
  },
  data() {
    return {
      // currentPage: 1,
    };
  },
};
</script>

<style lang="less" scoped>
.pagination{
  padding-top: 5px;
  padding-left: 5px;
  // height: 30px;
}
</style>