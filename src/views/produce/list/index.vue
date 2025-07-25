<!-- 产品管理 -- 产品列表 -->
<template>
  <div class="listPage">
    <!-- 1.产品搜索 -->
    <div class="header">
      <!-- 表单 -->
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input
              v-model="formInline.productName"
              placeholder="产品名称"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="选择日期"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加删除 -->
      <div class="btn">
        <el-button
          type="warning"
          size="small"
          icon="el-icon-plus"
          @click="toAddProduct"
          >添加商品</el-button
        >
        <el-button type="danger" size="small" icon="el-icon-delete"
          >批量删除</el-button
        >
      </div>
    </div>
    <!-- 2.产品列表 -->
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        header-cell-class-name="table-header"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="date" label="日期" width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <!-- scope可以传递该行的坐标信息 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination :pageSize="pageSize" :total="total"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination.vue";
export default {
  name: "productListPage",
  components: {
    Pagination,
  },
  data() {
    return {
      formInline: {
        productName: "",
        date: "",
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小明",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "张三",
          address: "北京市朝阳区芍药居",
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "广州市天河区体育西路",
        },
        {
          date: "2016-05-03",
          name: "王小明",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "张三",
          address: "北京市朝阳区芍药居",
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "广州市天河区体育西路",
        },
        {
          date: "2016-05-03",
          name: "王小明",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      pageSize: 8,
      total: 80, // 假设总条数为100
    };
  },
  methods: {
    // 跳转到添加产品页面
    toAddProduct() {
      this.$router.push('/produce/addProduct');
    },
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 获取产品列表数据----------
    async projectList(page) {
      let res = await this.$api.projectList({ page });
      console.log("产品列表数据----", res);
    },
  },
  created() {
    this.projectList();
  },
};
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  margin-bottom: 15px;
  .form {
    padding-top: 10px;
    padding-left: 10px;
    border-bottom: #f3f4f7 solid 1px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .btn {
    border: #eee solid 1px;
    padding: 10px;
  }
}
.content {
  background: #fff;
  ::v-deep .table-header {
    color: black;
  }
  .pagination {
    padding: 10px;
  }
}
</style>