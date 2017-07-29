// @flow
import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';
import logo from '../images/logo_100_cropped.png';

export default class TopLinearLoader extends Component {
  static defaultProps = {
    loading: true,
  };

  props: {
    loading?: Boolean,
  };

  // style={loading ? { display: 'inherit' } : { display: 'none' }}
  render() {
    const { loading } = this.props;
    const loaderParent = loading
      ? 'sbr-dimmer-parent'
      : 'sbr-dimmer-parent hide';
    return (
      <div className={loaderParent}>
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
