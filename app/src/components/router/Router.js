import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { fire } from '../../config';

import { PrivateRoute, PublicRoute, NoMatchRoute } from './Routes';
import SigninPage from '../pages/SigninPage';
import DashboardPage from '../pages/DashboardPage';
import GraphiqlPage from '../pages/GraphiqlPage';
import SettingsPage from '../pages/SettingsPage';
import StravaAuthPage from '../pages/StravaAuthPage';
import NotFound from '../pages/NotFoundPage';

import Loading from '../Loading';

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
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Router>
        <Fragment>
          <PublicRoute
            path="/signin"
            appState={this.state}
            component={SigninPage}
          />
          <PrivateRoute
            path="/"
            exact
            appState={this.state}
            component={DashboardPage}
          />
          <PrivateRoute
            path="/strava"
            appState={this.state}
            component={StravaAuthPage}
          />
          <PrivateRoute
            path="/graphiql"
            appState={this.state}
            component={GraphiqlPage}
          />
          <PrivateRoute
            path="/settings"
            appState={this.state}
            component={SettingsPage}
          />
          <NoMatchRoute appState={this.state} component={NotFound} />
        </Fragment>
      </Router>
    );
  }
}
