// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Button } from 'semantic-ui-react';

export default class MenuComponent extends Component {
  defaultProps: {};
  state = {};
  props: {
    logo: string,
  };

  render() {
    return (
      <Menu fixed="top" inverted borderless style={{ background: '#4d4d4d' }}>
        <Menu.Item>
          <Link to="/">
            <Image src={this.props.logo} size="tiny" alt="Plata logo" />
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button content="Log In" />
          </Menu.Item>
          <Menu.Item>
            <Button primary content="Sign Up" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
