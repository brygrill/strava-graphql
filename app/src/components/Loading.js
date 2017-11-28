import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

export default class Loading extends Component {
  render() {
    return <Loader active content="Loading..." />;
  }
}
