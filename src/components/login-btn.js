// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default class LoginButtonComponent extends Component {
  defaultProps: {
    authed: false,
    noAuthedTo: '/login',
    noAuthedLabel: 'LOGIN',
  };

  props: {
    authed: Boolean,
    authedTo: string,
    authedLabel: string,
    noAuthedTo: string,
    noAuthedLabel: string,
  };

  render() {
    const { authed, authedTo, noAuthedTo, authedLabel, noAuthedLabel } = this
      .props;
    return (
      <Link to={authed ? authedTo : noAuthedTo}>
        <Button
          content={authed ? authedLabel : noAuthedLabel}
          floated="right"
          inverted
        />
      </Link>
    );
  }
}
