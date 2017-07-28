// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import fire from '../fire';
import fetchStrava from '../strava';
import { stravaOAuthUrl, appTitle } from '../config';

import AppContainer from '../components/AppContainer';
import TopLinearLoader from '../components/TopLinearLoader';
import DashboardAppBar from '../components/DashboardAppBar';
import DashboardList from '../components/DashboardList';

const authUrl = stravaOAuthUrl();

const styleSheet = createStyleSheet('DashboardPage', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  card: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

class DashboardPage extends Component {
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
    classes: Object,
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
    const { loading, userData, stravaData } = this.state;
    const { classes } = this.props;

    const stravaToken = userData ? userData.strava.token : null;
    const stravaAvatarSrc = stravaData
      ? stravaData.athlete.profile_medium
      : null;
    const userWeek = userData ? userData.week : [];
    console.log(this.state);

    return (
      <AppContainer authed={this.props.appState.authed} pageTitle="Dashboard">
        <div><TopLinearLoader loading={loading} /></div>
        <DashboardAppBar
          appBarTitle={appTitle}
          stravaToken={stravaToken}
          authUrl={authUrl}
          stravaAvatarSrc={stravaAvatarSrc}
        />
        <div className={classes.root}>
          <Grid container gutter={24}>
            <Grid item sm={3} hidden={{ xsDown: true }} />
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper} elevation={4}>
                <DashboardList
                  list={userWeek}
                  listTitle="Schedule"
                  primary="day"
                  secondary="details"
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </AppContainer>
    );
  }
}

export default withStyles(styleSheet)(DashboardPage);
