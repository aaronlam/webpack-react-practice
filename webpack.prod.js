const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const BundleAnalyzerWebpackPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 单独提取css文件
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2, // 这里的importLoaders: 2 是在css-loader 之后指定2个数量的loader（即 postcss-loader）来处理import进来的资源
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js"), // 把dll.js加进index.html里，并且拷贝文件到dist目录
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json"), // 读取dll打包后的manifest.json，分析需要跳过哪些库代码
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
    new ManifestPlugin(), // 在某些情况，index.html模板由后端渲染，那么我们就需要一份打包清单，知道打包后的文件对应的真正路径
  ],
};

// 判断环境变量，是否开启分析报告
if (process.env.npm_config_report) {
  prodConfig.plugins.push(new BundleAnalyzerWebpackPlugin());
}

module.exports = merge(baseConfig, prodConfig);
