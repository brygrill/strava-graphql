import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  deauth: PropTypes.func.isRequired,
  showDisconnect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  children: PropTypes.element.isRequired,
};

export default class SidebarMenu extends Component {
  render() {
    const disconnectVisible = this.props.showDisconnect
      ? {}
      : { display: 'none' };
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={this.props.visible}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item
            name="disconnect"
            style={disconnectVisible}
            onClick={this.props.deauth}
          >
            <Icon name="window close outline" />
            Disconnect Strava
          </Menu.Item>
          <Menu.Item name="logout" onClick={this.props.logout}>
            <Icon name="log out" />
            Log Out
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>{this.props.children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

SidebarMenu.propTypes = propTypes;
