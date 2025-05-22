const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/public/service-worker.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};