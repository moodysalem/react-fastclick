const path = require('path');

module.exports = {
  entry: "./index.jsx",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "react-fastclick-alt.js",
    library: "ReactFastClick",
    libraryTarget: "umd"
  },

  externals: {
    'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};