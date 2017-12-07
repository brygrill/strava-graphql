import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

import Loading from './Loading';

import { last12Weeks } from '../utils/strava';

const propTypes = {
  token: PropTypes.string.isRequired,
};

export default class StravaCharts extends Component {
  state = {
    loading: true,
    error: false,
    weeks: null,
  };

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
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Segment inverted padded className="back-black">
        <Header
          as="h2"
          inverted
          textAlign="center"
        >
          Last 12 Weeks
        </Header>
        <ResponsiveContainer height={400}>
          <BarChart
            data={this.state.weeks}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <Tooltip />
            <XAxis dataKey="weekOf" />
            <YAxis />
            <Bar dataKey="totalTimeSec" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

StravaCharts.propTypes = propTypes;
