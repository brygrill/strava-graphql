// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

export default class LoginButtonComponent extends Component {
  defaultProps: {
    authed: false,
    noAuthedTo: '/login',
    noAuthedLabel: 'LOGIN',
  };

  props: {
    authed: boolean,
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
        <Button floated="right" inverted>
          <Icon name={authed ? 'dashboard' : 'trophy'} style={{ opacity: 1 }} />
          {authed ? authedLabel : noAuthedLabel}
        </Button>
      </Link>
    );
  }
}
