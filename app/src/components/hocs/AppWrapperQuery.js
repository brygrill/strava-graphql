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
  dash: PropTypes.shape({
    uid: PropTypes.string,
    strava_token: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  history: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  loading: false,
  error: false,
  dash: {
    uid: null,
    strava_token: null,
  },
};

class AppWrapper extends Component {
  state = {
    loading: false,
    error: false,
    sidebar: false,
    userRef: fire.database().ref(`users/${this.props.dash.uid}`),
    strava: this.props.dash.strava_token,
  };

  // UI
  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
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
      await deAuthAthlete(this.props.dash.strava_token);
      this.setState({ loading: false, sidebar: false, strava: null });
    } catch (error) {
      this.setState({ error: true, sidebar: false, loading: false });
    }
  };

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { dash: this.props.dash }),
    );

    console.log(this.props);
    if (this.state.loading || this.props.loading) {
      return <Loading />;
    }

    if (this.state.error || this.props.error) {
      return <div>Error!!!</div>;
    }

    return (
      <MenuSidebar
        visible={this.state.sidebar}
        showDisconnect={this.state.stravaToken || false}
        push={this.props.history.push}
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
