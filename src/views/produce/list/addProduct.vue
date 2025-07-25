<template>
  <div class="addproject">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="nav">
          <div class="title">产品类型列表</div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="wapper">
          <div class="title">商品添加</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  background: white;
  margin: 10px;
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
  margin: 10px;
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