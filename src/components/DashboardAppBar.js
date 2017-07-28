// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import ConnectWithStravaBtn from './ConnectWithStravaBtn';

const AvatarIcon = (props: { src: string }) => {
  return props.src
    ? <Avatar alt="Strava Avatar" src={props.src} style={{ margin: '10px' }} />
    : null;
};

export default class DashboardAppBar extends Component {
  static defaultProps = {
    appBarTitle: 'Title',
    stravaToken: null,
    stravaAvatarSrc: null,
  };

  props: {
    authUrl: string,
    stravaToken?: string,
    stravaAvatarSrc?: string,
    appBarTitle?: string,
  };

  render() {
    const { appBarTitle, authUrl, stravaToken, stravaAvatarSrc } = this.props;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              style={{ color: '#fff', flex: 1 }}
            >
              {appBarTitle}
            </Typography>
            <ConnectWithStravaBtn stravaToken={stravaToken} authUrl={authUrl} />
            <AvatarIcon src={stravaAvatarSrc} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
