var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    site: './client/site',
  },
  output: {
    path: path.join(__dirname, '../static/prod/'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/prod/',
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      // __CLIENT__: true,
      // __SERVER__: false,
      // __DEV__: false,
      // __DEVTOOLS__: false,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
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
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader'),
      },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!stylus-loader'),
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
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file' },
    ],
  },
};
