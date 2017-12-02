import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import SidebarMenu from './SidebarMenu';
import StravaConnect from './StravaConnect';
import StravaCharts from './StravaCharts';

import { fire, stravaOAuthUrl } from '../config';

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
    userRef: fire.database().ref(`users/${this.props.appState.uid}`),
    stravaToken: null,
  };

  // UI
  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  // FIREBASE
  getFirebase = () => {
    this.state.userRef.on('value', userData => {
      const user = userData.val();
      if (user && 'strava' in user) {
        this.setState({ stravaToken: user.strava.token });
      }
      console.log(user);
    });
  };

  // LOGOUT
  handleLogOut = () => {
    fire.auth().signOut();
  };

  // LIFECYCLE
  componentDidMount() {
    this.getFirebase();
  }

  render() {
    return (
      <SidebarMenu
        visible={this.state.sidebar}
        showDisconnect={this.state.stravaToken || false}
        logout={this.handleLogOut}
      >
        <Fragment>
          <Menu
            toggleSidebar={this.toggleSidebar}
            showDisclaimer={this.state.stravaToken || false}
          />
          <Container style={{ marginTop: '3rem' }}>
            {this.state.stravaToken ? (
              <StravaCharts />
            ) : (
              <StravaConnect stravaOAuthUrl={stravaOAuthUrl} />
            )}
          </Container>
        </Fragment>
      </SidebarMenu>
    );
  }
}

DashboardPage.propTypes = propTypes;
