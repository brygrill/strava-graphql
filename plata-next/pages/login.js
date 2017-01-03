/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import App from '../components/App';

class Login extends Component {
  static async getInitialProps() {
    console.log('login initial props');
    return {};
  }
  constructor(props) {
    super();
    console.log('login constructor');
  }

  render() {
    return (
      <App>
        <h1>login page!</h1>
      </App>
    );
  }
}

export default Login;
