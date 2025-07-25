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
            <span class="num">￥{{ totalData.saleTotal | num }}</span>
          </div>
          <div class="bottom">今日销售额:￥{{ totalData.sale | num }}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总访问量</span>
          <div class="num">
            <span class="num">{{ totalData.viewsTotal | num }}</span>
          </div>
          <div class="bottom">今日访问量:{{ totalData.views | num }}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总收藏量</span>
          <div class="num">
            <span class="num">{{ totalData.collectTotal | num }}</span>
          </div>
          <div class="bottom">今日收藏额:{{ totalData.collect | num }}</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="item-content">
          <span>总支付量</span>
          <div class="num">
            <span class="num">￥{{ totalData.payTotal | num }}</span>
          </div>
          <div class="bottom">今日支付量:￥{{ totalData.pay | num }}</div>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="middle">
      <!-- 左边 -->
      <div class="middle-left">
        <!-- 月销售额--图表 -->
        <div class="title">月销售额</div>
        <div id="charts-line" style="height: 250px">123</div>
      </div>
      <!-- 右边 -->
      <div class="middle-right">
        <!-- 图表--产品销售比例 -->
        <div class="title">产品销售比例</div>
        <div id="charts-pie" style="height: 250px">1</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- 今日订单 -->
      <el-card shadow="always" class="item">
        <div slot="header" class="title">今日订单</div>
        <div class="content">
          <el-row>
            <el-col :span="8">
              <div class="head">今日订单数</div>
              <div class="num">{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="head">汇总确认订单</div>
              <div class="num">{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="head">累计金额</div>
              <div class="num">{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <!-- 本月订单 -->
      <el-card shadow="always" class="item">
        <div slot="header" class="title">本月订单</div>
        <div class="content">
          <el-row>
            <el-col :span="8">
              <div class="head">本月订单数</div>
              <div class="num">{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="head">汇总确认订单</div>
              <div class="num">{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="head">累计金额</div>
              <div class="num">{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <!-- 快捷入口 -->
      <el-card
        shadow="always"
        class="item"
        body-style="    
        padding-top: 20px;
        padding-left: 10px;"
        >
        <div slot="header" class="title">快捷入口</div>
        <div class="content" style="display: flex">
          <el-button type="primary" plain icon="el-icon-folder-add">
            添加商品
          </el-button>
          <el-button type="success" plain icon="el-icon-data-line">
            产品分类
          </el-button>
          <el-button type="info" plain icon="el-icon-notebook-2">
            订单列表
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "homePage",
  data() {
    return {
      totalData: {}, // 首页统计信息
      orderData: {}, // 今日订单统计信息
    };
  },
  created() {
    this.totalInfo();
    this.orderInfo();
    this.lineInfo();
  },
  mounted() {
    //最早获取DOM元素的生命周期函数 挂载完毕执行
  },
  methods: {
    async totalInfo() {
      let res = await this.$api.totalInfo();
      console.log("首页统计信息----", res.data.data.list);
      this.totalData = res.data.data.list;
    },
    async orderInfo() {
      let res = await this.$api.orderInfo();
      console.log("今日订单统计信息----", res.data.list);
      this.orderData = res.data.list;
    },
    // 获取首页图表数据
    async lineInfo() {
      let res = await this.$api.lineInfo();
      console.log("首页图表数据----", res.data.result.data);
      console.log("折线图表数据----", res.data.result.data.sale_money);
      // 处理折线图数据,将数据从接口返回的对象转换为echarts需要的数组
      const arr = res.data.result.data.sale_money;
      const arrx = [],
        arryLine = [],
        arryBar = [];
      arr.forEach((item) => {
        arrx.push(item.name);
        arryLine.push(item.total_amount);
        arryBar.push(item.num);
      });
      // 处理饼图数据
      const arrPie = [];
      arr.forEach((item) => {
        arrPie.push({
          value: item.num,
          name: item.name,
        });
      });
      // 将处理后的数据赋值给echarts
      this.line(arrx, arryLine, arryBar);
      this.pie(arrPie);
    },
    // 绘制折线图
    line(arrx, arryLine, arryBar) {
      // 基于准备好的dom，初始化echarts实例
      var myChartLine = echarts.init(document.getElementById("charts-line"));
      // 绘制图表
      myChartLine.setOption({
        tooltip: {
          // 提示框组件
          trigger: "axis",
        },
        xAxis: {
          data: arrx, // x轴数据
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "line", // bar 柱状图 line 折线图 pie 饼图 map 地图 (bar和line可以直接互换，pie要重新写)
            data: arryLine, // y轴数据
            label: {
              show: true,
            },
            smooth: true, // 平滑曲线
          },
          {
            name: "销售量",
            type: "bar", // bar 柱状图 line 折线图 pie 饼图 map 地图 (bar和line可以直接互换，pie要重新写)
            data: arryBar, // y轴数据
          },
        ],
        legend: {
          show: true, // 是否显示图例
          orient: "horizontal", // 图例朝向：'horizontal' 或 'vertical'
          left: "center", // 水平位置：'left' / 'center' / 'right' 或具体数值
          top: "top", // 垂直位置：'top' / 'middle' / 'bottom'
          selectedMode: true, // 是否允许点击图例控制显示/隐藏
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true, // 是否显示该工具
              type: "png", // 保存的图片格式，支持 'png' 和 'jpeg'
              name: "月销售额图", // 保存文件的名称
              title: "保存为图片", // 工具标题文本
            }, // 保存为图片
          },
        },
      });
    },
    // 绘制饼图
    pie(arrPie) {
      var myChartPie = echarts.init(document.getElementById("charts-pie"));
      myChartPie.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true, // 是否显示该工具
              type: "png", // 保存的图片格式，支持 'png' 和 'jpeg'
              name: "产品销售比例图", // 保存文件的名称
              title: "保存为图片", // 工具标题文本
            }, // 保存为图片
          },
        },
        series: [
          {
            name: "销售量",
            type: "pie",
            radius: "50%",
            center: ["55%", "50%"], // 饼图位置，向右移动
            data: arrPie, // 饼图数据
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
  // 过滤器--处理数据格式
  filters: {
    num(value) {
      //12345 --- 12,345
      if (!value) return value;
      return value.toLocaleString();
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  .item {
    flex-grow: 1;
    width: 250px;
    border: #f3f4f7 1px solid;
    margin-right: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .el-col {
      border-right: #eee 1px solid;
    }
    .el-col:last-child {
      border-right: none;
    }
    .head {
      font-size: 14px;
      text-align: center;
      margin-bottom: 10px;
    }
    .num {
      font-size: 24px;
      text-align: center;
    }
  }
}
.middle {
  display: flex;
  height: 290px;
  margin-top: 20px;
  .middle-left {
    background: white;
    display: flex;
    flex-direction: column;
    flex: 7;
    margin-right: 10px;
    border: #f3f4f7 1px solid;
  }
  .middle-right {
    background: white;
    border: #f3f4f7 1px solid;
    flex: 3;
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
  #charts-line,
  #charts-pie {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
  }
}
.header {
  display: flex;
  justify-content: space-around;
  .item {
    background: white;
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