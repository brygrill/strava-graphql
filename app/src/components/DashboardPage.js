import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Container } from 'semantic-ui-react';

import Menu from './Menu';
import SidebarMenu from './SidebarMenu';

const Fragment = React.Fragment;

const propTypes = {
  appState: PropTypes.shape({
    loading: PropTypes.bool,
    authed: PropTypes.bool,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {
  appState: {
    loading: true,
    authed: false,
  },
};

export default class DashboardPage extends Component {
  state = {
    sidebar: false,
  };

  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };
  render() {
    return (
      <Fragment>
        <SidebarMenu visible={this.state.sidebar}>
          <Menu toggleSidebar={this.toggleSidebar} />
          <Container style={{ marginTop: '3rem' }}>
            <Header inverted content="Dashboard!" />
          </Container>
        </SidebarMenu>
      </Fragment>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.defaultProps = defaultProps;
