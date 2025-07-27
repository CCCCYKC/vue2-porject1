<template>
  <div class="tree">
    <!--
      树组件Tree
      props
      load
      lazy  **懒加载**
      accordion 每次只打开一个节点
    -->
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="clickHandle"> </el-tree>
  </div>
</template>

<script>
export default {
  name: "TreeProductPage",
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      treeData: [],
    };
  },
  methods: {
    // 点击节点，将数据传递给父组件------
    clickHandle(data) {
      // console.log('data',data,'node',node);
      this.$emit('getCategory',data);
    },
    // tree懒加载自动调用这个函数---即点击节点时会自动调用------
    loadNode(node, resolve) {
      console.log("node------", node);
      if (node.level === 0) {
        // 请求tree类目数据结构---------
        this.$api.selectItemCategoryByParentId()
        .then((res) => {
          console.log("tree类目数据结构----", res.data);
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        // 请求数据-----------
        this.$api.selectItemCategoryByParentId({ type: node.data.cid })
          .then((res) => {
            console.log("tree类目数据结构----", res.data);
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
  // // 请求tree类目数据结构---------
  // async selectItemCategoryByParentId(type) {
  //   let res = await this.$api.selectItemCategoryByParentId({ type });
  //   console.log("tree类目数据结构----", res.data);
  // },
};
</script>

<style lang="less" scoped>
</style>