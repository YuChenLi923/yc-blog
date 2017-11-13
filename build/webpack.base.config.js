const webpack = require('webpack'),
     {
       srcPath,
       outPath,
       entryPath
     } = require('../config/path');
module.exports = {
    entry: {
        "js/pages/index": entryPath,
        "vender": ['react','react-dom','classnames','immutable']
    },
    output:{
        path:outPath,
        filename:"[name].js",
        publicPath: '/',
        chunkFilename:"js/chunks/[name].[chunkhash:5].chunk.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender'],
            filename:"js/public/vender.js"
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
