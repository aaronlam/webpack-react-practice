const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const BundleAnalyzerWebpackPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const prodConfig = {
  entry: {
    main: ["@babel/polyfill", "./src/index.js"],
  },
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
    new ManifestPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: ".cache/",
        uglifyJS: {
          output: {
            comments: false,
            beautify: false,
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
          },
        },
      }),
    ],
  },
};

// 判断环境变量，是否开启分析报告
if (process.env.npm_config_report) {
  prodConfig.plugins.push(new BundleAnalyzerWebpackPlugin());
}

module.exports = merge(baseConfig, prodConfig);
