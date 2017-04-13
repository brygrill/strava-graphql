import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

const pagePadding = {
  paddingTop: '1rem',
};

class ContainerComponent extends Component {
  props: {
    children: Node,
  };

  render() {
    return (
      <div>
        <Container text style={pagePadding}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default ContainerComponent;
