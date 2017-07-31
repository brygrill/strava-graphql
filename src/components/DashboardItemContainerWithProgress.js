// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('DashboardPage', theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  progress: {
    margin: -8,
    accentColor: '#00ffff',
  },
}));

class DashboardItemContainerWithProgress extends Component {
  static defaultProps = {
    children: null,
    value: 20,
  };

  props: {
    classes: Object,
    value?: number,
    children?: any,
  };

  render() {
    const { classes, value, children } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <LinearProgress
          color="accent"
          mode="determinate"
          value={value}
          className={classes.progress}
        />
        <Paper className={classes.paper} elevation={4}>
          {children}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styleSheet)(DashboardItemContainerWithProgress);
