import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import StravaAuthView from '../hocs/StravaAuthMutation';

const propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default class StravaAuthPage extends Component {
  state = {
    error: false,
  };

  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <Header>Error Msg Here</Header>;
    }

    return (
      <StravaAuthView
        location={this.props.location}
        history={this.props.history}
        handleError={this.handleError}
      />
    );
  }
}

StravaAuthPage.propTypes = propTypes;
