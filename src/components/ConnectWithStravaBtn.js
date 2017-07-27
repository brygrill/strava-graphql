// @flow
import React, { Component } from 'react';
import Button from 'material-ui/Button';

export default class DashboardAppBar extends Component {
  props: {
    authUrl: string,
    stravaToken: string,
  };

  render() {
    const { authUrl, stravaToken } = this.props;
    return stravaToken
      ? null
      : <Button href={authUrl} style={{ color: '#fff' }}>
          Strava
        </Button>;
  }
}
