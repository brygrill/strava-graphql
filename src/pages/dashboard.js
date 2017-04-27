// @flow
import React, { Component } from 'react';

export default class DashboardPage extends Component {
  state = {};

  props: {
    appState: Object,
  };

  render() {
    console.log(this.props);
    return <div>Hi</div>;
  }
}
