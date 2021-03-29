const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 9090,
  },
  chainWebpack: (config) => {
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img', resolve('src/assets/img'));
  },

  css: {
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 把px单位换算成rem单位
            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
            propList: ['*'],
          }),
        ],
      },
    },
  },
};
