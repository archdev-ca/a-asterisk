const path = require("path");
const webpack = require("webpack");

module.exports = {
 mode: "development",
 entry: {
  app: "./src/app.ts",
 },
 devServer: {
  static: "./dist",
  hot: true,
 },
 module: {
  rules: [
   { test: /\.ts$/, use: "ts-loader" },
   {
    test: /\.css$/,
    use: [
     { loader: "style-loader" },
     { loader: "css-loader" },
     {
      loader: "postcss-loader",
      options: {
       sourceMap: true,
       postcssOptions: {
        config: "postcss.config.js",
       },
      },
     },
    ],
   },
  ],
 },
 output: {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
 },
};
