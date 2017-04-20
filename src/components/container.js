// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Container } from 'semantic-ui-react';

const pagePadding = {
  paddingTop: '1rem',
};

const DefaultChild = () => <h3>Home</h3>;

class ContainerComponent extends Component {
  defaultProps: {
    children: DefaultChild,
  };

  props: {
    children?: Children,
  };

  render() {
    return (
      <div>
        <Container style={pagePadding}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default ContainerComponent;
