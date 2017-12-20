import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const propTypes = {
  data: PropTypes.array.isRequired,
};

const defaultProps = {
  data: [],
};

export default class ChartBar extends Component {
  render() {
    if (_.isEmpty(this.props.data)) {
      return (
        <Segment inverted padded className="back-black">
          <Header as="h2" inverted textAlign="center">
            No Data
          </Header>
        </Segment>
      );
    }
    return (
      <Segment inverted padded className="back-black">
        <Header as="h2" inverted textAlign="center">
          Last 12 Weeks
        </Header>
        <ResponsiveContainer height={400}>
          <BarChart
            data={this.props.data}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <Tooltip />
            <XAxis dataKey="week_of" />
            <YAxis />
            <Bar dataKey="time_total_hrs" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

ChartBar.propTypes = propTypes;
ChartBar.defaultProps = defaultProps;
