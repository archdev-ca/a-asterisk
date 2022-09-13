const path = require("path");

module.exports = {
 mode: "development",
 entry: "./src/app.ts",
 output: {
  filename: "app.js",
  path: path.resolve(__dirname, "dist"),
 },
 module: {
  rules: [
   { test: /\.ts$/, use: "ts-loader" },
   { test: /\.scss$/, use: "sass-loader" },
  ],
 },
};
