import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default class SidebarMenu extends Component {
  handleNavClick = (evt, props) => {
    const to = props.name === 'home' ? '/' : `/${props.name}`;
    this.props.push(to);
  };
  render() {
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
          <Menu.Item name="home" onClick={this.handleNavClick}>
            <Icon name="log out" />
            Home
          </Menu.Item>
          <Menu.Item name="graphiql" onClick={this.handleNavClick}>
            <Icon name="log out" />
            GraphiQL
          </Menu.Item>
          <Menu.Item name="settings" onClick={this.handleNavClick}>
            <Icon name="log out" />
            Settings
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
