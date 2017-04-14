/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';

import ContainerComponent from '../components/container';

import logo from '../images/logo_white.png';

const subHeaderStyle = {
  fontWeight: 300,
  color: '#fff',
  fontSize: '2.5rem',
};

class HomePage extends Component {
  state = {
    loading: false,
    schedule: {},
  };

  render() {
    return (
      <ContainerComponent>
        <Image src={logo} size="large" centered />
        <Header
          as="h1"
          content="Simply Plan Your Training."
          textAlign="center"
          style={subHeaderStyle}
        />
      </ContainerComponent>
    );
  }
}

export default HomePage;
