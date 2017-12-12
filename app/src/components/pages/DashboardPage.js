import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

import Loading from '../Loading';
import WeekSummaryView from '../hocs/WeekSummaryView';

const propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
};

const defaultProps = {
  loading: false,
  error: false,
};

export default class DashboardPage extends Component {
  state = {
    loading: false,
    error: false,
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Segment inverted padded className="back-black">
        <Header as="h2" inverted textAlign="center">
          Dashboard Page
        </Header>
        <WeekSummaryView />
      </Segment>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.defaultProps = defaultProps;
