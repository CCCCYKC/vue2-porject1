<template>
  <div class="drawer">
    <el-drawer
      title="订单详情"
      direction="rtl"
      :visible="drawer"
      :before-close="handleClose"
      :size="size"
    >
      <span>{{ drawerData.code }}</span>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "drawerComponent",
  props: {
    drawerData: {
      type: Object,
      default: () => ({
        code: "",
        ordername: "",
        company: "",
        phone: "",
        yudingTime: "",
        price: "",
        huizongStatus: "",
      }),
    },
  },
  data() {
    return {
      drawer: false, // 是否打开抽屉
      size: "85%", // 抽屉的宽度
      menu: 200, //menu的默认宽度
      width: 1800, //浏览器屏幕的宽度
    };
  },
  methods: {
    // 关闭抽屉--------
    handleClose() {
      this.drawer = false; // 关闭抽屉
      console.log("isCollapse", this.isCollapse);
      console.log("menu width", this.menu);
    },
  },

  computed: {
    ...mapState(["isCollapse"]), // 从 Vuex 中获取 isCollapse 状态
  },
  watch: {
    // 监听menu的折叠状态并计算抽屉的宽度
    isCollapse(val) {
      console.log("是否折叠", val);
      val ? (this.menu = 64) : (this.menu = 200); // 折叠时宽度为64px，否则为200px
      this.size = this.width - this.menu + "px"; // 设置抽屉的宽度
    },
    // // 监听浏览器宽度变化
    // width(val) {
    //   console.log("浏览器", val);
    //   this.width = val; // 设置抽屉的宽度
    //   this.size = this.width - this.menu + "px"; // 更新抽屉的宽度
    // },
  },
  mounted() {
    // console.log("是否折叠", this.isCollapse);
    let width = document.documentElement.clientWidth; // 获取浏览器屏幕的宽度
    this.size = width - this.menu + "px"; // 设置抽屉的宽度
    this.width = width; // 保存浏览器宽度
  },
};
</script>

<style>
</style>