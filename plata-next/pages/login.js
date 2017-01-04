/* eslint-disable react/prefer-stateless-function */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import App from '../components/App';
import Login from '../components/Login';

class LoginPage extends Component {
  static async getInitialProps() {
    return {};
  }

  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.emailInput = this.emailInput.bind(this);
    this.pwInput = this.pwInput.bind(this);
  }

  onLoginSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
  }

  render() {
    return (
      <App pgTitle="Login">
        <Login
          title="Log-in to your Dashboard"
          emailRef={this.emailInput}
          pwRef={this.pwInput}
          handleSubmit={this.onLoginSubmit}
        />
      </App>
    );
  }
}

export default LoginPage;
