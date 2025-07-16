<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="header">
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总销售额</span>
          <div class="num">
            <span class="num">￥{{totalData.saleTotal | num}}</span>
          </div>
          <div class="bottom">今日销售额:￥{{totalData.sale | num}}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总访问量</span>
          <div class="num">
            <span class="num">{{totalData.viewsTotal | num}}</span>
          </div>
          <div class="bottom">今日访问量:{{totalData.views | num}}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总收藏量</span>
          <div class="num">
            <span class="num">{{totalData.collectTotal | num}}</span>
          </div>
          <div class="bottom">今日收藏额:{{totalData.collect | num}}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总支付量</span>
          <div class="num">
            <span class="num">￥{{totalData.payTotal | num}}</span>
          </div>
          <div class="bottom">今日支付量:￥{{totalData.pay | num}}</div>
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
  data() {
    return {
      totalData: {}, // 首页统计信息
    };
  },
  created() {
    this.totalInfo();
  },
  methods: {
    async totalInfo() {
      let res = await this.$api.totalInfo();
      console.log("首页统计信息----", res.data.data.list);
      this.totalData = res.data.data.list;
    },
  },
  // 过滤器--处理数据格式
  filters:{
    num(value){ //12345 --- 12,345
      if(!value) return value;
      return value.toLocaleString();
    }
  }
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