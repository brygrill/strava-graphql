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

  handleEmailLogin = (creds: Object) => {
    console.log(creds);
    /*    login(creds)
      .then(() => {
        this.setState({ error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });*/
  };

  handleGoogleLoginError = (err: Object) => {
    if (err) this.setState({ error: true });
  };

  handleGoogleLogin = (evt: SyntheticEvent) => {
    evt.preventDefault();
    base.authWithOAuthRedirect('google', this.handleGoogleLoginError);
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
