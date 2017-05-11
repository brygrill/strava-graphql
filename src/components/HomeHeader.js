// @flow
import React, { Component } from 'react';

class BaseContainer extends Component {
  props: {
    headline: string,
    subhead: string,
  };

  render() {
    return (
      <div
        className="mdl-cell mdl-cell--6-col-desktop mdl-cell--12-col-phone mdl-cell--12-col-tablet mdl-cell--middle"
        style={{ color: '#fff', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3rem' }}>{this.props.headline}</h1>
        <h3 style={{ fontSize: '1.5rem' }}>{this.props.subhead}</h3>
      </div>
    );
  }
}

export default BaseContainer;
