/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Match, BrowserRouter, Miss, Redirect } from 'react-router';
import firebase from 'firebase';
import { firebaseAuth } from '../firebase';

import Home from './home';
import Login from './login';
import Dashboard from './dashboard';

class App extends Component {
  constructor() {
    super();
    //this.authChange = this.authChange.bind(this);
    this.state = {
      authed: false,
      user: null,
    };
  }

  componentDidMount() {
    if (firebase.User) {
      console.log(firebase.User);
      //this.setState({ authed: true, user: firebase.user });
    }
    this.authChange();
  }

  authChange() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ authed: true, user });
      } else {
        console.log('here');
        //this.setState({ authed: false, user: null });
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div>
          <h1>App</h1>
          <Match pattern="/" exactly component={Home} />
          <Match pattern="/login" component={Login} />
          <Match
            pattern="/dashboard"
            exactly
            render={() => (
              this.state.authed ? (
                <Dashboard
                  authed={this.state.authed}
                  user={this.state.user}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { authed: this.state.authed },
                  }}
                />
              )
            )}
          />
          <Miss render={() => <h3>404</h3>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
