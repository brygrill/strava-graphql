import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import StravaConnect from '../StravaOAuthConnect';
import ChartBar from '../ChartBar';
import Loading from '../Loading';

import { stravaOAuthUrl } from '../../config';

const propTypes = {
  token: PropTypes.string.isRequired,
};

class WeekSummaryView extends Component {
  render() {
    console.log(this.props);
    if (this.props.loading) {
      return <Loading />;
    }
    // swollow this err for now
    // else if (this.props.error) {
    //   return <h1 style={{ color: '#fff' }}>Error</h1>;
    // }
    return (
      <div>
        {this.props.strava ? (
          <ChartBar data={this.props.strava.activity.week_summary} />
        ) : (
          <StravaConnect stravaOAuthUrl={stravaOAuthUrl} />
        )}
      </div>
    );
  }
}

WeekSummaryView.propTypes = propTypes;

const WEEKS_SUMMARY_QUERY = gql`
  query WeekSummaryForBarChart($count: Int!) {
    strava {
      activity {
        week_summary(count: $count) {
          week_of
          time_total_hrs
          time_total_hrs_str
          suffer_total
        }
      }
    }
  }
`;

export default graphql(WEEKS_SUMMARY_QUERY, {
  options: { variables: { count: 12 } },
  props: ({ data: { loading, error, strava } }) => ({
    loading,
    error,
    strava,
  }),
})(WeekSummaryView);
