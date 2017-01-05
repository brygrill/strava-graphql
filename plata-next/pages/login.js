/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Router from 'next/router';
import App from '../components/App';
import Login from '../components/Login';

class LoginPage extends Component {
  static async getInitialProps() {
    return {};
  }

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
    this.setState({ email: '', pwd: '' });
    Router.push('/dashboard');
  }

  render() {
    return (
      <App pgTitle="Login">
        <Login
          title="Log-in to your Dashboard"
          emailVal={this.state.email}
          emailChange={this.onEmailChange}
          pwdVal={this.state.pwd}
          pwdChange={this.onPwdChange}
          handleSubmit={this.onFormSubmit}
        />
      </App>
    );
  }
}

export default LoginPage;
