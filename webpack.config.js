const path = require("path");
const webpack = require("webpack");

module.exports = {
 mode: "development",
 entry: {
  app: "./src/app.ts",
  // hot: "webpack/hot/dev-server.js",
  // client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
 },
 devServer: {
  static: "./dist",
  hot: false,
  client: false,
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
 //  plugins: [new webpack.HotModuleReplacementPlugin()],
 output: {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
 },
};
