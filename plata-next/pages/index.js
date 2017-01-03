/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Link from 'next/link';
import App from '../components/App';

class Home extends Component {
  static async getInitialProps() {
    console.log('index initial props');
    return {};
  }
  constructor(props) {
    super();
    console.log('index constructor');
  }

  render() {
    return (
      <App>
        <div><h1>Home Page</h1></div>
        <div><Link href="/login"><a>Login</a></Link></div>
        <div><Link href="/dashboard"><a>Dashboard</a></Link></div>
      </App>
    );
  }
}

export default Home;
