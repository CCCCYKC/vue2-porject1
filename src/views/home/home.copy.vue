<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="header">
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>商品订单</span>
          <div class="num">
            <span class="num">100</span>
          </div>
          <div class="bottom">今日订单数:50</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>交易记录</span>
          <div class="num">
            <span class="num">100</span>
          </div>
          <div class="bottom">今日交易额:50</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>产品数量</span>
          <div class="num">
            <span class="num">100</span>
          </div>
          <div class="bottom">今日新增数:50</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总访问量</span>
          <div class="num">
            <span class="num">100</span>
          </div>
          <div class="bottom">今日访问量:50</div>
        </div>
      </div>
    </div>

    <!-- 中间 -->
    <div class="middle">
      <!-- 左边 -->
      <div class="middle-left">
        <!-- 月销售额--图表 -->
        <div class="title">月销售额</div>
        <div class="content">1</div>
      </div>
      <!-- 右边 -->
      <div class="middle-right">
        <!-- 图表--产品销售比例 -->
        <div class="title">产品销售比例</div>
        <div class="content">1</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- 今日订单 -->
      <div class="item">
        <div class="title">今日订单</div>
        <div class="content">1</div>
      </div>
      <!-- 本月订单 -->
      <div class="item">
        <div class="title">本月订单</div>
        <div class="content">1</div>
      </div>
      <!-- 快捷入口 -->
      <div class="item">
        <div class="title">快捷入口</div>
        <div class="content">
          <el-button type="primary" plain>
            <i class="el-icon-folder-add"></i>
            添加商品
          </el-button>
          <el-button type="success" plain>
            <i class="el-icon-data-line"></i>
            产品分类
          </el-button>
          <el-button type="info" plain>
            <i class="el-icon-notebook-2"></i>
            订单列表
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
};
</script>

<style lang="less" scoped>
.footer {
  margin: 20px;
  display: flex;
  flex-direction: row;
  .item {
    flex-grow: 1;
    width: 200px;
    border: #f3f4f7 1px solid;
    margin-right: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    .title {
      border: #f3f4f7 1px solid;
      height: 40px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
    }
    .content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.middle {
  display: flex;
  justify-content: space-between;
  height: 250px;
  margin: 20px;
  .middle-left {
    display: flex;
    flex-direction: column;
    flex-grow: 7;
    margin-right: 10px;
    border: #f3f4f7 1px solid;
  }
  .middle-right {
    border: #f3f4f7 1px solid;
    flex-grow: 4;
  }
  .title {
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 5px;
  }
}
.header {
  display: flex;
  justify-content: space-around;
  .item {
    width: 200px;
    display: flex;
    flex-direction: row;
    text-align: center;
    border: #333 1px solid;
    margin-top: 20px;
    padding: 20px;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #409eff;
      margin-right: 10px;
      width: 50px;
    }
    .item-content {
      span {
        display: block;
        font-size: 16px;
        color: #333;
      }
      .num {
        font-size: 24px;
        color: #409eff;
        margin: 10px 0;
      }
      .bottom {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>