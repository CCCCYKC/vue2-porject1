<template>
  <div class="right">
    <!-- 顶部 -->
    <div class="header">
      <!-- 缩进展开图标 -->
      <div class="icon">
        <i
          v-if="isCollapse"
          class="el-icon-caret-right"
          @click="changeMenu"
        ></i>
        <i v-else class="el-icon-caret-left" @click="changeMenu"></i>
      </div>
      <!-- 右侧内容：时间、登录、语言切换 -->
      <div class="rightText">
        <div class="item">{{ currentTime }}</div>
        <div class="item">
          <el-dropdown @command="changeLang">
            <!-- command	点击菜单项触发的事件回调	dropdown-item 的指令 -->
            <span class="el-dropdown-link">
              语言环境
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- command	指令	string/number/object 类似于id,可以根据item的command判断点的是哪个 -->
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="item">{{ "欢迎" + userInfo.username }}</div>
        <div class="itemIcon">
          <i class="el-icon-switch-button" @click="handleLogout"></i>
        </div>
      </div>
    </div>
    <!-- 下方内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations, mapState } from "vuex";
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
  computed: {
    ...mapState("login", ["userInfo"]), //保存了仓库的用户信息
  },
  methods: {
    // 声明时间格式化函数----------
    moment,
    ...mapMutations("login", ["removeUser"]), // Vuex方法：保存用户信息
    ...mapMutations("menu",["removeMenuList"]), // Vuex方法：清除动态路由数据
    // 点击图标传递数据给父组件layout/index.js----------
    changeMenu() {
      this.$emit("toggleMenu"); // 触发父组件的事件来切换菜单状态
    },
    // 顶部时间--------
    autoTime() {
      this.currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm dddd");
    },
    // 点击下拉菜单改变语言-------
    changeLang(val) {
      console.log("选择语言-----", val);
      this.$i18n.locale = val;
    },
    // 退出登录
    handleLogout() {
      // 逻辑：1.清除仓库中登录的数据 2.清除浏览器仓库中该账号的数据 3.清除仓库里面动态菜单的数据 4.跳转至登录界面 
      this.removeUser();
      // 2.清除浏览器仓库中该账号的数据
      localStorage.removeItem("info");
      // 3.清除仓库里面动态菜单的数据
      this.removeMenuList();
      // 4.跳转至登录界面
      this.$router.push("/login");
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
  z-index: 1000;
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
      .el-dropdown-link {
        color: #fff;
        font-size: 16px;
      }
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
  padding-right: 20px;
  padding-left: 20px;
  background: #f5f5f5;
  flex: 1;
  // height: 638px;
  /* 关键修改：铺满剩余屏幕高度并支持滚动 */
  min-height: calc(
    100vh - 50px
  ); /* 100vh是屏幕高度，减去顶部导航栏的50px + padding-top的15px高度 */
  height: 100%;
  overflow: auto; /* 内容超出时显示滚动条 */
}
</style>