// @flow
import React, { Component } from 'react';
import fire from '../fire';

import AppContainer from '../components/AppContainer';

export default class DashboardPage extends Component {
  state = {
    weeks: null,
  };

  props: {
    appState: Object,
  };

  fetchUserData = (key: string, user: string) => {
    const updatedState = {};
    const data = fire.database().ref(`${key}/${user}`);
    data.on('value', data => {
      updatedState[key] = data.val();
      this.setState(updatedState);
    });
  };

  componentDidMount() {
    const { user } = this.props.appState;
    this.fetchUserData('weeks', user.uid);
  }

  render() {
    console.log(this.state);
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          dashboard
        </div>
      </AppContainer>
    );
  }
}
