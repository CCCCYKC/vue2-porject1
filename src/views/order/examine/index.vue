<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadcrumbNav></BreadcrumbNav>
    <div class="examine">
      <!-- 上方查看PDF的按钮 -->
      <div class="top">
        <span>订单合同：</span>
        <el-button @click="dialogVisible = true">打印合同</el-button>
      </div>
      <!-- 下方表格 -->
      <div class="table">
        <div class="text">表格(含状态：已审核、未审核，操作：审核，审核过的按钮disabled)</div>
        <div class="text">
          订单编号可点，跳转至订单审核详情界面(不可改)；审核按钮也可以跳转至可操作的审核详情界面
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      title="查看合同内容"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <span>123</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ExaminePage",
  data() {
    return {
      dialogVisible: false, //弹窗是否显示
    };
  },
  methods: {
    // 关闭弹窗----------
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.examine {
  background: #fff;
  padding: 15px;
  .table{
    padding: 15px;
    .text {
      margin-top: 10px;
    }
  }
}
</style>