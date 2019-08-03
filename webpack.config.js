var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/init.js','./src/css_import.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [     
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { 
        test: /\.less$/,
        use: [ 
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'less-loader'
        ],
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin()
  ]
}


