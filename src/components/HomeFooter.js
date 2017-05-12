// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import swim from '../images/icons/swim_circle_white.svg';
import bike from '../images/icons/bike_circle_white.svg';
import run from '../images/icons/run_circle_white.svg';

const iconStyle = {
  height: '5rem',
  width: '5rem',
};
export default class HomeFooterComponent extends Component {
  props: {
    btnLabel: string,
    onBtnClick: Function,
  };

  render() {
    return (
      <div
        className="mdl-cell mdl-cell--12-col mdl-cell--middle"
        style={{ color: '#fff', textAlign: 'center' }}
      >
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <img src={swim} alt="swim icon" style={iconStyle} />
            <img src={bike} alt="bike icon" style={iconStyle} />
            <img src={run} alt="run icon" style={iconStyle} />
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <RaisedButton
              label={this.props.btnLabel}
              secondary
              onTouchTap={this.props.onBtnClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
