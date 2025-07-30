<template>
  <div class="category">
    <div class="title">产品类目管理</div>
    <div class="btn">
      <el-button type="warning" icon="el-icon-plus" @click="append"
        >新增一级导航类目</el-button
      >
    </div>
    <div class="tree">
      <!-- Tree
            data: 数据源
            show-checkbox: 显示复选框
            node-key: 节点唯一标识
            default-expand-all: 默认展开所有节点
            expand-on-click-node: 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
            render-content: 自定义渲染内容，树节点的内容区的渲染Function	Function(h, { node, data, store }

            props:可自定义树节点的属性名
              label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
              children	指定子树为节点对象的某个属性值	string	—	—
              disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)	—	—
              isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)	—	—
        -->
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
    <!-- 弹窗 -->
    <div class="dialog">
      <Dialog ref="dialog" :info="info" @refresh="itemCategory"></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from "./dialog.vue";
// let id = 1000;
export default {
  name: "produceCategoryPage",
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false, // 弹窗是否显示
      treeData: [
        {
          id: 1,
          name: "一级 1",
        },
        {
          id: 2,
          name: "一级 2",
        },
      ],
      defaultProps: {
        label: "name",
      },
      info: {
        // 弹窗传递的参数props
        cid: 0,
        id: "",
        name: "",
        title: "",
      },
    };
  },
  methods: {
    // 新增一级导航类目按钮
    append(data) {
      // console.log("新增类目---", data);
      // 显示弹窗
      this.$refs.dialog.dialogVisible = true;
      if (!data.name) {
        this.info.title = "新增一级分类"; // 设置弹窗标题
      } else {
        this.info.title = "新增【" + data.name + "】节点的子级分类"; // 设置弹窗标题
        this.info.cid = data.cid;
        this.info.name = data.name;
      }
    },
    // 修改类目节点内容按钮
    update(node) {
      console.log("修改类目", node);
      // 显示弹窗
      this.$refs.dialog.dialogVisible = true;
      this.info.title = "修改【" + node.name + "】的节点名称"; // 设置弹窗标题
      // 让显示框内显示当前节点的名称 + 防止直接修改node.name
      let name = node.name;
      this.$refs.dialog.input = name;
      // 设置传递参数的 id 和 name
      this.info.id = node.id; // 类目id
      this.info.name = node.name; // 类目名称
    },
    // 删除类目节点按钮
    remove(node,data) {
      console.log("删除类目",node,data);
      this.$confirm("确认删除该类目吗？")
        .then(() => {
          // 删除操作
          this.deleteContentCategoryById({ id: data.id });
        })
        .catch(() => {
          this.$message.info("取消删除操作");
        });
    },
    // 整个树的结构模式  树节点的内容区的渲染Function	Function(h, { node, data, store }
    renderContent(h, { node, data }) {
      //   console.log("renderContent", node, data);
      return (
        <span class="custom-tree-node">
          <span class="name">{node.label}</span>
          <span>
            {/* render函数 jsx语法 不能使用vue语法 */}
            {node.level == 1 ? (
              <span>
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  on-click={() => this.append(data)}
                >
                  新增
                </el-button>
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  on-click={() => this.update(data)}
                >
                  修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  on-click={() => this.remove(node, data)}
                >
                  删除
                </el-button>
              </span>
            ) : (
              <span>
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  on-click={() => this.update(data)}
                >
                  修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  on-click={() => this.remove(node, data)}
                >
                  删除
                </el-button>
              </span>
            )}
          </span>
        </span>
      );
    },
    // 获取tree商品分类数据
    async itemCategory() {
      let res = await this.$api.itemCategory();
      console.log("商品分类数据-----", res.data.result);
      // res.data.result的数据为数组，但是渲染所要的数据是由嵌套关系的对象，要对数组进行二次处理
      // 一级的cid = 二级的type
      let arr = res.data.result;
      let oneArr = [];
      arr.forEach((ele) => {
        if (ele.type === 1) {
          //当type为1时，表示一级类目
          oneArr.push({
            ...ele,
            children: [],
          });
        } else {
          //当type不为1时，表示二级类目
          // 找到对应的一级类目，将二级类目添加到一级类目的children中(一级.cid === 二级.type)
          oneArr.forEach((item) => {
            if (item.cid === ele.type) {
              item.children.push({
                ...ele,
              });
            }
          });
        }
      });
      this.treeData = oneArr;
      console.log("处理后的商品分类数据-----", this.treeData);
    },
    // 删除类目请求
    async deleteContentCategoryById(params) {
      console.log("删除类目请求参数", params);
      let res = await this.$api.deleteContentCategoryById(params);
      console.log("删除类目返回结果", res.data);
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除类目成功",
        });
        // 返回后要刷新页面重新获取
        this.itemCategory(); // 重新获取商品分类数据
      } else {
        this.$message.error("删除类目失败");
      }
    },
  },
  created() {
    this.itemCategory();
  },
};
</script>

<style lang="less" scoped>
.category {
  background: #fff;
  padding: 20px;
  .title {
    background: #f5f5f5;
    font-size: 20px;
    padding: 15px;
    margin-bottom: 20px;
  }
  .btn {
    margin-bottom: 20px;
  }
  .tree {
    margin: 10px;
    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }
    /deep/ .el-tree-node__content {
      margin-bottom: 15px;
    }
  }
  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
</style>