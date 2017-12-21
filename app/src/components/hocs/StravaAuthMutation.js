import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Segment, Header, Loader } from 'semantic-ui-react';

const propTypes = {
  mutate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleError: PropTypes.func.isRequired,
};

class WeekSummaryView extends Component {
  handleStravaCallback = async (search, history) => {
    try {
      const params = new URLSearchParams(search);
      const code = params.get('code');
      if (code) {
        await this.props.mutate({ variables: { code } });
        history.push('/');
      } else {
        history.push('/');
      }
    } catch (error) {
      this.props.handleError(error);
    }
  };

  componentDidMount() {
    this.handleStravaCallback(this.props.location.search, this.props.history);
  }

  render() {
    return (
      <Segment
        inverted
        padded="very"
        textAlign="center"
        className="back-black"
        style={{ marginTop: '6rem' }}
      >
        <Loader active inline="centered" />
        <Header
          inverted
          as="h1"
          content="Authenticating with Strava"
          subheader="This should only take a moment..."
        />
      </Segment>
    );
  }
}

WeekSummaryView.propTypes = propTypes;

const ADD_STRAVA_TOKEN = gql`
  mutation addStravaToken($code: String!) {
    add_strava_token(code: $code) {
      uid
      strava_token
    }
  }
`;

export default graphql(ADD_STRAVA_TOKEN)(WeekSummaryView);
