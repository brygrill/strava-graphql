// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppFooter from './AppFooter';

class BaseContainer extends Component {
  props: {
    children: Children,
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
