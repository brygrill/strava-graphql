// @flow
import React, { Component } from 'react';
import Button from 'material-ui/Button';

import fire from '../fire';
import fetchStrava from '../strava';
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

  // Get data once on mount
  fetchUserData = (user: string) => {
    const ref = fire.database().ref();
    return ref.child('users').child(user).once('value').then(data => {
      const userData = data.val();
      return userData;
    });
  };

  // Realtime data updates
  fetchUserDataRT = (user: string) => {
    const ref = fire.database().ref();
    ref.child('users').child(user).on('value', data => {
      this.setState({ userData: data.val() });
    });
  };

  // Get user strava data
  fetchStravaData = (stravaToken: string) => {
    return fetchStrava(stravaToken).then(data => {
      return data;
    });
  };

  // Fetch user data then Strava data
  fetchAllData = async (user: string) => {
    const userData = await this.fetchUserData(user);
    const stravaData = await this.fetchStravaData(userData.strava.token);
    this.setState({ userData, stravaData });
  };

  componentDidMount() {
    console.log('Dashboard - DCM');
    const { user } = this.props.appState;
    this.fetchAllData(user.uid);
  }

  render() {
    console.log(this.state);
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
