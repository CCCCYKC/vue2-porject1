<template>
  <div class="list" ref="list">
    <!-- 头部 -->
    <div class="header">
      <!-- 表单+查询 -->
      <div class="top">
        <!-- 表单 -->
        <div class="form">
          <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
            <el-form-item label="订单编号">
              <el-input
                v-model="ruleForm.name"
                placeholder="输入品牌名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="预定时间"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                    size="small"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-date-picker
                    placeholder="预定时间"
                    v-model="ruleForm.date2"
                    style="width: 100%"
                    size="small"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="下单人姓名">
              <el-input
                v-model="ruleForm.orderName"
                placeholder="下单人"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
              <el-input
                v-model="ruleForm.company"
                placeholder="所属单位"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="汇总状态">
              <el-select
                v-model="ruleForm.huizongStatus"
                placeholder="全部"
                size="small"
              >
                <el-option label="已汇总" value="shanghai"></el-option>
                <el-option label="未汇总" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <!-- 查询按钮 -->
        <div class="search">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>

      <!-- 汇总导出按钮 -->
      <div class="btn">
        <el-button type="warning" size="small" @click="handleCollect"
          >订单汇总</el-button
        >
        <el-button type="warning" size="small">导出</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <!-- 方法：select 当选中勾选框时触发 -->
      <el-table :data="tableData" border style="width: 100%" @select="select">
        <!-- selectable	
            仅对 type=selection 的列有效,类型为 Function,返回值用来决定这一行的 CheckBox 是否可以勾选	
            Function(row, index) -->
        <el-table-column
          type="selection"
          align="center"
          :selectable="(row) => (row.huizongStatus === 1 ? true : false)"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="订单编号"
          align="center"
          width="180"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 商品名称:高亮、可点击进入详情页 -->
            <span
              style="color: #0077c8; cursor: pointer"
              @click="intoDetail(scope.$index, scope.row)"
              >{{ scope.row.code }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="下单人" align="center">
        </el-table-column>
        <el-table-column prop="company" label="所属单位" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center">
        </el-table-column>
        <el-table-column
          prop="yudingTime"
          label="预定时间"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            {{ moment(scope.row.yudingTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="订单总价格" align="center">
        </el-table-column>
        <el-table-column prop="huizongStatus" label="汇总状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.huizongStatus === 1 ? "未汇总" : "已汇总" }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <Pagination
          :total="total"
          :currentPage="currentPage"
          @pageChanged="pageChanged"
        ></Pagination>
      </div>
    </div>

    <!-- 抽屉---订单详情 -->
    <Drawer ref="orderDetail" :drawerData="drawerData"></Drawer>
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "@/components/pagination/pagination.vue";
import Drawer from "./drawer.vue";
export default {
  name: "LoginPage",
  components: {
    Pagination,
    Drawer,
  },
  data() {
    return {
      ruleForm: {
        //表单的数据
        name: "",
        date1: "",
        date2: "",
        ordername: "",
        company: "",
        huizongStatus: "",
      },
      tableData: [],
      pageSize: 8, // 每页显示条数
      total: 10, // 默认总条数
      currentPage: 1, // 默认当前页码
      ids: [], // 用于存储选中订单的ID
      drawerData: {
        // 用于存储抽屉组件的数据
        code: "", // 订单编号
        ordername: "", // 下单人姓名
        company: "", // 所属单位
        phone: "", // 联系电话
        yudingTime: "", // 预定时间
        price: "", // 订单总价格
        huizongStatus: "", // 汇总状态
      },
    };
  },
  methods: {
    moment, // 引入 moment 库用于时间格式化
    // 查看订单详情
    intoDetail(index, row) {
      // 逻辑: 1.将该行的数据传递给组件，让其显示在组件的表单里面 2.打开抽屉展示订单详情
      console.log("查看订单详情操作----", index, row);
      // 将选中行的数据传递给抽屉组件
      this.drawerData = {
        code: row.code,
        ordername: row.ordername,
        company: row.company,
        phone: row.phone,
        yudingTime: moment(row.yudingTime).format("YYYY-MM-DD HH:mm:ss"),
        price: row.price,
        huizongStatus: row.huizongStatus === 1 ? "未汇总" : "已汇总",
      };
      this.$refs.orderDetail.drawer = true; // 打开抽屉
    },
    // 订单汇总按钮的处理函数
    handleCollect() {
      // 逻辑: 1. 获取当前选中的订单数据 2.提交汇总到汇总表(接收字符串) 3.更改选中订单的汇总状态 4.刷新列表(留在当前页)
      // 若有条件加个确认弹窗
      if (this.ids.length >= 2) {
        // 传递的ids必须是字符串而非数组
        let idStr = this.ids.join(",");
        console.log("选中的订单idStr：", idStr);
        this.changeStatus({ ids: idStr });
      } else {
        // 若选择记录小于2条，则警告
        this.$message.error("请至少选择两条订单记录进行汇总");
        return;
      }
    },
    // 选中勾选内容的id，并将id存储到ids数组中-------
    select(selection) {
      // console.log('选中勾选内容----',selection);
      let arr = [];
      selection.forEach((item) => {
        arr.push(item.id);
      });
      this.ids = arr;
    },
    // 查询按钮的处理函数(与前面产品列表逻辑相同，不写重复)
    handleSearch() {
      console.log("查询条件：", this.ruleForm);
    },
    // 分页传过来的页码----分页组件emit----接受子组件传递的数据重新渲染表格数据---------
    pageChanged(val) {
      console.log("当前页码：", val);
      this.currentPage = val; // 更新当前页码
      // 重新获取订单列表数据
      this.list({ page: val });
    },
    // 获取订单列表数据  page---------
    async list(params) {
      let res = await this.$api.list(params);
      console.log("订单列表数据：", res.data);
      //  赋值表格数据
      this.tableData = res.data.data;
      this.total = res.data.total; // 更新总条数
      this.pageSize = res.data.pageSize; // 更新每页条数
    },
    // 提交汇总数据-----参数为ids字符串-----------
    async changeStatus(params) {
      let res = await this.$api.changeStatus(params);
      console.log("提交汇总数据：", res.data);
      if (res.data.status === 200) {
        this.$message.success("汇总成功");
        // 提交汇总数据成功后，刷新订单列表
        this.list({ page: this.currentPage });
        // 清空选中状态
        this.ids = [];
      } else {
        this.$message.error("汇总失败，请稍后再试");
        // 清空选中状态
        this.ids = [];
      }
    },
  },
  created() {
    // 页面创建时获取订单列表数据
    this.list();
  },
};
</script>

<style lang="less" scoped>
.list {
  background: #fff;
  padding: 20px;
  .header {
    background: #fff;
    .top {
      display: flex;
      flex-direction: row;
      .form {
        padding-top: 5px;
        padding-left: 10px;
        width: 900px;
        .el-form-item {
          margin-bottom: 10px;
          margin-right: 15px;
        }
      }
      .search {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
    .btn {
      border: #eee solid 1px;
      padding: 10px;
      margin-bottom: 20px;
      .el-button {
        width: 100px;
      }
    }
  }
}
</style>