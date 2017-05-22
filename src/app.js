// @flow
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import { app } from './rebase';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFoundPage';

import { AppRoute, PrivateRoute, NoMatchRoute } from './routes';

// Initialize React GA
ReactGA.initialize(process.env.REACT_APP_GA);

const gaEvents = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default class App extends Component {
  state = {
    loading: true,
    authed: false,
    user: {
      uid: null,
    },
  };

  componentDidMount() {
    // base.onAuth(this.listenForAuthChange);
    this.listenForAuthChange();
    //app.auth().onAuthStateChanged(this.listenForAuthChange());
  }

  listenForAuthChange = () => {
    return app.auth().onAuthStateChanged(user => {
      console.log('Auth State Change: ', user);
      if (user)
        this.setState({
          loading: false,
          authed: true,
          user: { uid: user.uid },
        });
      if (!user)
        this.setState({ loading: false, authed: false, user: { uid: null } });
    });
  };

  render() {
    const { loading } = this.state;
    return loading
      ? <div>Loading...</div>
      : <Router onUpdate={gaEvents}>
          <Switch>
            <AppRoute
              path="/"
              exact
              appState={this.state}
              component={HomePage}
            />
            <PrivateRoute
              path="/dashboard"
              appState={this.state}
              component={DashboardPage}
            />
            <NoMatchRoute appState={this.state} component={NotFound} />
          </Switch>
        </Router>;
  }
}
