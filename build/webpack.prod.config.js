const  webpack = require('webpack'),
      { outPath, rootPath } = require('../config/path'),
      UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
      merge = require('webpack-merge'),
      AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpackBaseConfig = require('./webpack.base.config'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          },
          output:{
            comments:false
          }
        },
        parallel: true
      })
    ]
  },
  plugins: [
      new CleanWebpackPlugin([outPath], {
        root:  rootPath
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new MiniCssExtractPlugin({
          filename:'css/[contenthash].css'
      }),
      new HtmlWebpackPlugin({
          title:'宇宸的博客',
          filename:'./index.html',
          template:'./src/views/template1.html',
          inject:true,
          hash:true,
          chunks:['js/pages/index'],
          minify:{
              removeComments:true,
              collapseWhitespace:true
          }
      }),
      new AddAssetHtmlPlugin({
        filepath: require.resolve('../dll/lib.js'),
        outputPath: '../dist/js/common',
        publicPath: '/js/common',
        includeSourcemap: false
      })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
