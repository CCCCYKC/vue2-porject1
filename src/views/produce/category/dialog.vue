<template>
  <!-- 
       title Dialog 的标题，也可通过具名 slot （见下表）传入	string
       visible 	是否显示 Dialog，支持 .sync 修饰符	boolean	—	false
       width	Dialog 的宽度	string	—	50%
       top	Dialog CSS 中的 margin-top 值	string	—	15vh
    -->
  <el-dialog
    :title="info.title"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <strong>请输入类目名称：</strong>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogComponent",
  props: {
    info: {
      // 弹窗传递的参数props
      cid: Number, // 类目cid
      name: String, // 类目名称
      title: String, // 弹窗标题
    },
  },
  data() {
    return {
      dialogVisible: false, // 弹窗是否显示
      input: "", // 输入框内容
    };
  },
  methods: {
    // 提交按钮----------
    submitHandle() {
      // 新建 + 修改
      console.log("提交input", this.input);
      console.log("info", this.info);
      let keyWord = this.info.title[0];
      if (keyWord === "新") {
        // 新增类目
        if (this.info.title === "新增一级分类") {
          // 新增一级类目
          this.insertCategory({ name: this.input });
        } else {
          // 新增二级类目
          this.insertItemCategory({
            cid: this.info.cid, // 类目cid
            name: this.input, // 类目名称
          });
        }
      } else if (keyWord === "修") {
        // 修改类目
        this.updateCategory({
          id: this.info.id, // 类目id
          name: this.input, // 类目名称
        });
      }
    },
    // 取消按钮-----------
    cancelHandle() {
      console.log("取消操作");
      this.dialogVisible = false; // 关闭弹窗
      this.input = ""; // 清空输入框内容
    },
    // 点击弹窗上面的关闭按钮----------
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.dialogVisible = false; // 关闭弹窗
          this.input = ""; // 清空输入框内容
        })
        .catch(() => {});
    },
    // 新增一级类目 name------------
    async insertCategory(params) {
      let res = await this.$api.insertCategory(params);
      console.log("新增一级类目返回结果", res.data);
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "新增一级类目成功",
        });
        this.dialogVisible = false; // 关闭弹窗
        this.input = ""; // 清空输入框内容
        // 返回后要刷新页面重新获取
        this.$emit("refresh"); // 触发父组件的刷新事件
      } else {
        this.$message.error("新增一级类目失败");
      }
    },
    // 新增二级类目 name cid------------
    async insertItemCategory(params) {
      let res = await this.$api.insertItemCategory(params);
      console.log("新增二级类目返回结果", res.data);
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "新增二级类目成功",
        });
        this.dialogVisible = false; // 关闭弹窗
        this.input = ""; // 清空输入框内容
        // 返回后要刷新页面重新获取
        this.$emit("refresh"); // 触发父组件的刷新事件
      } else {
        this.$message.error("新增二级类目失败");
      }
    },
    // 修改类目 name id------------
    async updateCategory(params) {
      let res = await this.$api.updateCategory(params);
      console.log("修改类目返回结果", res.data);
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "修改类目成功",
        });
        this.dialogVisible = false; // 关闭弹窗
        this.input = ""; // 清空输入框内容
        // 返回后要刷新页面重新获取
        this.$emit("refresh"); // 触发父组件的刷新事件
      } else {
        this.$message.error("修改类目失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
// .dialog {

// }
</style>