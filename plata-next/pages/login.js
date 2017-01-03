/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import App from '../components/App';
import Login from '../components/Login';

class LoginPage extends Component {
  static async getInitialProps() {
    console.log('login initial props');
    return {};
  }
  constructor() {
    super();
    console.log('login constructor');
  }

  render() {
    return (
      <App pgTitle="Login">
        <Login />
      </App>
    );
  }
}

export default LoginPage;
