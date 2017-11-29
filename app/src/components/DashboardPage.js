import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import SidebarMenu from './SidebarMenu';

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
  render() {
    return (
      <SidebarMenu visible>
        <Header inverted content="Dashboard!" />
      </SidebarMenu>
    );
  }
}

DashboardPage.propTypes = propTypes;
DashboardPage.defaultProps = defaultProps;
