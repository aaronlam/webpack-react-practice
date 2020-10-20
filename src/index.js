import React, { Component } from "react";
import ReactDom from "react-dom";
import App from "./App";

ReactDom.render(<App />, document.getElementById("app"));

// webpack热模块替换
if (module.hot) {
  // 接受更新
  module.hot.accept("./App.js", function () {
    // 重新render
    const NextApp = require("./App");
    ReactDom.render(<NextApp />, document.getElementById("app"));
  });
}

// if (module.hot) {
//   module.hot.accept();
// }