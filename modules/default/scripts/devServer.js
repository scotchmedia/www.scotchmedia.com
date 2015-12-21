var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var exec = require('child_process').exec;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: config.output.publicPath
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Webpack Hot Middleware Listening at http://localhost:3000');
});

var ae = exec('dev_appserver.py . --storage_path=./.tmp/ ' +
                                ' --host=0.0.0.0 '
              );

ae.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});

ae.stderr.on('data', function(data) {
  // Remove last char if it's a newline (\n)
  if (data[data.length - 1] === '\n') {
    data = data.substring(0, data.length - 1);
  }
  console.log(data);
});

ae.on('close', function(code) {
  console.log('child process exited with code ' + code);
});
