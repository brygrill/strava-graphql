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
      <Segment inverted padded="very" style={{ marginTop: '6rem' }}>
        <Header
          inverted
          content="Connect to Strava"
          subheader="We need the data to make the charts."
        />
        <Image href={this.props.stravaOAuthUrl} src={stravaConnectBtn} />
      </Segment>
    );
  }
}

StravaConnect.propTypes = propTypes;
