import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ChartBar from '../ChartBar';
import Loading from '../Loading';

const propTypes = {
  strava: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.any,
  handleError: PropTypes.func.isRequired,
};

const defaultProps = {
  loading: false,
  error: false,
  strava: {
    activity: {
      week_summary: [],
    },
  },
};

class WeekSummaryView extends Component {
  componentWillReceiveProps(nextProps) {
    // listen for error from graphql query and pass to parent
    if (this.props.error !== nextProps.error) {
      this.props.handleError(nextProps.error);
    }
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <ChartBar data={this.props.strava.activity.week_summary} />
    );
  }
}

WeekSummaryView.propTypes = propTypes;
WeekSummaryView.defaultProps = defaultProps;

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
