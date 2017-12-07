import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Image } from 'semantic-ui-react';

import poweredByStrava from '../images/api_logo_pwrdBy_strava_stack_gray.svg';

const propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  showDisclaimer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

export default class MenuComponent extends Component {
  render() {
    const bottomVisible = this.props.showDisclaimer ? {} : { display: 'none' };
    return (
      <div>
        {/* TOP MENU */}
        <Menu secondary icon inverted compact size="small" fixed="top">
          <Menu.Menu position="right">
            <Menu.Item>
              <Icon
                name="content"
                size="large"
                style={{ cursor: 'pointer' }}
                onClick={this.props.toggleSidebar}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {/* BOTTOM MENU */}
        <Menu secondary inverted fixed="bottom" style={bottomVisible}>
          <Menu.Menu position="left">
            <Menu.Item>
              <Image src={poweredByStrava} size="tiny" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

MenuComponent.propTypes = propTypes;
