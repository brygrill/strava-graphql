// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Button } from 'semantic-ui-react';

const btnItemStyle = mobile => {
  return {
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
    paddingLeft: 0,
    paddingRight: mobile ? '.5rem' : '1rem',
  };
};

export default class MenuComponent extends Component {
  defaultProps: {
    background: '#4d4d4d',
    mobile: true,
  };

  props: {
    logo: string,
    background: string,
    mobile: Boolean,
  };

  render() {
    const { logo, background, mobile } = this.props;
    return (
      <Menu
        fixed="top"
        inverted
        borderless
        size={mobile ? 'tiny' : 'huge'}
        style={{ background }}
      >
        <Menu.Item>
          <Link to="/">
            <Image src={logo} size="tiny" alt="Plata logo" />
          </Link>
        </Menu.Item>

        <Menu.Menu
          position="right"
          style={{ paddingRight: mobile ? '1.25rem' : 0 }}
        >
          <Menu.Item style={btnItemStyle(mobile)}>
            <Button content="Log In" inverted className="plata-login-btn" />
          </Menu.Item>
          <Menu.Item style={btnItemStyle(mobile)}>
            <Button content="Sign Up" className="plata-signup-btn" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
