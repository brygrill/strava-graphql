// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Grid } from 'semantic-ui-react';

const DefaultChild = () => <h3>Public Container</h3>;

export default class RowComponent extends Component {
  defaultProps: {
    children: DefaultChild,
    width: 16,
    align: 'top',
    style: {},
    className: '',
  };

  props: {
    children?: Children,
    width?: number,
    align?: string,
    style?: Object,
    className?: string,
  };

  render() {
    return (
      <Grid.Row style={this.props.style} className={this.props.className}>
        <Grid.Column width={this.props.width} verticalAlign={this.props.align}>
          {this.props.children}
        </Grid.Column>
      </Grid.Row>
    );
  }
}
