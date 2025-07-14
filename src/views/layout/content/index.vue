<template>
  <div class="right">
    <!-- 顶部 -->
    <div class="header">
      <div class="icon">
        <!-- 缩进展开图标 -->
        <i v-if="isCollapse" class="el-icon-caret-right" @click="changeMenu"></i>
        <i v-else class="el-icon-caret-left" @click="changeMenu"></i>
      </div>
    </div>
    <!-- 右侧内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "rightContent",
  props: {
    isCollapse: {   // 从父组件接收折叠状态
      type: Boolean,
      default: false, // 默认不折叠
    },
  },
  methods: {
    changeMenu() {
      this.$emit("toggleMenu"); // 触发父组件的事件来切换菜单状态
    },
  },
};
</script>

<style lang="less" scoped>
// 顶部样式
.header {
  position: sticky;
  top: 0;
  height: 50px;
  width: 100%;
  background: #1e78bf;
  display: flex;
  align-items: center; /* 垂直居中 */
  .icon {
    margin-left: 10px;
    color: #fff; /* 图标颜色 */
    font-size: 30px;
    cursor: pointer; /* 鼠标悬停时变为手型 */
  }
}
</style>