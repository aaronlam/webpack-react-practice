const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const devConfig = {
  entry: {
    main: ["@babel/polyfill", "react-hot-loader/patch", "./src/index.js"],
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    port: 9001,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
};

module.exports = merge(baseConfig, devConfig);
