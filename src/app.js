// @flow
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import base from './rebase';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/dashboard';
import NotFound from './pages/notfound';

import { AppRoute, NoMatchRoute } from './routes';

import LoadingComponent from './components/loading';

import { colors } from './css';

export default class App extends Component {
  state = {
    loading: true,
    authed: false,
    user: {
      uid: null,
    },
  };

  componentWillMount() {
    base.onAuth(this.updateAuthState);
  }

  updateAuthState = (user: Object) => {
    if (user)
      this.setState({ loading: false, authed: true, user: { uid: user.uid } });
    if (!user)
      this.setState({ loading: false, authed: false, user: { uid: null } });
  };

  render() {
    const { loading, authed } = this.state;
    return loading
      ? <LoadingComponent
          msg="Getting to work..."
          size="large"
          back={colors.primary}
        />
      : <Router>
          <Switch>
            <AppRoute
              path="/"
              exact
              appState={this.state}
              component={authed ? DashboardPage : HomePage}
            />
            <NoMatchRoute appState={this.state} component={NotFound} />
          </Switch>
        </Router>;
  }
}
