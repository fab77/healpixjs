const path = require('path');

module.exports = [
  'source-map'
].map(devtool => ({
  mode: 'development',
  entry: './src/Healpix.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'healpix.js',
    library: 'healpix',
  },
  devtool,
  optimization: {
    runtimeChunk: true,
    usedExports: true
  }
}));