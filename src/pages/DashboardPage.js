// @flow
import React, { Component } from 'react';
import Button from 'material-ui/Button';

import fire from '../fire';
import { stravaOAuthUrl } from '../config';

import AppContainer from '../components/AppContainer';

const authUrl = stravaOAuthUrl();

export default class DashboardPage extends Component {
  state = {
    loading: false,
    error: false,
    userData: null,
    stravaData: null,
  };

  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  fetchUserData = (user: string) => {
    const ref = fire.database().ref();
    ref.child('users').child(user).on('value', data => {
      this.setState({ userData: data.val() });
    });
  };

  componentDidMount() {
    console.log('Dashboard - DCM');
    const { user } = this.props.appState;
    this.fetchUserData(user.uid);
  }

  render() {
    //console.log(this.state);
    //console.log(this.props);
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          dashboard page
          <Button raised href={authUrl}>
            Connect with Strava
          </Button>
        </div>
      </AppContainer>
    );
  }
}
