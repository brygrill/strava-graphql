// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Container } from 'semantic-ui-react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const pagePadding = {
  height: '100%',
  display: 'flex',
};

const fullHeight = {
  height: '100%',
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
      <div style={fullHeight}>
        <CSSTransitionGroup
          transitionName="plata-transition"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container style={pagePadding}>
            {this.props.children}
          </Container>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default ContainerComponent;
