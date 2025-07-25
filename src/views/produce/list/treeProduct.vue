<template>
  <div class="tree">
    <!--
      树组件Tree
      props
      load
      lazy  **懒加载**
    -->
    <el-tree :props="props" :load="loadNode" lazy> </el-tree>
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
    };
  },
  methods: {
    // tree懒加载自动调用这个函数---即点击节点时会自动调用
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.selectItemCategoryByParentId();
        return resolve([]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{ name: "leaf" }, { name: "zone" }];
        resolve(data);
      }, 500);
    },
    // 请求tree类目数据结构---------
    async selectItemCategoryByParentId(type) {
      let res = await this.$api.selectItemCategoryByParentId({type});
      console.log('tree类目数据结构----',res.data);
      
    },
  },
};
</script>

<style lang="less" scoped>
</style>