const { merge } = require('webpack-merge');
const paths = require('../paths');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: paths.appBuild,
  },
  devtool: false,
  plugins: [new CleanWebpackPlugin()],
});
