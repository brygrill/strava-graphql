/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class HomePage extends Component {
  constructor() {
    super();
    console.log('home constructor');
  }

  render() {
    return (
      <h1>Home Page!</h1>
    );
  }
}

export default HomePage;
