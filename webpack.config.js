const path = require("path");
const autoprefixer = require("autoprefixer");
module.exports = {
 mode: "development",
 entry: "./src/app.ts",
 output: {
  filename: "app.js",
  path: path.resolve(__dirname, "dist/js"),
 },
 module: {
  rules: [
   { test: /\.ts$/, use: "ts-loader" },
   {
    test: /\.scss$/,
    use: [
     { loader: "style-loader" },
     {
      loader: "css-loader",
      options: {
       sourceMap: true,
       modules: {
        localIdentName: "[local]_[hash:base64:5]",
       },
      },
     },
     {
      loader: "postcss-loader",
      options: {
       sourceMap: true,
       postcssOptions: {
        config: "postcss.config.js",
       },
      },
     },
     {
      loader: "sass-loader",
      options: { sourceMap: true },
     },
    ],
   },
  ],
 },
};
