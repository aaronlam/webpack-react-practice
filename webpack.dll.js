const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    vendors: ["react", "react-dom"], // 手动指定打包哪些库
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].[hash:8].dll.js",
    library: "[name]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, "./dll/[name].manifest.json"), // 生成对应的manifest.sjon，给webpack打包用
      name: "[name]",
    }),
  ],
};
