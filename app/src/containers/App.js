/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Match, BrowserRouter, Miss } from 'react-router';

import Home from '../components/Home';
import Dashboard from './Dashboard';
import NotFound from '../components/NotFound';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>App</h1>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/dashboard" component={Dashboard} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
