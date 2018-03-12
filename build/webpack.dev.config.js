const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  webpackBaseConfig = require('./webpack.base.config'),
  entry = webpackBaseConfig.entry;
Object.keys(entry).forEach((chunk) => {
    if (chunk !== 'vender') {
        entry[chunk] = [ entry[chunk], 'webpack-hot-middleware/client', 'webpack/hot/dev-server'];
    }
});
webpackBaseConfig.entry = entry;
module.exports = merge(webpackBaseConfig, {
    devtool:'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'HOT_ENV':true
            }
        }),
        new HtmlWebpackPlugin({
            title:'宇宸的博客',
            filename:'./index.html',    //生成的html存放路径，相对于 path
            template:'./src/views/template1.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            chunks:['js/pages/index', 'webpack']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:['style-loader','css-loader','postcss-loader','sass-loader']
      }
    ]
  }
});
