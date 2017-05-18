// @flow
import React, { Component } from 'react';

import AppContainer from '../components/AppContainer';

import base from '../rebase';

export default class DashboardPage extends Component {
  state = {
    userSchedule: null,
  };

  componentDidMount() {
    try {
      const { user } = this.props.appState;
      base.syncState(`schedules/${user.uid}`, {
        context: this,
        state: 'userSchedule',
        isNullable: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  props: {
    appState: Object,
  };

  render() {
    console.log(this.props);
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          dashboard
        </div>
      </AppContainer>
    );
  }
}
