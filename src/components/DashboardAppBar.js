// @flow
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('DashboardAppBar', {
  root: {
    //width: '100%',
  },
  flex: {
    color: '#fff',
    flex: 1,
  },
});

class DashboardAppBar extends Component {
  static defaultProps = {
    appBarTitle: 'Title',
  };

  props: {
    classes: Object,
    appBarTitle?: string,
  };

  render() {
    const { classes, appBarTitle } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              {appBarTitle}
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styleSheet)(DashboardAppBar);
