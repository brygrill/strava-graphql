import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Login extends Component {
  constructor() {
    super();
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPwdChange = this.onPwdChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      email: '',
      pwd: '',
    };
  }

  onEmailChange(evt, val) {
    this.setState({ email: val.value });
  }

  onPwdChange(evt, val) {
    this.setState({ pwd: val.value });
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Email:"
            placeholder="email"
            name="email"
            required
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <Form.Input
            label="Password:"
            placeholder="password"
            name="password"
            type="password"
            required
            value={this.state.pwd}
            onChange={this.onPwdChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default Login;
