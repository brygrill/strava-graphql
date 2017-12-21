import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default class Loading extends Component {
  render() {
    return (
      <Dimmer.Dimmable dimmed>
        <Dimmer active page>
          <Loader active content="Loading Dash..." />
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}
