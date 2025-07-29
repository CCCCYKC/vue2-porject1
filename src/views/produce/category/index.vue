<template>
  <div class="category">
    <div class="title">产品类目管理</div>
    <div class="btn">
      <el-button type="warning" icon="el-icon-plus">新增一级导航类目</el-button>
    </div>
    <div class="tree">
      <!-- Tree
            data: 数据源
            show-checkbox: 显示复选框
            node-key: 节点唯一标识
            default-expand-all: 默认展开所有节点
            expand-on-click-node: 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
            render-content: 自定义渲染内容，树节点的内容区的渲染Function	Function(h, { node, data, store }
        -->
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "produceCategoryPage",
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
            },
            {
              id: 5,
              label: "二级 1-1",
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 6,
              label: "二级 2-1",
            },
            {
              id: 7,
              label: "二级 2-2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 新增一级导航类目按钮
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    // 修改类目节点内容按钮
    update(data) {
      // 这里可以添加更新逻辑
      console.log("更新节点", data);
    },
    // 删除类目节点按钮
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    // 整个树的结构模式  树节点的内容区的渲染Function	Function(h, { node, data, store }
    renderContent(h, { node, data }) {
    //   console.log("renderContent", node, data);
      return (
        <span class="custom-tree-node">
          <span class="name">{node.label}</span>
          <span>
            {/* render函数 jsx语法 不能使用vue语法 */}
            {node.level == 1 ? <span>
                <el-button size="mini" icon="el-icon-plus" on-click={() => this.update(data)}>新增</el-button>
                <el-button size="mini" icon="el-icon-edit" on-click={() => this.update(data)}>修改</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" on-click={() => this.remove(node, data)}>删除</el-button>
              </span> : <span>
                <el-button size="mini" icon="el-icon-edit" on-click={() => this.update(data)}>修改</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" on-click={() => this.remove(node, data)}>删除</el-button>
              </span>
            }
          </span>
        </span>
      );
    },
    // 获取tree商品分类数据
    async itemCategory() {
        let res = await this.$api.itemCategory();
        console.log("商品分类数据-----", res.data);
    }
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