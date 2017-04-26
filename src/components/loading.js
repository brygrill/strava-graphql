// @flow
import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default class LoadingComponent extends Component {
  defaultProps: {
    msg: 'Loading...',
    size: 'medium',
    back: 'rgba(0,0,0,.87)',
  };

  props: {
    msg: string,
    size: string,
    back: string,
  };

  render() {
    const { msg, size, back } = this.props;
    const background = { backgroundColor: back };
    return (
      <Dimmer page active style={background}>
        <Loader content={msg} size={size} />
      </Dimmer>
    );
  }
}
