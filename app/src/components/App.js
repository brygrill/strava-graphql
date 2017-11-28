import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    );
  }
}
