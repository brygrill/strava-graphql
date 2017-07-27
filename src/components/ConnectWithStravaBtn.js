// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('DashboardAppBar', {
  root: {},
});

class DashboardAppBar extends Component {
  props: {
    classes: Object,
    authUrl: string,
    stravaToken: string,
  };

  render() {
    const { classes, authUrl, stravaToken } = this.props;
    return stravaToken
      ? null
      : <div className={classes.root}>
          <Button raised href={authUrl}>
            Connect with Strava
          </Button>
        </div>;
  }
}

export default withStyles(styleSheet)(DashboardAppBar);
