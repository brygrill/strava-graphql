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
  static defaultProps = {
    loading: true,
  };

  props: {
    classes: Object,
    loading?: Boolean,
  };

  render() {
    const { classes, loading } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress
          style={loading ? { display: 'inherit' } : { display: 'none' }}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet)(TopLinearLoader);
