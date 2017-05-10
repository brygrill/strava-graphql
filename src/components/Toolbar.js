// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarComponent extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="PLATA" />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <RaisedButton label="Log In" />
          <RaisedButton label="Sign Up" secondary />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
