// @flow
import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';

// Set div and divider padding
// so its equal with main login
const componentStyle = {};
componentStyle.padding = '1rem 1rem 0 1rem';

const dividerStyle = {};
dividerStyle.margin = 0;
dividerStyle.paddingTop = '1rem';

const btnStyle = {
  backgroundStyle: '#d4d4d5',
};

export default class LoginGoogleComponent extends Component {
  props: {
    handleClick: Function,
    hideGoogle: boolean,
    hideEmailPwd: boolean,
  };
  render() {
    if (this.props.hideGoogle) componentStyle.display = 'none';
    if (this.props.hideEmailPwd) {
      dividerStyle.display = 'none';
      componentStyle.padding = '1rem';
    }
    return (
      <div style={componentStyle}>
        <Button
          icon="google"
          size="large"
          content="Login with Google"
          style={btnStyle}
          onClick={this.props.handleClick}
        />
        <Divider horizontal style={dividerStyle}>Or</Divider>
      </div>
    );
  }
}
