"use strict";

process.env.BABEL_ENV = "main";

const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
const { dependencies } = require("../package.json");
const webpack = require("webpack");

const MinifyPlugin = require("babel-minify-webpack-plugin");

let mainConfig = {
  entry: {
    main: path.join(__dirname, "../src/main/index.js"),
  },
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          options: {
            formatter: require("eslint-friendly-formatter"),
          },
        },
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
  node: {
    __dirname: process.env.NODE_ENV !== "production",
    __filename: process.env.NODE_ENV !== "production",
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "../dist/electron"),
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    alias: {
      "@": resolve("../src/renderer"),
      assets: resolve("../src/renderer/assets"),
      views: resolve("../src/renderer/views"),
      components: resolve("../src/renderer/components"),
      utils: resolve("../src/renderer/utils"),
      api: resolve("../src/renderer/api"),
      store: resolve("../src/renderer/store"),
      router: resolve("../src/renderer/router"),
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: [".js", ".json", ".node"],
  },
  target: "electron-main",
};

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`,
    })
  );
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
  mainConfig.plugins.push(
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    })
  );
}

module.exports = mainConfig;
