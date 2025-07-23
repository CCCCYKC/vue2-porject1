const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置跨域端口
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7788', // 目标服务器地址 请求的后台接口
        ws: true, // 是否开启websocket
        changeOrigin: true, // 是否允许跨域
        pathRewrite: { // 重写路径，将/api前缀去掉
          '^/api': ''
        } 
      },
    }
  }
})
