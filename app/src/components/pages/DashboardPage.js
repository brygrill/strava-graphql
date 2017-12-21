import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import Loading from '../Loading';
import StravaConnect from '../StravaOAuthConnect';
import WeekSummaryView from '../hocs/MainStravaQuery';

import { stravaOAuthUrl } from '../../config';

const propTypes = {
  dash: PropTypes.shape({
    uid: PropTypes.string,
    strava_token: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
};

const defaultProps = {
  loading: false,
  error: false,
  dash: {
    uid: null,
    strava_token: null,
  },
};

export default class DashboardPage extends Component {
  state = {
    loading: false,
    error: false,
  };

  handleError = error => {
    this.setState({ error });
  };

  render() {
    if (this.state.loading || this.props.loading) {
      return <Loading />;
    }

    if (this.state.error || this.props.error) {
      return <div>Error!!!</div>;
    }

    return (
      <Segment inverted padded className="back-black">
        {this.props.dash.strava_token ? (
          <WeekSummaryView handleError={this.handleError} />
        ) : (
          <StravaConnect stravaOAuthUrl={stravaOAuthUrl} />
        )}
      </Segment>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.defaultProps = defaultProps;
