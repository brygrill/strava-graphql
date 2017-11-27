// @flow
import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';
import logo from '../images/logo_100_cropped.png';

export default class TopLinearLoader extends Component {
  static defaultProps = {
    loading: true,
    fadeOut: true,
  };

  props: {
    loading?: boolean,
    fadeOut?: boolean,
  };

  render() {
    const { loading, fadeOut } = this.props;
    const loaderParentFadeOut = loading
      ? 'sbr-dimmer-parent'
      : 'sbr-dimmer-parent hide';
    const loaderParentDisplayNone = loading ? '' : 'sbr-dimmer-display-none';
    return (
      <div className={fadeOut ? loaderParentFadeOut : loaderParentDisplayNone}>
        <div style={{ margin: '-8px' }}>
          <LinearProgress style={{ zIndex: 10001 }} />
        </div>
        <div className="sbr-dimmer">
          <div className="sbr-dimmer-content">
            <img
              className="sbr-dimmer-img"
              src={logo}
              alt="SBR Training Logo"
            />
          </div>
        </div>
      </div>
    );
  }
}
