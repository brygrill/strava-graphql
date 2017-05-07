// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
//import { Container } from 'semantic-ui-react';

import BaseContainer from './base';

import MenuComponent from '../components/menu';

import logo from '../images/logos/logo_sm.png';

const DefaultChild = () => <h3>Public Container</h3>;

class PublicContainer extends Component {
  defaultProps: {
    children: DefaultChild,
  };

  props: {
    children?: Children,
  };

  render() {
    return (
      <BaseContainer>
        <MenuComponent logo={logo} />
        {this.props.children}
      </BaseContainer>
    );
  }
}

export default PublicContainer;
