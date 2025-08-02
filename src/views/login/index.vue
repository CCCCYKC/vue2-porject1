<template>
  <div class="login">
    <div class="page">
      <div class="item">
        <h2>生鲜后台管理系统登录页</h2>
      </div>
      <div class="item">
        <span>账号：</span>
        <el-input placeholder="请输入账号" v-model="input.username"></el-input>
      </div>
      <div class="item">
        <span>密码：</span>
        <el-input
          placeholder="请输入密码"
          v-model="input.password"
          show-password
        ></el-input>
      </div>
      <div class="item">
        <el-button class="btn" type="primary" @click="handelLogin"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      input: {
        //输入框获取账号密码
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 登录按钮-----------
    handelLogin() {
      // 逻辑：1.获取用户输入的内容 2.请求接口 3. 请求成功---存储登录数据--进入首页
      if (this.input.username === "" || this.input.password === "") {
        this.$message.error("输入账号密码后才能登录！");
        return;
      } else {
        this.login(this.input.username, this.input.password);
        console.log(this.input.username, this.input.password)
      }
    },
    // 登录请求
    async login(params) {
      let res = await this.$api.login(params);
      console.log("登录请求接口", res.data);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: #eee;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .page {
    background: #fff;
    width: 500px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .item {
      width: 330px;
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      h2 {
        margin-bottom: 20px;
      }
      span {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
      }
      .btn {
        width: 330px;
      }
    }
  }
}
</style>