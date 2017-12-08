import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ChartBar from '../ChartBar';
import Loading from '../Loading';

const propTypes = {
  token: PropTypes.string.isRequired,
};

class WeekSummaryView extends Component {
  render() {
    console.log(this.props);
    if (this.props.loading) {
      return <Loading />;
    } else if (this.props.error) {
      return <h1 style={{ color: '#fff' }}>Error</h1>;
    }
    return <ChartBar data={this.props.summarizeWeeks} />;
  }
}

WeekSummaryView.propTypes = propTypes;

const WEEKS_SUMMARY_QUERY = gql`
  query WeekSummaryForBarChart($count: Int!, $token: String!) {
    summarizeWeeks(count: $count, token: $token) {
      weekOf
      totalTimeHrs
      totalTimeHrsStr
      totalSuffer
    }
  }
`;

export default graphql(WEEKS_SUMMARY_QUERY, {
  options: ({ token }) => ({ variables: { count: 12, token } }),
  props: ({ data: { loading, error, summarizeWeeks } }) => ({
    loading,
    error,
    summarizeWeeks,
  }),
})(WeekSummaryView);
