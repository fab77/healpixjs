const path = require('path');

// module.exports = [
//   'source-map'
// ].map(devtool => ({
//   mode: 'development',
//   entry: './src/Healpix.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     // filename: 'healpix.js',
//     library: 'healpix',
//   },
//   devtool,
//   optimization: {
//     runtimeChunk: true,
//     usedExports: true
//   }
// }));


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    healpixjs: './src/Healpix.js',
  },
  output: {
      filename: '[name].js',
      path: __dirname + '/dist',
  },
  module: {
      rules: [
          {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env'],
                      plugins: ["@babel/plugin-proposal-private-methods", "@babel/plugin-proposal-class-properties"]
                  }
              }
          }
      ]
  },
  optimization: {
      runtimeChunk: true,
      usedExports: true
  },
  plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin()
  ],
};