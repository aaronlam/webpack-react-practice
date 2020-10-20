const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "cache-loader",
          "happypack/loader?id=happyBabel",
          // 也可以使用下面这种对象形式加载happypack
          // {
          //   loader: 'happypack/loader',
          //   options: {
          //     id: "happyBabel",
          //   },
          // },
        ],
        exclude: /node_modules/,
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
    new HappyPack({
      id: "happyBabel",
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true",
        },
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
  ],
};
