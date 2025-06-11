const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: 'css/bootstrap.min.css'
        },
        { 
          from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          to: 'js/bootstrap.bundle.min.js'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}; 