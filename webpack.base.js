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
          "happypack/loader?id=happyBabel",
          // 也可以使用下面这种对象形式加载happypack
          // {
          //   loader: 'happypack/loader',
          //   options: {
          //     id: "happyBabel",
          //   },
          // },
        ],
        include: path.resolve(__dirname, "./src"), // 只对src目录中的文件采用该loader配置
        exclude: path.resolve(__dirname, "./node_modules"), // 排除node_modules目录下的文件采用该loader配置
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
      loaders: ["cache-loader", "babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new CleanWebpackPlugin(), // 生成前先清除dist目录
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")], // 用于配置webpack去哪些目录下寻找第三方模块，默认是['node_modules']，但是他会先于当前目录的./node_modules去查找，发现不存在，再递归向上查找
    extensions: [".jsx", ".js"], // 在导入没有带文件后缀时，webpack会自动带上后缀去尝试文件是否存在，而这里用于用于配置所尝试的后缀列表
  },
};
