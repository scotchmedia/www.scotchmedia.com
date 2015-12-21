var webpack = require('webpack');
var config = require('./webpack.config.prod');


webpack(config, function (err, stats) {
  console.log('stats: ', stats);
  if (err) {
    console.log('//// ERR ////\n', err);
  }
});
