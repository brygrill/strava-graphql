import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import Loading from './Loading';

import { hrsByWeek } from '../utils/strava';

const propTypes = {
  token: PropTypes.string.isRequired,
};

export default class StravaCharts extends Component {
  state = {
    loading: true,
    error: false,
    activities: null,
  }

  fetchActivities = async () => {
    const activities = await hrsByWeek(this.props.token);
    this.setState({ activities, loading: false });
  }

  componentDidMount() {
    this.fetchActivities();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header inverted>Strava charts data!</Header>
      </div>
    );
  }
}

StravaCharts.propTypes = propTypes;
