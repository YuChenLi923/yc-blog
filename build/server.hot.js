const webpack = require('webpack'),
  express = require('express'),
  opn = require('opn'),
  config = require('./webpack.dev.config'),
  app = express(),
  compiler = webpack(config),
  path = require('path'),
  url = 'http://localhost:8080',
  devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats: {
      colors: true
    }
  });
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('src/assets'));

devMiddleware.waitUntilValid(() => {
  opn(url);
});
app.listen(8080, function () {
  console.log('正常打开8080端口');
});
