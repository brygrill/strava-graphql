/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Router from 'next/router';
import { currentUser } from '../firebase/auth';
import App from '../components/App';

class DashboardPage extends Component {
  static async getInitialProps() {
    console.log(currentUser);
    return { currentUser };
  }
  constructor() {
    super();
    console.log('dashboard constructor');
  }

  render() {
    // If not authed,
    // Send to login
    console.log(this.props.currentUser);
    if (!this.props.currentUser) {
      return Router.push('/login');
    }
    return (
      <App pgTitle="Dashboard">
        <h1>dashboard!</h1>
      </App>
    );
  }
}

DashboardPage.propTypes = {
  currentUser: PropTypes.shape,
};

export default DashboardPage;
