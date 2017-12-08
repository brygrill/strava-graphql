import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

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

export default class GraphiQLPage extends Component {
  state = {
    loading: true,
    error: false,
    sidebar: false,
    userRef: fire.database().ref(`users/${this.props.appState.uid}`),
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
  componentDidMount() {
    this.getFirebaseOn();
    this.getFirebaseOnce();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <MenuSidebar
        visible={this.state.sidebar}
        showDisconnect={this.state.stravaToken || false}
        logout={this.handleLogOut}
        deauth={this.handleDeAuth}
      >
        <Fragment>
          <MenuTop
            toggleSidebar={this.toggleSidebar}
            showDisclaimer={this.state.stravaToken || false}
          />
          <Container style={{ marginTop: '3rem' }}>
            {this.state.stravaToken ? (
              <WeekSummaryView token={this.state.stravaToken} />
            ) : (
              <StravaConnect stravaOAuthUrl={stravaOAuthUrl} />
            )}
          </Container>
        </Fragment>
      </MenuSidebar>
    );
  }
}

GraphiQLPage.propTypes = propTypes;
