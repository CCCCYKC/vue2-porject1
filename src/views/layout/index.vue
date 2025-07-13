<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse" />
    </div>
    <!-- 右侧内容 -->
    <div class="content" :class="{ collapseWidth: isCollapse }">
      <Content @toggleMenu="changeMenu" :isCollapse="isCollapse" />
    </div>
  </div>
</template>

<script>
import Menu from "./menu/index.vue";
import Content from "./content/index.vue";
export default {
  name: "LayoutPage",
  components: {
    Menu,
    Content,
  },
  data() {
    return {
      isCollapse: false, // 控制菜单是否折叠
    };
  },
  methods: {
    changeMenu() {      // 切换菜单折叠状态
      this.isCollapse = !this.isCollapse; 
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  .menu {
    // width: 200px;
    background: #112f50;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .content {    // 右侧内容区域宽度
    padding-left: 200px;    // 未折叠状态下的左侧内容宽度
  }
  .collapseWidth {
    padding-left: 64px; // 折叠状态下的左侧内容宽度
  }
}
</style>