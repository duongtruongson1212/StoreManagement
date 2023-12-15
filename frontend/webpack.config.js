const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  mode: "development",
  devtool: "eval", 
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
    publicPath: '/',
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  stats: {
    warnings: true,
    errors: true
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: path.resolve(__dirname, '.env.example'),
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html", // to import index.html file inside index.js
      publicPath: '/',
      // favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json"
    }),
    new FriendlyErrorsWebpackPlugin({
      // Tùy chọn cấu hình
      compilationSuccessInfo: {
        messages: ['Build thành công'],
        notes: ['Một số ghi chú: ']
      },
      onWarnings: function (warnings) {
        for (let i = 0; i < warnings.length; i++) {
          console.warn('Cảnh báo số ' + (i + 1) + ': ' + warnings[i]);
        }
      },
      title: 'Cảnh báo từ Webpack'
    })
  ],
  devServer: {
    magicHtml: true,
    host: '0.0.0.0',
    port: process.env.REACT_PORT,
    allowedHosts: ['all'],
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/public')
    },
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BE_URL,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
