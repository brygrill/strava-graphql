// @flow
import React, { Component } from 'react';

export default class AppFooter extends Component {
  render() {
    return (
      <footer className="mdl-mini-footer sbr-app-footer">
        <div className="mdl-mini-footer__right-section">
          <a
            href="https://github.com/brygrill/sbr-training"
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
