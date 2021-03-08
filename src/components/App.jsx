import React, { Component } from "react";
import { observer, Provider } from "mobx-react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import Routes from "./Route";
import store from "../stores/";

@observer
export default class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    );
  }
}
