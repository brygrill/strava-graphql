// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import fire from '../fire';

import AppContainer from '../components/AppContainer';

const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
const URI = 'http://localhost:3000/strava';
const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${URI}&approval_prompt=force&scope=view_private`;

export default class DashboardPage extends Component {
  state = {
    week: null,
    user: null,
  };

  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  fetchUserData1 = (key: string, user: string) => {
    const updatedState = {};
    const data = fire.database().ref(`${key}/${user}`);
    data.on('value', data => {
      updatedState[key] = data.val();
      this.setState(updatedState);
    });
  };

  fetchUserInfo = (user: string) => {
    const ref = fire.database().ref();
    ref.child('users').child(user).on('value', data => {
      this.setState({ user: data.val() });
    });
  };

  fetchWeekInfo = (user: string) => {
    const ref = fire.database().ref();
    ref.child('weeks').child(user).on('value', data => {
      this.setState({ week: data.val() });
    });
  };

  componentDidMount() {
    console.log('Dashboard - DCM');
    const { user } = this.props.appState;
    this.fetchUserInfo(user.uid);
    this.fetchWeekInfo(user.uid);
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
