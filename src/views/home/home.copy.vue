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
        <!-- 今日订单 -->
        <div class="today-order">
          <div class="title">今日订单</div>
          <div class="content">1</div>
        </div>
        <!-- 本月订单 -->
        <div class="month-order">
          <div class="title">本月订单</div>
          <div class="content">1</div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="middle-right">
        <div class="title">库存告警</div>
        <div class="content">1</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
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
</template>

<script>
export default {
  name: "homePage",
};
</script>

<style lang="less" scoped>
.footer {
  margin: 20px;
  el-button {
    margin-right: 10px;
  }
}
.middle {
  display: flex;
  justify-content: space-between;
  height: 400px;
  margin: 20px;
  .middle-left {
    display: flex;
    flex-direction: column;
    flex-grow: 4;
    margin-right: 10px;
    .today-order {
    //   height: 200px;
      border: #f3f4f7 1px solid;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
    .month-order {
      border: #f3f4f7 1px solid;
      margin-top: 10px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
  }
  .middle-right {
    border: #f3f4f7 1px solid;
    flex-grow: 3;
  }
  .title {
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f7;
  }
}
.header {
  display: flex;
  justify-content: space-around;
  .item {
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
      width: 60px;
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