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
              v-model="formInline.name"
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
            <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-search">查询</el-button>
            <el-button type="success" @click="onRestore" size="small" icon="el-icon-refresh-right">复原</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加删除 -->
      <div class="btn">
        <el-button type="warning" size="small" icon="el-icon-plus" @click="toAddProduct">添加商品</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="toDelProduct">批量删除</el-button>
      </div>
    </div>
    <!-- 2.产品列表 -->
    <div class="content">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border header-cell-class-name="table-header">
        <el-table-column type="selection" width="55" align="center" ></el-table-column>
        <el-table-column prop="id" label="商品编号" width="120" align="center">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="120" align="center">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="120" align="center">
        </el-table-column>
        <!-- 时间格式化处理 -->
        <el-table-column label="添加时间" width="200" align="center">
          <template slot-scope="scope">
            {{ moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商品描述" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ removeHTMLTag(scope.row.descs) }}
          </template>
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
      <!-- 分页组件 -->
      <div class="pagination">
        <Pagination
          :pageSize="pageSize"
          :total="total"
          @pageChanged="pageChanged"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination.vue";
import moment from "moment";
import { removeHTMLTag } from '@/views/utils/common.js'
export default {
  name: "productListPage",
  components: {
    Pagination,
  },
  data() {
    return {
      formInline: {
        name: "",
        date: "",
      },
      tableData: [],
      pageSize: 8,
      total: 0, // 假设总条数为100
    };
  },
  methods: {
    // 声明moment时间格式化方法
    moment,
    // 声明HTML标签处理方法
    removeHTMLTag,
    // 跳转到添加产品页面-----------
    toAddProduct() {
      this.$router.push("/produce/addProduct");
    },
    // 批量删除按钮
    toDelProduct() {

    },
    // 查询按钮----------------
    onSubmit() {
      console.log("submit!",this.formInline.name);
      this.search(this.formInline.name);
    },
    // 复原按钮------------------
    onRestore() {
      // 让表单置空
      this.formInline.name = '';
      this.formInline.date = '';
      //回到分页第一页
      this.projectList(1);    
    },
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除单个数据按钮------------
    handleDelete(index, row) {
      console.log('删除单个数据操作----', index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除该数据----请求后台接口----同步数据库--------
          this.handleDelete(row.id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 分页组件emit-----接受子组件传递的数据重新渲染表格数据---------
    pageChanged(page) {
      console.log("当前页:", page);
      this.projectList(page); // 调用获取产品列表数据的方法
    },
    // 获取产品列表数据----------
    async projectList(page) {
      let res = await this.$api.projectList({ page });
      console.log("产品列表数据----", res.data);
      this.tableData = res.data.data;
      this.pageSize = res.data.pageSize || 8; // 设置每页显示的条数
      this.total = res.data.total;
    },
    // 搜索接口请求----------
    async search (search) {
      if(!search) {
        return;
      }
      let res = await this.$api.search({ search });
      console.log('搜索数据----', res.data);
      if(res.data.status === 200) {   //有结果
        this.tableData = res.data.result;
        // 处理结果的分页
        this.total = res.data.result.length;
      } else {    //无结果
        this.tableData = [];
        this.total = 0;
      }
    },
    // 删除单个数据请求-----------
    async deleteItemById (id) {
      let res = await this.$api.deleteItemById({ id });
      console.log('删除单个数据请求----',res.data);
      // 删除成功弹窗
      if(res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 重新渲染视图
        this.projectList(1);
      }
    },
  },
  created() {
    this.projectList(1);
  },
};
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  margin-bottom: 10px;
  .form {
    padding-top: 5px;
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
    padding: 5px;
  }
}
</style>