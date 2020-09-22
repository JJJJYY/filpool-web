// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devServer: {
    proxy: {
      // '/api/v1': {
      //   target:'https://www.filpool.io/',
      //   // target: 'http://47.57.10.160/api/v1/',
      //   changeOrigin: true
      // },
      '^/(auth|message|purchase|asset|distribution|general|base|setting)': {
        // target: 'http://192.168.1.22:9001/',
        target: 'https://www.filpool.io/',
        changeOrigin: true
      },
      '/public': {
        // target: 'http://localhost:8080/filpool',
        target: 'http://testapi.filpool.c28e9d7b637474c3a98b2ed559c29434c.cn-hongkong.alicontainer.com/', // 测试环境
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    externals: {},
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  }
}