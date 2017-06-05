"use strict"

const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: [
    "./web/static/js/polyfills/array.find",
    "./web/static/js/polyfills/array.find_index",
    "./web/static/css/app.css",
    "./web/static/js/app.js"
  ],
  output: {
    path: `${__dirname}/priv/static`,
    filename: "js/app.js",
  },
  resolve: {
    modules: ["node_modules", __dirname + "/web/static/js"],
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: "babel-loader",
        query: {
          cacheDirectory: true
        },
      }],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            camelCase: "only",
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]__[local]___[hash:base64:5]",
          }
        }]
      }),
    }]
  },
  devtool: "eval",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: `"production"`,
      }
    }),
    new ExtractTextPlugin({ filename: "css/app.css" }),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }]),
  ]
}
