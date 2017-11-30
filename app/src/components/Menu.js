import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Header } from 'semantic-ui-react';

const propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default class MenuComponent extends Component {
  render() {
    return (
      <div>
        {/* TOP MENU */}
        <Menu secondary icon inverted compact size="small" fixed="top">
          <Menu.Menu position="right">
            <Menu.Item onClick={this.props.toggleSidebar} as="div">
              <Icon name="content" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {/* BOTTOM MENU */}
        <Menu secondary inverted fixed="bottom">
          <Menu.Menu position="right">
            <Menu.Item icon style={{ padding: '1rem' }}>
              <Header inverted>Disclaimer</Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

MenuComponent.propTypes = propTypes;
