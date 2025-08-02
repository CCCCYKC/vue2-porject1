<template>
  <div class="drawer">
    <el-drawer
      title="订单详情"
      direction="rtl"
      :visible="drawer"
      :before-close="handleClose"
      :size="size"
      custom-class="custom-drawer"
    >
      <div class="content">
        <!-- 订单列表list传递过来的数据 -->
        <div class="from">
          <el-form :inline="true" :model="fromData" class="demo-form-inline">
            <el-form-item label="订单编号">
              <el-input
                v-model="fromData.code"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-input
                v-model="fromData.yudingTime"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="下单人姓名">
              <el-input
                v-model="fromData.ordername"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
              <el-input
                v-model="fromData.company"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="汇总状态">
              <el-input
                v-model="fromData.huizongStatus"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="订单总价">
              <el-input
                v-model="fromData.price"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 订单详情的列表 -->
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="产品名称" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
            </el-table-column>
            <el-table-column prop="guige" label="规格" align="center">
            </el-table-column>
            <el-table-column prop="num" label="数量" align="center">
            </el-table-column>
            <el-table-column prop="sum" label="小计(元)" align="center">
            </el-table-column>
          </el-table>
        </div>

        <!-- 审核的信息：审核人input、审核意见textarea -->
        <div class="footerFrom">
          <el-form :inline="true" :model="footerFromData" class="demo-ruleForm">
            <el-form-item label="订单审核通过" prop="pass">
              <el-checkbox v-model="footerFromData.pass" disabled>通过</el-checkbox>
            </el-form-item>
            <el-form-item label="审核人">
              <el-input
                v-model="footerFromData.shenhename"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-input
                v-model="footerFromData.time"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="审核意见" prop="suggestion">
              <el-input
                type="textarea"
                v-model="footerFromData.suggestion"
                autosize
                disabled
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 返回按钮 -->
        <div class="btn">
            <el-button type="primary" plain @click="handleClose">返回</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "drawerComponent",
  props: {
    drawerData: {
      type: Object,
      default: () => ({
        code: "",
        ordername: "",
        company: "",
        phone: "",
        yudingTime: "",
        price: "",
        huizongStatus: "",
      }),
    },
  },
  data() {
    return {
      drawer: false, // 是否打开抽屉
      size: "85%", // 抽屉的宽度
      menu: 200, //menu的默认宽度
      width: 1800, //浏览器屏幕的宽度
      fromData: {
        // 用于存储上方表单传递过来的的数据
        code: "", // 订单编号
        ordername: "", // 下单人姓名
        company: "", // 所属单位
        phone: "", // 联系电话
        yudingTime: "", // 预定时间
        price: "", // 订单总价格
        huizongStatus: "", // 汇总状态
      },
      tableData: [], //用于存储读取表格的数据
      footerFromData: {
        // 用于存储下方表单传递过来的的数据
        pass: true, //订单审核(通过或不通过)
        shenhename: "", // 审核人
        time: "", //审核时间
        suggestion: "", // 审核意见
      },
    };
  },
  methods: {
    // 关闭抽屉--------
    handleClose() {
      this.drawer = false; // 关闭抽屉
    },
    // 处理浏览器窗口大小变化
    handleResize() {
      const newWidth = document.documentElement.clientWidth;
      this.width = newWidth; // 更新浏览器宽度
    },
    // 获取详情数据  假数据-----
    async detail() {
      let res = await this.$api.detail();
      console.log("点击打开的数据详情", res.data.result);
      this.tableData = res.data.result.list;
      this.footerFromData = { ...res.data.result };
    },
  },
  created() {
    this.detail();
  },

  computed: {
    ...mapState(["isCollapse"]), // 从 Vuex 中获取 isCollapse 状态
  },
  watch: {
    // 监听menu的折叠状态并计算抽屉的宽度
    isCollapse(val) {
      //   console.log("是否折叠", val);
      val ? (this.menu = 64) : (this.menu = 200); // 折叠时宽度为64px，否则为200px
      this.size = this.width - this.menu + "px"; // 设置抽屉的宽度
    },
    // 监听浏览器宽度变化
    width(val) {
      this.size = `${val - this.menu}px`; // 实时更新抽屉宽度
    },
    // 当props改变时，及时传值给tableData
    drawerData(obj) {
      this.fromData = { ...obj };
    },
    // 当drawer为true时，要重新获取审核信息(下方表单footerTableData)
    drawer(val) {
      if (val === true) {
        this.detail();
      }
    },
  },
  mounted() {
    // console.log("是否折叠", this.isCollapse);
    let width = document.documentElement.clientWidth; // 获取浏览器屏幕的宽度
    this.size = width - this.menu + "px"; // 设置抽屉的宽度
    this.width = width; // 保存浏览器宽度
    // 添加窗口大小变化监听
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 移除事件监听，防止内存泄漏
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 20px;
  .from {
    margin-bottom: 10px;
    .el-form-item {
      margin-bottom: 10px;
      margin-right: 15px;
    }
  }
  .table {
    margin-bottom: 10px;
  }
  .btn{
    display: flex;
    justify-content: center;
  }
}
</style>