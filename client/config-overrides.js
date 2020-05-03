const {
  override,
  addWebpackPlugin,
  fixBabelImports,
} = require("customize-cra");

const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = override(
  fixBabelImports("antd", {
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
