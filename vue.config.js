// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devServer: {
    proxy: {
      '/api/v1': {
        target:'https://www.filpool.io/',
        // target: 'http://47.57.10.160/api/v1/',
        changeOrigin: true
      },
      '^/(auth|message|purchase|asset|distribution|general|base|setting)': {
        // target: 'http://192.168.1.22:9001/',
        target: 'https://www.filpool.io/',
        changeOrigin: true
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
