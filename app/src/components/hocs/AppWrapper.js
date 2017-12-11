import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
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

const defaultProps = {
  dash: null,
}

class AppWrapper extends Component {
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
  // componentDidMount() {
  //   this.getFirebaseOnce();
  // }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { dash: this.props.dash }));

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
            {childrenWithProps}
          </Container>
        </Fragment>
      </MenuSidebar>
    );
  }
}

AppWrapper.propTypes = propTypes;
AppWrapper.defaultProps = defaultProps;

// https://www.apollographql.com/docs/react/features/subscriptions.html
const DASH_USER_QUERY = gql`
query DashUserQuery {
  dash {
    uid
    strava_token
  }
}
`;

export default graphql(DASH_USER_QUERY, {
// options: ({ token }) => ({ variables: { count: 12, token } }),
  props: ({ data: { loading, error, dash } }) => ({
    loading,
    error,
    dash,
  }),
})(AppWrapper);
