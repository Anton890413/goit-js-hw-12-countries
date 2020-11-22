const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MiniCssExtractPlugin(),
  ],
  
    devServer: {
    //contentBase: path.join(__dirname, 'dist'),
    //compress: true,
    port: 9000
  },
     
};