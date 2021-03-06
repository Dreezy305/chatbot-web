import React, { Component } from "react";
import { Container, FlexboxGrid, Button } from "rsuite";
import { Helmet } from "react-helmet";

export default class NotFound extends Component {
  render() {
    return (
      <div className="show-fake-browser login-page">
        <Helmet>
          <title>Login - Axis solution</title>
        </Helmet>
        <div style={{ textAlign: "center", padding: 10 }}>
          <br />
          <br />
          <br />
          <br />
          <h3>Oops ! Page you are looking for doesn't exists or deleted.</h3>
          <br />
          <br />
          <br />
          <br />
          <Button size="lg" color="blue" href="/">
            &larr; Go back home
          </Button>
        </div>
      </div>
    );
  }
}
