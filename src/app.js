// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import base from './firebase';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';

import { PrivateRoute, LoginRoute, ChildRoute } from './routes';

class App extends Component {
  state = {
    loading: true,
    authed: false,
    user: null,
  };

  componentWillMount() {
    console.log(base);
  }

  render() {
    return (
      <Router>
        <Switch>
          <LoginRoute
            path="/login"
            authed={this.state.authed}
            component={LoginPage}
          />
          <PrivateRoute
            path="/go"
            authed={this.state.authed}
            component={DashboardPage}
          />
          <ChildRoute path="/" appState={this.state} component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
