// @flow
import React, { Component } from 'react';

import ContainerComponent from '../components/container';
import LoginComponent from '../components/login';

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
        <LoginComponent
          login={this.submitCredentials}
          error={this.state.error}
        />
      </ContainerComponent>
    );
  }
}

export default LoginPage;
