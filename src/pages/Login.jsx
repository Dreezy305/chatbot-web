import React, { Component } from "react";
import {
  Container,
  Form,
  FlexboxGrid,
  Panel,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
} from "rsuite";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";

@inject("store")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = props.store.user;
  }

  handleEmail = (email) => {
    this.store.setEmail(email);
  };

  handlePass = (password) => {
    this.store.setPassword(password);
  };

  login = () => {
    const { email, password } = this.store;
    if (!email) {
      this.store.setNotify("Invalid email address!");
    } else if (password.length < 3) {
      this.store.setNotify("Password is too short!");
    } else {
      this.store.setNotify("");
      const data = { email, password };
      this.store.authenticate(data);

      setTimeout(() => {
        if (this.store.success) {
          this.props.history.push("/");
        }
      }, 2000);
    }
  };

  componentDidMount() {
    this.store.setLoading(false);
  }

  render() {
    return (
      <div className="show-fake-browser login-page">
        <Helmet>
          <title>Login - Axis</title>
        </Helmet>
        <Container>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <div className="login">
                <Panel
                  header={<h3 className="center">Axis Solution</h3>}
                  bordered
                >
                  <Form fluid>
                    <p style={{ color: "red", marginBottom: 15 }}>
                      {this.store.notify}
                    </p>

                    <FormGroup>
                      <FormControl
                        name="email"
                        type="email"
                        placeholder="Cars45 Email address"
                        onChange={this.handleEmail}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handlePass}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <ButtonToolbar>
                        <Button
                          size="lg"
                          block
                          color="blue"
                          loading={this.store.loading}
                          onClick={this.login}
                        >
                          Sign in
                        </Button>
                      </ButtonToolbar>
                    </FormGroup>
                  </Form>
                </Panel>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Container>
      </div>
    );
  }
}
