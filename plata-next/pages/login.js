/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Router from 'next/router';
import { login, currentUser } from '../firebase/auth';
import App from '../components/App';
import Login from '../components/Login';

class LoginPage extends Component {
  static async getInitialProps() {
    console.log(currentUser);
    return { currentUser };
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
    login(this.state.email, this.state.pwd)
      .then(() => {
        this.setState({ email: '', pwd: '' });
        Router.push('/dashboard');
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          console.log('wrong pwd');
        }
      });
  }

  render() {
    // If already authed,
    // send directly to dashboard
    if (this.props.currentUser) {
      return Router.push('/dashboard');
    }
    return (
      <App pgTitle="Login">
        <Login
          title="Log-in to your Dashboard"
          colWidth="500px"
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

LoginPage.propTypes = {
  currentUser: PropTypes.shape,
};

export default LoginPage;
