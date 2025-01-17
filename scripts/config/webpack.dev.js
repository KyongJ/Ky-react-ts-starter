const { merge } = require('webpack-merge');
const webpack = require('webpack');
const paths = require('../paths');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../conf.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild,
  },
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    client: {
      // 控制日志输出格式
      logging: 'info', // 选择 'none', 'error', 'warn', 'info', 'log', 或 'verbose'
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    proxy: [...require(paths.appProxySetup)],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
