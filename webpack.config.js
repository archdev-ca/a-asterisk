const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
 plugins: [
  new HtmlWebpackPlugin({
   template: "src/index.html",
  }),
 ],
 output: {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
  clean: true,
 },
};
