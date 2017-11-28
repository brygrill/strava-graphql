import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { fire } from '../config';

import { PrivateRoute, PublicRoute, NoMatchRoute } from './Routes';
import HomePage from './HomePage';
// import DashboardPage from './DashboardPage';
import StravaAuthPage from './StravaAuthPage';
import NotFound from './NotFoundPage';

const Dashboard = () => {
  return <div>Dashboard!!!</div>;
};

export default class RouterComponent extends Component {
  state = {
    loading: true,
    authed: false,
    uid: null,
  };

  componentDidMount() {
    console.log('Router - cDM');
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
      <div>
        <Router>
          <div>
            <Switch>
              <PublicRoute
                path="/"
                exact
                appState={this.state}
                component={HomePage}
              />
              <PrivateRoute
                path="/dashboard"
                appState={this.state}
                component={Dashboard}
              />
              <PrivateRoute
                path="/strava"
                appState={this.state}
                component={StravaAuthPage}
              />
              <NoMatchRoute appState={this.state} component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
