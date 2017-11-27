// @flow
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
    loading?: boolean,
  };

  render() {
    const { classes, loading } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="sbr-transition"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className={classes.root}>
          <LinearProgress
            style={loading ? { display: 'inherit' } : { display: 'none' }}
          />
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default withStyles(styleSheet)(TopLinearLoader);
