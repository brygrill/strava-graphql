// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import fire from '../fire';
import fetchStrava from '../strava';
import { stravaOAuthUrl, appTitle } from '../config';

import AppContainer from '../components/AppContainer';
import FullPageLoader from '../components/FullPageLoader';
import DashboardAppBar from '../components/DashboardAppBar';
import DashboardItemContainer from '../components/DashboardItemContainer';
import DashboardItemContainerWithProgress
  from '../components/DashboardItemContainerWithProgress';
import DashboardList from '../components/DashboardList';

const authUrl = stravaOAuthUrl();

const formatGoalVal = (hrs: number, goal: number) => {
  const hrsToMin = hrs * 60;
  const goalToMin = goal * 60;
  const percOfGoal = hrsToMin / goalToMin;
  return Math.round(percOfGoal * 100);
};

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

    let stravaToken = null;
    let stravaAvatarSrc = null;
    let weeklyHrsGoal = null;
    let totalHrsHuman = null;
    let userWeek = [];
    let stravaWeekSummary = [];

    if (userData && stravaData) {
      stravaToken = userData.strava.token.toString();
      stravaAvatarSrc = stravaData.athlete.profile_medium;
      weeklyHrsGoal = formatGoalVal(
        stravaData.activities.current.hoursTotal,
        userData.goals.weeklyHrs,
      );
      totalHrsHuman = stravaData.activities.current.hoursTotalHuman;
      userWeek = userData.week;
      stravaWeekSummary = stravaData.currentWeekSummary;
      console.log(this.state);
    }

    return (
      <AppContainer authed={this.props.appState.authed} pageTitle="Dashboard">
        <div><FullPageLoader loading={loading} /></div>
        <DashboardAppBar
          appBarTitle={appTitle}
          stravaToken={stravaToken}
          authUrl={authUrl}
          stravaAvatarSrc={stravaAvatarSrc}
        />
        <div className={classes.root}>
          <Grid container gutter={24}>

            <Grid item sm={3} hidden={{ xsDown: true }} />
            <DashboardItemContainerWithProgress value={weeklyHrsGoal}>
              <Typography type="headline" align="center">
                {`Hours this Week: ${totalHrsHuman}`}
              </Typography>
            </DashboardItemContainerWithProgress>
            <Grid item sm={3} hidden={{ xsDown: true }} />

            <Grid item sm={3} hidden={{ xsDown: true }} />
            <DashboardItemContainer>
              <DashboardList
                list={userWeek}
                listTitle="Do The Work"
                titleEmoji=""
                primary="day"
                secondary="details"
              />
            </DashboardItemContainer>
            <Grid item sm={3} hidden={{ xsDown: true }} />

            <Grid item sm={3} hidden={{ xsDown: true }} />
            <DashboardItemContainer>
              <DashboardList
                list={stravaWeekSummary}
                listTitle="KPIs"
                titleEmoji=""
                primary="name"
                secondary="value"
              />
            </DashboardItemContainer>
            <Grid item sm={3} hidden={{ xsDown: true }} />

          </Grid>
        </div>
      </AppContainer>
    );
  }
}

export default withStyles(styleSheet)(DashboardPage);
