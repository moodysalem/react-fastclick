const webpack = require('webpack');

module.exports = {
  entry: "./index.jsx",

  output: {
    path: "./dist",
    filename: "react-fastclick-alt.js",
    library: "ReactFastClick",
    libraryTarget: "umd"
  },

  externals: {
    'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};