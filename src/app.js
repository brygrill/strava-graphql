// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import base from './rebase';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import NotFound from './pages/notfound';

import { PrivateRoute, PublicRoute, AppRoute, NoMatchRoute } from './routes';

export default class App extends Component {
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
          <AppRoute path="/" exact appState={this.state} component={HomePage} />
          <PublicRoute
            path="/login"
            appState={this.state}
            component={LoginPage}
          />
          <PrivateRoute
            path="/go"
            appState={this.state}
            component={DashboardPage}
          />
          <NoMatchRoute appState={this.state} component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
