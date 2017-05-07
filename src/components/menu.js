// @flow
import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';

export default class MenuComponent extends Component {
  defaultProps: {};
  state = {};
  props: {
    logo: string,
  };

  handleItemClick = (evt: Event & { target: HTMLButtonElement }) => {
    console.log('click');
    const target = evt.target;
    const name = target.name;
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu stackable fixed="top">
        <Menu.Item>
          <Image src={this.props.logo} size="tiny" alt="Plata logo" />
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          name="sign-in"
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    );
  }
}
