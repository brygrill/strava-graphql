// @flow
import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default class LoadingComponent extends Component {
  defaultProps: {
    msg: 'Loading...',
    size: 'medium',
  };

  props: {
    msg: string,
    size: string,
  };

  render() {
    const { msg, size } = this.props;
    return (
      <Dimmer page active>
        <Loader content={msg} size={size} />
      </Dimmer>
    );
  }
}
