const path = require("path");

module.exports = {
 mode: "development",
 entry: "./src/app.ts",
 devServer: {
  static: "./dist",
  webSocketServer: false,
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
  filename: "app.js",
  path: path.resolve(__dirname, "dist/js"),
 },
};
