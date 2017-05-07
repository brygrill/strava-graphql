// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
//import { Container } from 'semantic-ui-react';

import BaseContainer from './base';

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
        <div>Some Menu and stuff</div>
        {this.props.children}
      </BaseContainer>
    );
  }
}

export default PublicContainer;
