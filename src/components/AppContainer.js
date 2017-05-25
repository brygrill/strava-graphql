// @flow
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppFooter from './AppFooter';

class BaseContainer extends Component {
  props: {
    children: any,
    pageTitle: any,
  };

  render() {
    return (
      <div>
        <Helmet defaultTitle="TriPlan" titleTemplate="%s | TriPlan">
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
            <AppFooter />
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default BaseContainer;
