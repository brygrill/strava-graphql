// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import fire from '../fire';
import { stravaOAuthUrl } from '../config';

import AppContainer from '../components/AppContainer';

const authUrl = stravaOAuthUrl();

export default class DashboardPage extends Component {
  state = {
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
    console.log(this.state);
    //console.log(this.props);
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          dashboard page
          <RaisedButton label="Connect with Strava" href={authUrl} />
        </div>
      </AppContainer>
    );
  }
}
