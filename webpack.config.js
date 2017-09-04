var webpack = require('webpack');

module.exports = {
  entry: './src/content_script.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'dist/content_script.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      sourceMap: true
    })
  ]
};
