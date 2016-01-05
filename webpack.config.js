var webpack = require('webpack');
var min = process && process.env && process.env.ENVIRONMENT === 'PRODUCTION';

module.exports = {
  entry: "./index.js",

  output: {
    path: "./dist",
    filename: "react-fastclick-alt" + (min ? '.min' : '') + '.js',
    library: "ReactFastClick",
    libraryTarget: "umd"
  },

  externals: {
    'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
    'underscore': { commonjs: 'underscore', commonjs2: 'underscore', amd: 'underscore', root: '_' }
  },

  plugins: min ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};