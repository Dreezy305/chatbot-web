import React, { Component } from "react";
import { Container, Content, Footer, Icon } from "rsuite";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

@inject("store")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = props.store.user;
  }

  render() {
    return (
      <div className="show-fake-browser navbar-page">
        <Container>
          <Header />

          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Container>
      </div>
    );
  }
}
