// @flow
import React, { Component } from 'react';

export default class AppFooter extends Component {
  props: {
    children: any,
  };

  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--1m-offset-tablet mdl-cell--12-col mdl-cell--middle sbr-home-individual-card">
        {this.props.children}
      </div>
    );
  }
}
