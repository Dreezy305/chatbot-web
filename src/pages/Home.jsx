import React, { Component } from "react";

export default class Home extends Component {
  componentDidMount() {
    if (!localStorage.getItem("_aut")) {
      window.location.href = "/login";
    } else if (localStorage.getItem("_role") === "Requester") {
      window.location.href = "/my-request";
    }
  }
  render() {
    return <></>;
  }
}
