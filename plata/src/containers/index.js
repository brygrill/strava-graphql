/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor() {
    super();
    console.log('app constructor');
  }

  render() {
    return (
      <h1>App!</h1>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.shape,
};

export default App;
