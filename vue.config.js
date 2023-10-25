const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    port: '8089', // 设置端口号
    proxy: {
        '/api': {
          target: 'https://smms.app', //API服务器的地址
          ws: true, //代理websockets
          changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        },
        '/v1': {
          target: 'http://localhost:8087', //后台服务器的地址
          ws: true, //代理websockets
          changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        }
    }
}
});
