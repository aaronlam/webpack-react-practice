const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    vendors: ["react", "react-dom"], // 手动指定打包哪些库为一个DLL
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].[hash:8].dll.js",
    library: "[name]", // 存放动态链接库的全局变量名
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, "./dll/[name].manifest.json"), // 生成对应的manifest.sjon，给webpack打包用
      name: "[name]", // 需要与动态链接库的全局变量名保持一致
    }),
  ],
};
