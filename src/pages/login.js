// @flow
/* global SyntheticEvent */
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import base from '../rebase';

import ContainerComponent from '../components/container';
import LoginComponent from '../components/login';

import logo from '../images/logo_sm.png';

import { colors } from '../css';

class LoginPage extends Component {
  state = {
    error: false,
  };

  handleLoginError = (err: Object) => {
    if (err) this.setState({ error: true });
  };

  handleEmailLogin = (creds: Object) => {
    base.authWithPassword(
      {
        email: creds.email,
        password: creds.password,
      },
      this.handleLoginError,
    );
  };

  handleGoogleLogin = (evt: SyntheticEvent) => {
    // if auth is successful...
    // auth listener in app.jswill handle updating state
    evt.preventDefault();
    base.authWithOAuthRedirect('google', this.handleLoginError);
  };

  render() {
    return (
      <ContainerComponent>
        <MediaQuery maxDeviceWidth={1224}>
          {matches => {
            return (
              <LoginComponent
                logo={logo}
                mobile={matches}
                colWidth="500px"
                error={this.state.error}
                btnColor={colors.primary}
                loginEmail={this.handleEmailLogin}
                loginGmail={this.handleGoogleLogin}
              />
            );
          }}
        </MediaQuery>
      </ContainerComponent>
    );
  }
}

export default LoginPage;
