const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["happypack/loader?id=happyBabel"],
        include: path.resolve(__dirname, "./src"),
        exclude: path.resolve(__dirname, "./node_modules"),
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash:8]",
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./public"),
        to: path.resolve(__dirname, "./dist"),
      },
    ]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js"),
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json"),
    }),
    new HappyPack({
      id: "happyBabel",
      loaders: ["cache-loader", "babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".jsx", ".js"],
  },
};
