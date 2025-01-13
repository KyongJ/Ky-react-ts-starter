const paths = require('../paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { isDevelopment, isProduction } = require('../env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: paths.appIndex,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': paths.appSrc,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'style/[name].[contenthash:8].css',
        chunkFilename: 'style/[name].[contenthash:8].chunk.css',
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          // 如果文件大小小于 8kb，那么会转换为 data URI，否则为单独文件。
          // 8kb 是默认值，你可以根据需要进行调整
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
};
