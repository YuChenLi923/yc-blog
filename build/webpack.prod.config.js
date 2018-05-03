const webpack = require('webpack'),
      os = require('os'),
      { rootPath, outPath } = require('../config/path'),
      merge = require('webpack-merge'),
      AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpackBaseConfig = require('./webpack.base.config'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');
// 设置编译好了的css文件路径

function setCSS(getPath){
    return getPath('css/[name].[md5:contenthash:hex:20].css').replace('css/js/pages', 'css');
}

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [
      new webpack.LoaderOptionsPlugin({ // 压缩css文件
          minimize: true,
          options: {}
      }),
      new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
      }),
      new ExtractTextPlugin({
          filename:setCSS
      }),
      new HtmlWebpackPlugin({
          title:'宇宸的博客',
          filename:'./index.html',    //生成的html存放路径，相对于 path
          template:'./src/views/template1.html',    //html模板路径
          inject:true,    //允许插件修改哪些内容，包括head与body
          hash:true,    //为静态资源生成hash值
          chunks:['js/pages/index'],
          minify:{    //压缩HTML文件
              removeComments:true,    //移除HTML中的注释
              collapseWhitespace:true    //删除空白符与换行符
          }
      }),
      new AddAssetHtmlPlugin({
        filepath: require.resolve('../dll/lib.js'),
        outputPath: '../dist/js/common',
        publicPath: '/js/common',
        includeSourcemap: false
      }),
      new CleanWebpackPlugin([outPath])
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader','postcss-loader','sass-loader']
        })
      }
    ]
  }
});
