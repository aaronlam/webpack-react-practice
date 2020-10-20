import React, { Component } from "react";
import ReactDom from "react-dom";
import App from "./App";

// webpack热模块替换设置
if (module.hot) {
  module.hot.accept();
}

class Index extends Component {
  render() {
    return <App />;
  }
}

ReactDom.render(<Index />, document.getElementById("app"));
