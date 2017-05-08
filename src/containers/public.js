// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import MediaQuery from 'react-responsive';
//import { Container } from 'semantic-ui-react';

import BaseContainer from './base';

import MenuComponent from '../components/menu';

import { colors } from '../css';

import logo from '../images/logos/logo_white_sm.png';

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
        <MediaQuery maxDeviceWidth={1224}>
          {matches => {
            return (
              <MenuComponent
                logo={logo}
                background={colors.dark}
                mobile={matches}
              />
            );
          }}
        </MediaQuery>
        {this.props.children}
      </BaseContainer>
    );
  }
}

export default PublicContainer;
