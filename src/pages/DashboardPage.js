// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import fire from '../fire';

import AppContainer from '../components/AppContainer';

const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:3000/dashboard&approval_prompt=force&scope=view_private`;

export default class DashboardPage extends Component {
  state = {
    weeks: null,
  };

  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  fetchUserData = (key: string, user: string) => {
    const updatedState = {};
    const data = fire.database().ref(`${key}/${user}`);
    data.on('value', data => {
      updatedState[key] = data.val();
      this.setState(updatedState);
    });
  };

  handleStravaCallback = (search, history) => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      console.log(code);
      history.replace('/dashboard');
    }
  };

  componentDidMount() {
    console.log('Dashboard - DCM');
    const { user } = this.props.appState;
    //const { search } = this.props.location.search;
    this.fetchUserData('weeks', user.uid);
    this.handleStravaCallback(this.props.location.search, this.props.history);
  }

  render() {
    //console.log(this.state);
    //console.log(this.props);
    return (
      <AppContainer authed={this.props.appState.authed}>
        <div className="mdl-grid">
          dashboard
          <RaisedButton label="Default" href={authUrl} />
        </div>
      </AppContainer>
    );
  }
}
