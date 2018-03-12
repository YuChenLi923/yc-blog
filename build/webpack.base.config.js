const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
      HappyPack = require('happypack'),
      os = require('os'),
      happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}),
      webpack = require('webpack'),
      {
       srcPath,
       outPath,
       entryPath
      } = require('../config/path');
module.exports = {
    entry: {
        "js/pages/index": entryPath
    },
    output:{
        path:outPath,
        filename:"[name].js",
        publicPath: '/',
        chunkFilename:"js/chunks/[name].[chunkhash:5].chunk.js"
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: require('../dist/js/common/manifest.json')
      }),
      new AddAssetHtmlPlugin({
        filepath: require.resolve('../dist/js/common/lib.js'),
        includeSourcemap: false
      }),
      new HappyPack({
        id: 'js',
        cache: true,
        threadPool: happyThreadPool,
        loaders: ['babel-loader', 'json-loader']
      }),
      new HappyPack({
        id: 'styles',
        threadPool: happyThreadPool,
        loaders: [ 'style-loader','css-loader','postcss-loader','sass-loader' ]
      }),
      new HappyPack({
        id: 'image',
        threadPool: happyThreadPool,
        loaders: [ 'url-loader' ]
      })
    ],
    module: {
        rules:[{
            test: /\.(js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [srcPath]
        },{
            test:/\.(png|jpg|gif)$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:1192,
                    name:'imgs/[name][hash:8].[ext]'
                }
            }

        },{
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.json$/,
            use: 'json-loader'
        }]
    }
};
