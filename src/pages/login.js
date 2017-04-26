// @flow
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import ContainerComponent from '../components/container';
import LoginComponent from '../components/login';
import logo from '../images/logo_sm.png';
//import { auth, login } from '../firebase/init/auth';

import { colors } from '../css';

class LoginPage extends Component {
  state = {
    error: false,
  };

  submitCredentials = (creds: Object) => {
    console.log(creds);
    /*    login(creds)
      .then(() => {
        this.setState({ error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });*/
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
                login={this.submitCredentials}
                error={this.state.error}
                btnColor={colors.primary}
              />
            );
          }}
        </MediaQuery>
      </ContainerComponent>
    );
  }
}

export default LoginPage;
