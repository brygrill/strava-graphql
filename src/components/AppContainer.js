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
        <Helmet defaultTitle="Plata App" titleTemplate="%s | Plata App">
          <title>{this.props.pageTitle}</title>
        </Helmet>
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
