import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ChartBar from '../ChartBar';
import Loading from '../Loading';

import { currentUserToken } from '../../utils';
import { last12Weeks } from '../../utils/strava';

const propTypes = {
  token: PropTypes.string.isRequired,
};

export default class WeekSummaryView extends Component {
  fetchActivities = async () => {
    try {
      const weeks = await last12Weeks(this.props.token);
      this.setState({ weeks, loading: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount() {
    this.fetchActivities();
    currentUserToken().then(data => {
      console.log(data);
    });
  }

  render() {
    console.log(this.props);
    if (this.props.loading) {
      return <Loading />;
    } else if (this.props.error) {
      return <h1 style={{ color: '#fff' }}>Error</h1>;
    }
    return <ChartBar data={[]} />;
  }
}

WeekSummaryView.propTypes = propTypes;

// const WEEKS_SUMMARY_QUERY = gql`
//   query WeekSummaryForGraph {
//     summarizeWeeks(
//       count: 12
//       token: "a84677d863f196c1bda0346b4bb1c9170030cf0d"
//     ) {
//       weekOf
//       totalTimeHrs
//       totalTimeHrsStr
//       totalSuffer
//     }
//   }
// `;

// export default graphql(WEEKS_SUMMARY_QUERY, {
//   options: {
//     variables: {
//       count: 12,
//       token: 'a84677d863f196c1bda0346b4bb1c9170030cf0d',
//     },
//   },
//   props: ({ data: { loading, error, summarizeWeeks } }) => ({
//     loading,
//     error,
//     summarizeWeeks,
//   }),
// })(WeekSummaryView);
