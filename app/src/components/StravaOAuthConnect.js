import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Image } from 'semantic-ui-react';

import stravaConnectBtn from '../images/btn_strava_connectwith_orange.svg';

const propTypes = {
  stravaOAuthUrl: PropTypes.string.isRequired,
};

export default class StravaConnect extends Component {
  render() {
    return (
      <Segment
        inverted
        padded="very"
        textAlign="center"
        className="back-black"
        style={{ marginTop: '6rem' }}
      >
        <Header
          inverted
          as="h1"
          content="Welcome"
          subheader="Please link your Strava account to get started."
        />
        <Image href={this.props.stravaOAuthUrl} src={stravaConnectBtn} />
      </Segment>
    );
  }
}

StravaConnect.propTypes = propTypes;
