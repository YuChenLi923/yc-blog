const webpack = require('webpack');
const path = require('path');
const outputPath = path.join(__dirname, '../dll');
const fileName = '[name].js';
const libs = [
  'react',
  'react-dom',
  'react-router',
  'redux-thunk',
  'immutable',
  'react-redux'
];

const plugin = [
  new webpack.DllPlugin({
    path: path.join(outputPath, 'manifest.json'),
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
];
plugin.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
);
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    lib: libs
  },
  output: {
    path: outputPath,
    filename: fileName,
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    minimize: true
  },
  plugins: plugin
};
