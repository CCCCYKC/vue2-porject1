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
            <el-button
              type="primary"
              @click="onSubmit"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-button
              type="success"
              @click="onRestore"
              size="small"
              icon="el-icon-refresh-right"
              >复原</el-button
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
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="deleteAll"
          >批量删除</el-button
        >
      </div>
    </div>
    <!-- 2.产品列表 -->
    <div class="content">
      <!-- 表格 -->
      <!-- 方法：
          select	当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
          select-all	当用户手动勾选全选 Checkbox 时触发的事件	selection
       -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        header-cell-class-name="table-header"
        @select="handleSelect"
        @select-all="handleSelect"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="商品编号" width="120" align="center">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- 商品名称:高亮、可点击进入详情页 -->
            <span style="color: #0077c8; cursor: pointer;" @click="handleLook(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="120"
          align="center"
        >
        </el-table-column>
        <!-- 时间格式化处理 -->
        <el-table-column label="添加时间" width="200" align="center">
          <template slot-scope="scope">
            {{ moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          align="center"
          show-overflow-tooltip
        >
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
          :currentPage="currentPage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination.vue";
import moment from "moment";
import { removeHTMLTag } from "@/views/utils/common.js";
import { mapMutations } from "vuex";
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
      currentPage: 1, //默认当前页面
      searchWord: "", //搜索关键词
      lastSearchWord: "", //上次的搜索关键词
      isSearch: false, //是否处于搜索状态
      ids: [], // 用于存储批量删除的商品ID
    };
  },
  methods: {
    // 声明moment时间格式化方法
    moment,
    // 声明HTML标签处理方法
    removeHTMLTag,
    ...mapMutations('product',['changeRowData', 'changeTitle']), // Vuex方法：修改行数据
    // 批量删除按钮------------
    deleteAll() {
      // 传递的ids必须是字符串而非数组
      let idStr = this.ids.join(",");
      // 提示框：是否删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 请求批量删除后台接口
          this.$api.batchDelete({ ids: idStr })
            .then((res) => {
              console.log("批量删除商品请求----", res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "批量删除成功!",
                });
                // 重新渲染视图----删除前所在页面 || 删完了本页的最后一页---->回到页面的前一页
                const newTotal = this.total - this.ids.length; // 删除后的总记录=前总条数-ids.length
                const totalPages = newTotal > 0 ? Math.ceil(newTotal / this.pageSize) : 1; // 总页数=向上取整(新总数/页大小)
                // 若当前页大于总页数，跳转到最后一页（否则停留在当前页）
                const targetPage = this.currentPage > totalPages ? totalPages : this.currentPage;
                this.projectList(targetPage); // 重新加载目标页数据
              }
            })
            .catch((error) => {
              console.error("批量删除失败:", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 处理表格选择框选中的数据-----------
    handleSelect(selection) {
      console.log("选中的数据:", selection);
      // 获取所有选中的数据的id
      let arr = [];
      selection.forEach((item) => {
        arr.push(item.id);
      });
      console.log("批量删除的商品ID:", arr);
      this.ids = arr; // 将选中的ID存储到ids数组中
    },
    // 跳转到添加产品页面-----------
    toAddProduct() {
      // 更改vuex中的title数据
      this.changeTitle("添加产品");
      this.$router.push("/produce/addProduct");
    },
    // 查询按钮----------------
    onSubmit() {
      console.log("submit!", this.formInline.name);
      this.searchWord = this.formInline.name;
      this.search(this.formInline.name);
    },
    // 复原按钮------------------
    onRestore() {
      // 让表单置空
      this.formInline.name = "";
      this.formInline.date = "";
      this.lastSearchWord = "";
      this.isSearch = false;
      //回到分页第一页
      this.projectList(1);
    },
    // 查看商品详情按钮--------------
    handleLook(index, row) {
      //目的：只有取消按钮，没有保存和重置按钮 用v-show="title != '产品详情'"控制
      console.log("查看单个数据详情操作----", index, row);
      // 存储当前行的数据vuex---跳转到另一界面---获取vuex行数据
      this.changeRowData(row);
      // 更改vuex中的title数据
      this.changeTitle("产品详情");
      // 跳转到添加产品页面
      this.$router.push("/produce/addProduct");
    },
    // 编辑单个数据按钮--------------
    handleEdit(index, row) {
      console.log("编辑单个数据操作----", index, row);
      // 存储当前行的数据vuex---跳转到另一界面---获取vuex行数据
      this.changeRowData(row);
      // 更改vuex中的title数据
      this.changeTitle("编辑产品");
      // 跳转到添加产品页面
      this.$router.push("/produce/addProduct");
    },
    // 删除单个数据按钮------------
    handleDelete(index, row) {
      console.log("删除单个数据操作----", index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除该数据----请求后台接口----同步数据库--------
          this.deleteItemById(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页传过来的页码----分页组件emit----接受子组件传递的数据重新渲染表格数据---------
    pageChanged(page) {
      console.log("当前页:", page);
      this.currentPage = page;
      // 如果处于搜索状态----根据上次submit的searchWord来搜索-----搜索新的 || 旧数据分页(根据)
      if (this.isSearch) {
        // 重新执行搜索，会自动根据最新的currentPage切割数据
        this.search(this.searchWord);
      } else {
        // 非搜索状态，加载普通列表
        this.projectList(page); // 调用获取产品列表数据的方法
      }
    },
    // 获取产品列表数据----------
    async projectList(page) {
      let res = await this.$api.projectList({ page });
      console.log("产品列表数据----", res.data);
      this.tableData = res.data.data;
      this.pageSize = res.data.pageSize || 8; // 设置每页显示的条数
      this.total = res.data.total;
      this.currentPage = page || 1;
    },
    // 搜索接口请求----------
    async search(search) {
      if (!search) {
        // 搜索关键词为空时，直接不搜索，搜索状态为false,返回
        this.isSearch = false;
        return;
      } else if (this.lastSearchWord !== search) {
        // 当搜索值与上次搜索值不同时，强制重置当前页为1，并更新lastSearchWord
        this.currentPage = 1;
        this.lastSearchWord = search;
      }
      // 处于搜索状态
      this.isSearch = true;
      let res = await this.$api.search({ search });
      console.log("搜索数据----", res.data);
      if (res.data.status === 200) {
        // 处理结果的分页
        this.total = res.data.result.length;
        // 第一页显示1-8条记录，第二页显示9-16条记录....
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        // 有结果，只展示当前页的数据
        this.tableData = res.data.result.slice(startIndex, endIndex);
      } else {
        //无结果
        this.tableData = [];
        this.total = 0;
        this.currentPage = 1;
      }
    },
    // 删除单个数据请求-----------
    async deleteItemById(id) {
      let res = await this.$api.deleteItemById({ id });
      console.log("删除单个数据请求----", res.data);
      // 删除成功弹窗
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 重新渲染视图----删除前所在页面 || 删完了本页的最后一页---->回到页面的前一页
        const newTotal = this.total - 1; // 删除后总条数减1
        const totalPages =
          newTotal > 0 ? Math.ceil(newTotal / this.pageSize) : 1; // 总页数=向上取整(新总数/页大小)
        // 若当前页大于总页数，跳转到最后一页（否则停留在当前页）
        const targetPage =
          this.currentPage > totalPages ? totalPages : this.currentPage;
        this.projectList(targetPage); // 重新加载目标页数据
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
      margin-bottom: 5px;
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
}
// 解决el-message组件的z-index问题，避免被顶部导航遮挡
::v-deep .el-message {
  z-index: 10000 !important; /* 比顶部导航的 10000 大即可 */
}
</style>