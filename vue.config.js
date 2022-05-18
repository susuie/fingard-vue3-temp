const production = process.env.NODE_ENV === 'production';
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    proxy: {
      '^/api/AUTHCORE': {
        target: 'http://chili-test.fingard.cn'
        //target: 'http://172.18.12.96:8666'
        //changeOrigin: true
      },
      '^/api/BIZCORE': {
        //target: 'http://chili-test.fingard.cn'
        target: 'http://gateway.rh-chili-test.rhk8s.fingard.cn'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: '@',
        components: '@/components'
      }
    },
    devtool: production ? 'none' : 'cheap-module-eval-source-map',
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
      }),
      new uglify({ include: /\/src/, parallel: true })
    ]
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true
  }
};
