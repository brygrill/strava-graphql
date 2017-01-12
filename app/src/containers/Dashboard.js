/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <div>
        <h1>Dashboard!</h1>
      </div>
    );
  }
}

export default Dashboard;
