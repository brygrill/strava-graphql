import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import Loading from '../Loading';
import WeekSummaryView from '../hocs/MainStravaQuery';

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
        <WeekSummaryView handleError={this.handleError} />
      </Segment>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.defaultProps = defaultProps;
