// @flow
/* global SyntheticEvent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react';

import base from '../rebase';

//import BaseContainer from '../containers/base';
import LoginComponent from '../components/login';

import logo from '../images/logos/logo_sm.png';
import medal from '../images/icons/medal_circle_platagreen.svg';

//import { colors, loginRowStyle, loginColStyle, basePageStyle } from '../css';

class LoginPage extends Component {
  state = {
    error: false,
    loading: false,
  };

  handleLoginError = (err: Object) => {
    if (err) this.setState({ error: true, loading: false });
  };

  handleEmailLogin = (creds: Object) => {
    this.setState({ loading: true });
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
    // auth listener in app.js will handle updating state
    evt.preventDefault();
    base.authWithOAuthRedirect('google', this.handleLoginError);
  };

  render() {
    return (
      <BaseContainer>
        <Grid
          width={16}
          style={basePageStyle}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Row style={loginRowStyle}>
            <Grid.Column floated="right" width={16} style={loginColStyle}>
              <Link to="/">
                <Button floated="right" inverted>
                  <Icon name="home" style={{ opacity: 1 }} />
                  Home
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <div style={{ width: '40rem' }}>
            <LoginComponent
              logo={logo}
              headerImg={medal}
              colWidth="40rem"
              btnColor={colors.primary}
              error={this.state.error}
              loading={this.state.loading}
              loginEmail={this.handleEmailLogin}
              loginGmail={this.handleGoogleLogin}
            />
          </div>
        </Grid>
      </BaseContainer>
    );
  }
}

export default LoginPage;
