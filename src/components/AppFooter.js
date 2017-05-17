// @flow
import React, { Component } from 'react';

export default class AppFooter extends Component {
  defaultProps: {};
  state = {};
  props: {};
  render() {
    return (
      <footer className="mdl-mini-footer plata-app-footer">
        <div className="mdl-mini-footer__right-section">
          <a
            href="https://github.com/brygrill/plata-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github fa-fw fa-2x" />{' '}
          </a>
        </div>
      </footer>
    );
  }
}
