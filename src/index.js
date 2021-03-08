import "rsuite/dist/styles/rsuite-default.css";
import "./styles/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
