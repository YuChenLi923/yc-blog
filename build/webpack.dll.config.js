const webpack = require('webpack');
const path = require('path');
const outputPath = path.join(__dirname, '../dll');
const fileName = '[name].dll.js';
const libs = [
  'react',
  'react-dom',
  'react-router',
  'redux-thunk',
  'immutable',
  'react-redux'
];
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    vendor: libs
  },
  output: {
    path: outputPath,
    filename: fileName,
    library: '[name]_library'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(outputPath, '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
