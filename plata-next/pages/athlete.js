/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Router from 'next/router';
import { Container, Header } from 'semantic-ui-react';
import Head from '../components/Head';

class Athlete extends Component {
  static async getInitialProps() {
    return { authed: true };
  }

  render() {
    let container;
    if (!this.props.authed) {
      container = (
        <Header
          as="h1"
          textAlign="center"
          content="Login"
        />
      );
      Router.push('/login');
    } else {
      container = (
        <Header
          as="h1"
          textAlign="center"
          content="Athlete"
        />
      );
    }
    return (
      <div>
        <Head />
        <Container>
          {container}
        </Container>
      </div>
    );
  }
}

export default Athlete;
