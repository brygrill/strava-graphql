// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('TopLinearLoader', {
  root: {
    margin: -8,
  },
});

class TopLinearLoader extends Component {
  props: {
    classes: Object,
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
}

export default withStyles(styleSheet)(TopLinearLoader);
