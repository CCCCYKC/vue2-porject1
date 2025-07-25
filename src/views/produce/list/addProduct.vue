<template>
  <div class="addproject">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="nav">
          <div class="title">产品类型列表</div>
          <TreeProduct></TreeProduct>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="wapper">
          <div class="title">商品添加</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeProduct from './treeProduct.vue';
export default {
    name: 'addProductPage',
    components: {
        TreeProduct,
    }
};
</script>

<style lang="less" scoped>
.nav {
  background: white;
  border-right: 1px solid #e0e0e0;
  height: 500px;
  .title {
    font-weight: bold;
    font-size: 16px;
    padding: 18px;
    color: #fff;
    background: skyblue;
  }
}

.wapper {
  background: white;
  height: 800px;
  .title {
    font-weight: bold;
    font-size: 16px;
    padding: 18px;
    color: #eee;
    background: grey;
  }
}
</style>