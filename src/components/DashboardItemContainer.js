// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('DashboardPage', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  card: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

class DashboardItemContainer extends Component {
  static defaultProps = {
    children: null,
  };

  props: {
    classes: Object,
    children?: any,
  };

  render() {
    const { classes, children } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} elevation={4}>
          {children}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styleSheet)(DashboardItemContainer);
