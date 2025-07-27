<template>
  <div class="right">
    <!-- 顶部 -->
    <div class="header">
      <div class="icon">
        <!-- 缩进展开图标 -->
        <i v-if="isCollapse" class="el-icon-caret-right" @click="changeMenu"></i>
        <i v-else class="el-icon-caret-left" @click="changeMenu"></i>
      </div>
      <div class="rightText">
        <div class="item">{{ currentTime }}</div>
        <div class="item">{{ "下拉菜单" }}</div>
        <div class="itemIcon">
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "rightContent",
  props: {
    isCollapse: {
      // 从父组件接收折叠状态
      type: Boolean,
      default: false, // 默认不折叠
    },
    data() {
      return {
        currentTime: "", //当前时间
      };
    },
  },
  methods: {
    // 声明时间格式化函数----------
    moment,
    // 点击图标传递数据给父组件layout/index.js----------
    changeMenu() {
      this.$emit("toggleMenu"); // 触发父组件的事件来切换菜单状态
    },
    // 顶部时间----每秒更新
    autoTime() {
      this.currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm dddd");
    },
  },
  created() {
    // 第一次加载时更新-------待改进----每分钟更新一次
    this.autoTime();
  },
};
</script>

<style lang="less" scoped>
// 顶部样式
.header {
  z-index: 10000;
  position: sticky;
  top: 0;
  height: 50px;
  width: 100%;
  background: #1e78bf;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
  flex-direction: row;
  .icon {
    margin-left: 10px;
    color: #fff; /* 图标颜色 */
    font-size: 30px;
    cursor: pointer; /* 鼠标悬停时变为手型 */
  }
  .rightText {
    color: #fff;
    display: flex;
    align-items: center; /* 垂直居中 */
    flex-direction: row;
    .item {
      font-size: 16px;
      margin-right: 10px;
      padding-right: 10px;
      border-right: #fff solid 2px;
    }
    .itemIcon {
      margin-right: 20px;
      color: #fff; /* 图标颜色 */
      font-size: 26px;
      cursor: pointer; /* 鼠标悬停时变为手型 */
    }
  }
}
.content {
  padding-top: 15px;
  padding-right: 20px;
  padding-left: 20px;
  background: #f5f5f5;
  flex:1 ;
  // height: 638px;
  /* 关键修改：铺满剩余屏幕高度并支持滚动 */
  min-height: calc(100vh - 65px); /* 100vh是屏幕高度，减去顶部导航栏的50px + padding-top的15px高度 */
  height: 100%;
  overflow: auto; /* 内容超出时显示滚动条 */
}
</style>