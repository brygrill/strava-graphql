// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class AppBarComponent extends Component {
  defaultProps: {
    authed: false,
  };

  props: {
    authed?: Boolean,
  };

  handleMenuClick(evt: SyntheticEvent) {
    console.log('click');
  }

  handleLogInClick(evt: SyntheticEvent) {
    console.log('login');
  }

  handleLogOutClick(evt: SyntheticEvent) {
    console.log('logout');
  }

  render() {
    const { authed } = this.props;
    return (
      <AppBar
        title="PLATA"
        showMenuIconButton={authed}
        iconElementRight={
          authed
            ? <FlatButton label="Logout" onTapTouch={this.handleLogOutClick} />
            : <FlatButton label="Login" onTapTouch={this.handleLogInClick} />
        }
        onLeftIconButtonTouchTap={this.handleMenuClick}
      />
    );
  }
}
