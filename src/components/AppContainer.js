// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppFooter from './AppFooter';

const DefaultChild = () => <h3>Base Container</h3>;

class BaseContainer extends Component {
  defaultProps: {
    children: DefaultChild,
  };

  props: {
    children?: Children,
  };

  render() {
    return (
      <div>
        <CSSTransitionGroup
          transitionName="plata-transition"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            {this.props.children}
            <AppFooter />
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default BaseContainer;
