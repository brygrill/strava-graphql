// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import base from './firebase';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';

import PrivateRoute from './routes/private';

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
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            authed={this.state.authed}
            path="/go"
            component={DashboardPage}
          />
        </div>
      </Router>
    );
  }
}

export default App;
