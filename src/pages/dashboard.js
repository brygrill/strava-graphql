// @flow
import React, { Component } from 'react';

//import base from '../rebase';

export default class DashboardPage extends Component {
  state = {};

  props: {
    appState: Object,
  };

  render() {
    console.log(this.props.appState);
    return <div>Hi</div>;
  }
}
