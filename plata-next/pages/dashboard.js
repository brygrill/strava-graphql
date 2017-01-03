/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Router from 'next/router';
import App from '../components/App';

class Dashboard extends Component {
  static async getInitialProps() {
    console.log('dashboard initial props');
    return { authed: true };
  }
  constructor() {
    super();
    console.log('dashboard constructor');
  }

  render() {
    if (!this.props.authed) {
      Router.push('/login');
    }
    return (
      <App pgTitle="Dashboard">
        <h1>dashboard!</h1>
      </App>
    );
  }
}

Dashboard.propTypes = {
  authed: PropTypes.bool,
};

export default Dashboard;
