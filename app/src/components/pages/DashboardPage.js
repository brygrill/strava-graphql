import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Header } from 'semantic-ui-react';

import WeekSummaryView from '../hocs/WeekSummaryView';

import MenuTop from '../MenuTop';
import MenuSidebar from '../MenuSidebar';
import StravaConnect from '../StravaOAuthConnect';
import Loading from '../Loading';

import { fire, stravaOAuthUrl } from '../../config';
import { deAuthAthlete } from '../../utils';

const Fragment = React.Fragment;

const propTypes = {
  appState: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default class DashboardPage extends Component {
  state = {
    loading: false,
    error: false,
    sidebar: false,
    // userRef: fire.database().ref(`users/${this.props.appState.uid}`),
    userObj: null,
    stravaToken: null,
  };

  // UI
  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  // FIREBASE
  getFirebaseOn = () => {
    this.state.userRef.on('value', user => {
      const userObj = user.val();
      this.setState({ userObj });
    });
  };

  getFirebaseOnce = () => {
    this.state.userRef
      .once('value')
      .then(snapshot => {
        const userObj = snapshot.val();
        const stravaToken = snapshot
          .child('strava')
          .child('token')
          .val();
        if (stravaToken) {
          this.setState({ stravaToken, userObj, loading: false });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(() => {
        this.setState({ loading: false, error: false });
      });
  };

  // LOGOUT
  handleLogOut = () => {
    fire.auth().signOut();
  };

  // DEAUTH
  handleDeAuth = async () => {
    this.setState({ loading: true });
    try {
      // rm token from firebase
      this.state.userRef.child('strava').remove();
      // deauth app in strava
      await deAuthAthlete(this.state.stravaToken);
      this.setState({ loading: false, sidebar: false, stravaToken: null });
    } catch (error) {
      this.setState({ error: true, sidebar: false, loading: false });
    }
  };

  // LIFECYCLE
  // componentDidMount() {
  //   this.getFirebaseOn();
  //   this.getFirebaseOnce();
  // }

  render() {
    console.log(this.props);
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Segment inverted padded className="back-black">
        <Header as="h2" inverted textAlign="center">
          Dashboard Page
        </Header>
      </Segment>
    );
  }
}

DashboardPage.propTypes = propTypes;
