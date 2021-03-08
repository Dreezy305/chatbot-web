import React, { Component } from "react";
import {
  Container,
  Header,
  Navbar,
  Dropdown,
  Nav,
  Content,
  Footer,
  Icon,
} from "rsuite";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.store = props.store.user;
  }

  render() {
    return (
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a className="navbar-brand logo">Axis Solution</a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
    );
  }
}
