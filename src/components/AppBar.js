// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class AppBarComponent extends Component {
  props: {
    authed: Boolean,
    rightBtnLabel: string,
    rightBtnHandler: Function,
  };

  handleMenuClick = (evt: SyntheticEvent) => {
    console.log('click menu');
  };

  handleTitleClick = (evt: SyntheticEvent) => {
    console.log('click title');
  };

  render() {
    const { authed, rightBtnLabel, rightBtnHandler } = this.props;
    return (
      <AppBar
        title={<span className="plata-appbar-title">PLATA</span>}
        showMenuIconButton={authed}
        onTitleTouchTap={this.handleTitleClick}
        iconElementRight={
          <FlatButton label={rightBtnLabel} onTouchTap={rightBtnHandler} />
        }
        onLeftIconButtonTouchTap={this.handleMenuClick}
      />
    );
  }
}
