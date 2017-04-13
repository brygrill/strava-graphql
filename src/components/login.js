import React, { Component } from 'react';
import { Segment, Header, Form, Message } from 'semantic-ui-react';

class LoginComponent extends Component {
  state = {
    email: '',
    pwd: '',
  };

  props: {
    login: Function,
    error: boolean,
  };

  updateField = evt => {
    const target = evt.target;
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.login(this.state);
    this.setState({
      email: '',
      pwd: '',
    });
  };

  render() {
    return (
      <div>
        <Segment padded="very">
          <Header
            as="h2"
            textAlign="center"
            icon="trophy"
            content="Team Manager Login"
          />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                label="Email"
                type="email"
                name="email"
                width={12}
                value={this.state.email}
                onChange={this.updateField}
              />
              <Form.Input
                label="Password"
                type="password"
                name="pwd"
                width={12}
                value={this.state.pwd}
                onChange={this.updateField}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
          <Message
            hidden={!this.props.error}
            error
            header="Login Error"
            content="Please enter valid credentials."
          />
        </Segment>
      </div>
    );
  }
}

export default LoginComponent;
