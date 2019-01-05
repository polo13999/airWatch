const withPlugins = require("next-compose-plugins");

const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");

const fs = require("fs");
const path = require("path");
const withCss = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
  /*eslint-disable */
  require.extensions[".less"] = file => {};
}

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
);

module.exports = withPlugins([
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
      }
    }
  ],
  [withCss]
]);
