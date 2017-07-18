// @flow
import React, { Component } from 'react';

import AppContainer from '../components/AppContainer';

const saveToken = (code, uid) => {
  return fetch(
    `https://us-central1-velox-f43d6.cloudfunctions.net/strava?code=${code}&uid=${uid}`,
  )
    .then(resp => {
      return resp.json();
    })
    .catch(() => {
      return false;
    });
};

export default class DashboardPage extends Component {
  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  handleStravaCallback = (uid, search, history) => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      console.log(code);
      saveToken(code, uid).then(token => {
        console.log(token);
        history.push('/dashboard');
      });
    } else {
      console.log('no code');
      history.push('/dashboard');
    }
  };

  componentDidMount() {
    console.log('StravaAuth - DCM');
    const { user } = this.props.appState;
    this.handleStravaCallback(
      user.uid,
      this.props.location.search,
      this.props.history,
    );
  }

  render() {
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          Authenticating with Strava...
        </div>
      </AppContainer>
    );
  }
}