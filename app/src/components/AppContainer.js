// @flow
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { appTitle } from '../config';

class BaseContainer extends Component {
  static defaultProps = {
    children: null,
    pageTitle: '',
  };

  props: {
    children?: any,
    pageTitle?: any,
  };

  render() {
    return (
      <div>
        <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`}>
          <title>{this.props.pageTitle}</title>
        </Helmet>
        <CSSTransitionGroup
          transitionName="sbr-transition"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            {this.props.children}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default BaseContainer;
