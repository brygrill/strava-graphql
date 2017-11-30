import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { fire } from '../config';

import { PrivateRoute, PublicRoute, NoMatchRoute } from './Routes';
import SigninPage from './SigninPage';
import DashboardPage from './DashboardPage';
import StravaAuthPage from './StravaAuthPage';
import NotFound from './NotFoundPage';

const Fragment = React.Fragment;

export default class RouterComponent extends Component {
  state = {
    loading: true,
    authed: false,
    uid: null,
  };

  componentDidMount() {
    this.listenForAuthChange();
  }

  listenForAuthChange = () => {
    return fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          authed: true,
          uid: user.uid,
        });
      } else {
        this.setState({ loading: false, authed: false, uid: null });
      }
    });
  };

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <PublicRoute
              path="/signin"
              exact
              appState={this.state}
              component={SigninPage}
            />
            <PrivateRoute
              path="/"
              appState={this.state}
              component={DashboardPage}
            />
            <PrivateRoute
              path="/strava"
              appState={this.state}
              component={StravaAuthPage}
            />
            <NoMatchRoute appState={this.state} component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
