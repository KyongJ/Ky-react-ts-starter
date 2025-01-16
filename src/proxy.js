const proxySettings = [
  // 接口代理1
  {
    context: ['/api'],
    target: 'https://random.dog',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
  // .....
];

module.exports = proxySettings;
