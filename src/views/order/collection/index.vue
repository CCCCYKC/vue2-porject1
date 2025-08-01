<template>
  <div class="colltion">
    <!-- 面包屑导航 -->
    <BreadcrumbNav></BreadcrumbNav>
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
                    placeholder="预定日期"
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
                    placeholder="预定日期"
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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 查询按钮 -->
        <div class="search">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>

      <!-- 导出按钮 -->
      <div class="btn">
        <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          header="xxx公司采购系统订单汇总列表"
          name="订单汇总列表.xls"
        >
          <el-button type="warning" size="small">导出</el-button>
        </download-excel>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <!-- selectable	
            仅对 type=selection 的列有效,类型为 Function,返回值用来决定这一行的 CheckBox 是否可以勾选	
            Function(row, index) -->
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column
          prop="orderNum"
          label="汇总单编号"
          align="center"
          width="180"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 商品名称:高亮、可点击进入详情页 -->
            <span style="color: #0077c8; cursor: pointer">{{
              scope.row.orderNum
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="汇总人" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="汇总时间"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            {{ moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="汇总单总价格" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <!-- scope可以传递该行的坐标信息 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-edit"
              @click="handleCancel(scope.$index, scope.row)"
            >
              撤销汇总
            </el-button>
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
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "@/components/pagination/pagination.vue";
export default {
  name: "LoginPage",
  components: {
    Pagination,
  },
  data() {
    return {
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
        operator: "",
      },
      tableData: [],
      pageSize: 8, // 每页显示条数
      total: 10, // 默认总条数
      currentPage: 1, // 默认当前页码
      json_fields: {
        //导出Excel的每列名称
        汇总单编号: "orderNum",
        汇总人: "operator",
        联系电话: "phone",
        汇总时间: "time",
        汇总单总价格: "totalPrice",
      },
    };
  },
  methods: {
    moment, // 引入 moment 库用于时间格式化
    // 查询按钮的处理函数(与前面产品列表逻辑相同，不写重复)
    handleSearch() {
      // 这里可以添加查询逻辑
      console.log("查询条件：", this.ruleForm);
    },
    // 撤销汇总按钮--------------
    handleCancel(index, row) {
      console.log("撤销汇总", index, row);
      this.$confirm("此操作将永久撤销该汇总, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.cancel({ id: row.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销该汇总",
          });
        });
    },
    // 分页传过来的页码----分页组件emit----接受子组件传递的数据重新渲染表格数据---------
    pageChanged(val) {
      console.log("当前页码：", val);
      this.currentPage = val; // 更新当前页码
      // 重新获取订单列表数据
      this.collect({ page: val });
    },
    // 获取订单列表数据  params={page:xx}---------
    async collect(params) {
      let res = await this.$api.collect(params);
      console.log("订单汇总列表数据：", res.data);
      let arr = res.data.data;
      arr.forEach((item) => {
        item.time = moment(item.time).format("YYYY-MM-DD HH:mm:ss");
      });
      //  赋值表格数据
      this.tableData = arr;
      this.total = res.data.total; // 更新总条数
      this.pageSize = res.data.pageSize; // 更新每页条数
    },
    // 撤销汇总请求  params={id:xx} -------
    async cancel(params) {
      let res = await this.$api.cancel(params);
      console.log("撤销汇总请求结果：", res.data);
      if (res.data.status === 200) {
        this.$message.success("撤销汇总成功");
        // 刷新订单列表
        this.collect({ page: this.currentPage });
      } else {
        this.$message.error("撤销汇总失败，请稍后再试");
      }
    },
  },
  created() {
    // 页面创建时获取订单列表数据
    this.collect();
  },
};
</script>

<style lang="less" scoped>
.colltion {
  .header {
    background: #fff;
    padding-bottom: 10px;
    .top {
      display: flex;
      flex-direction: row;
      .form {
        padding: 8px 10px 5px 15px;
        width: 900px;
        .el-form-item {
          margin-bottom: 2px;
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
      padding: 6px 8px 6px 8px;
      margin: 0 15px 0 15px;
      .el-button {
        width: 100px;
      }
    }
  }
  .table{
    background: #fff;
    padding: 0 15px 0 15px;
  }
}
</style>