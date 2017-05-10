// @flow
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import BaseContainer from '../components/BaseContainer';
import Toolbar from '../components/Toolbar';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

// Render hero page
export default class HomePage extends Component {
  props: {
    appState: Object,
  };

  render() {
    return (
      <BaseContainer>
        <Toolbar />
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            <Paper style={style} zDepth={1} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <FlatButton label="Primary" primary />
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <FlatButton label="Secondary" secondary />
          </div>
        </div>
      </BaseContainer>
    );
  }
}
