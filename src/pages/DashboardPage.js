// @flow
import React, { Component } from 'react';

import fire from '../fire';
import fetchStrava from '../strava';
import { stravaOAuthUrl, appTitle } from '../config';

import AppContainer from '../components/AppContainer';
import TopLinearLoader from '../components/TopLinearLoader';
import ConnectWithStravaBtn from '../components/ConnectWithStravaBtn';
import DashboardAppBar from '../components/DashboardAppBar';

const authUrl = stravaOAuthUrl();

export default class DashboardPage extends Component {
  state = {
    loading: true,
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
    try {
      const userData = await this.fetchUserData(user);
      const stravaData = userData.strava.token
        ? await this.fetchStravaData(userData.strava.token)
        : null;
      this.setState({ userData, stravaData, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: true });
    }
  };

  componentDidMount() {
    console.log('Dashboard - DCM');
    const { user } = this.props.appState;
    this.fetchAllData(user.uid);
  }

  render() {
    const { loading, userData } = this.state;
    const stravaToken = userData ? userData.strava.token : null;
    console.log(this.state);
    return (
      <AppContainer authed={this.props.appState.authed} pageTitle="Dashboard">
        <div><TopLinearLoader loading={loading} /></div>
        <DashboardAppBar appBarTitle={appTitle} />
        <div style={{ marginTop: '80px' }}>
          <ConnectWithStravaBtn stravaToken={stravaToken} authUrl={authUrl} />
        </div>
      </AppContainer>
    );
  }
}
