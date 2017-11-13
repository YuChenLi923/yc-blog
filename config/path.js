const path = require('path'),
      rootPath = path.resolve(__dirname, '../'),
      srcPath = path.resolve(rootPath, './src'),
      outPath = path.resolve(rootPath,'./dist'),
      entryPath = path.resolve(rootPath,'./src/main');
module.exports = {
  rootPath,
  srcPath,
  outPath,
  entryPath
}
