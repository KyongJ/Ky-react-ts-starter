const { merge } = require('webpack-merge');
const paths = require('../paths');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: paths.appBuild,
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    // css额外打包
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css',
      chunkFilename: 'style/[name].[contenthash:8].chunk.css',
    }),
  ],
  // 代码分割，第三方依赖包单独生成chunk
  optimization: {
    minimize: true,
    minimizer: [
      // js代码压缩
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      // css压缩
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
