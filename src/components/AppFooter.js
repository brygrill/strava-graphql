// @flow
import React, { Component } from 'react';

export default class AppFooter extends Component {
  defaultProps: {};
  state = {};
  props: {};
  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          Plata footer
        </div>
        <div className="mdl-mini-footer__right-section">
          Link to github
        </div>
      </footer>
    );
  }
}
