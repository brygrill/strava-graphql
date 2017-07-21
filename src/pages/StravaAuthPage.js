// @flow
import React, { Component } from 'react';
import axios from 'axios';

import fire from '../fire';
import { stravaFunctionUrl } from '../config';

import AppContainer from '../components/AppContainer';

const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .get(stravaFunctionUrl(code), config)
    .then(resp => {
      console.log(resp);
      return resp.data;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export default class DashboardPage extends Component {
  state = {
    error: false,
  };

  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  handleStravaCallback = (uid: string, search: string, history: Object) => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      fire
        .auth()
        .currentUser.getIdToken()
        .then(function(idToken) {
          saveToken(code, idToken)
            .then(() => {
              history.push('/dashboard');
            })
            .catch(() => {
              this.setState({ error: true });
            });
        })
        .catch(function(error) {
          console.error(error);
          this.setState({ error: true });
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
