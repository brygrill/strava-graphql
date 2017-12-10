import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import MenuTop from '../MenuTop';
import MenuSidebar from '../MenuSidebar';
import Loading from '../Loading';

import { fire } from '../../config';
import { deAuthAthlete } from '../../utils';

const Fragment = React.Fragment;

const propTypes = {
  uid: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default class DashboardPage extends Component {
  state = {
    loading: false,
    error: false,
    sidebar: false,
    userRef: fire.database().ref('users'),
    userObj: null,
    stravaToken: null,
  };

  // UI
  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  // FIREBASE
  getFirebaseOnce = () => {
    this.state.userRef
      .child(this.props.uid)
      .once('value')
      .then(snapshot => {
        const stravaToken = snapshot
          .child('strava')
          .child('token')
          .val();
        if (stravaToken) {
          this.setState({ stravaToken, loading: false });
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
    this.getFirebaseOnce();
  }

  render() {
    console.log(this.props);
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
            {this.props.children}
          </Container>
        </Fragment>
      </MenuSidebar>
    );
  }
}

DashboardPage.propTypes = propTypes;
