// @flow
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import ContainerComponent from '../components/container';
import LoginComponent from '../components/login';
import logo from '../images/logo_sm.png';
//import { auth, login } from '../firebase/init/auth';

class LoginPage extends Component {
  state = {
    error: false,
  };

  componentWillMount() {
    /*    this.authListener = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user exists and sent to manager');
      } else {
        console.log('no user');
      }
    });*/
  }

  componentWillUnMount() {
    //this.authListener();
  }

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
              />
            );
          }}
        </MediaQuery>
      </ContainerComponent>
    );
  }
}

export default LoginPage;
