// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppBar from './AppBar';

const DefaultChild = () => <h3>Base Container</h3>;

class BaseContainer extends Component {
  defaultProps: {
    children: DefaultChild,
    authed: false,
  };

  props: {
    children?: Children,
    authed?: Boolean,
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
            <AppBar authed={this.props.authed} />
            {this.props.children}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default BaseContainer;
