var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  // devtool: 'cheap-module-eval-source-map',
  entry: {
    site: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './client/site'
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js',
    filename: '[name].js',
    publicPath: 'http://localhost:3000/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
      __DEVTOOLS__: true
    }),
  ],
  resolve: {
    fallback: [path.join(__dirname, '../node_modules')],
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  resolveLoader: {
    root: [path.join(__dirname, '../node_modules')],
  },
  module: {
    noParse: /autoit\.js$/,
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'stylus-loader']
      },
      { test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
      },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules\/(?!chords).*/,
        query: {
          cacheDirectory: true,
          // This can't be loaded through .babelrc for some reason.
          plugins: ['transform-decorators-legacy', path.join(__dirname, './babelRelayPlugin')],
          // plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0']
        },
        // include: [
        //   path.join(__dirname, '../client'),
        //   path.join(__dirname, '../node_modules/chords'),
        // ],
      },
    ]
  }
};
