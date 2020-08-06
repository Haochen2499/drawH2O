const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9527",
        changeOrigin: true
      }
    },
    port: 8888
  },
  productionSourceMap: true,
  lintOnSave: false,
  configureWebpack: {
    devtool: "source-map",
    plugins: [new CompressionPlugin()]
  },
  chainWebpack: config => {
    config.devtool("cheap-source-map");
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@components", resolve("./src/components"))
      .set("@views", resolve("src/views"))
      .set("@utils", resolve("src/utils"))
      .set("@assets", resolve("src/assets"));
    //set第一个参数：设置的别名，第二个参数：设置的路径

    config.plugin("Quill").use(webpack.ProvidePlugin, [
      {
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      }
    ]);
  }
};
