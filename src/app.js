// @flow
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import base from './rebase';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import NotFound from './pages/notfound';

import { PrivateRoute, PublicRoute, AppRoute, NoMatchRoute } from './routes';

import LoadingComponent from './components/loading';

import { colors } from './css';

export default class App extends Component {
  state = {
    loading: true,
    authed: false,
    user: {},
  };

  componentWillMount() {
    console.log('CDM: App.js');
    base.onAuth(this.updateAuthState);
  }

  updateAuthState = (user: Object) => {
    if (user) this.setState({ loading: false, authed: true, user });
    if (!user) this.setState({ loading: false, authed: false, user: {} });
  };

  render() {
    return this.state.loading
      ? <LoadingComponent
          msg="Dropping the Hammer..."
          size="large"
          back={colors.primary}
        />
      : <Router>
          <Switch>
            <AppRoute
              path="/"
              exact
              appState={this.state}
              component={HomePage}
            />
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
        </Router>;
  }
}
