/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import { logout } from '../firebase/auth';

class Dashboard extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      user: null,
    };
    console.log(this);
  }

  onLogout() {
    logout()
      .then(() => {
        this.context.router.transitionTo({ pathname: '/' });
        //this.setState({ user: null });
      })
      .catch(() => {
        this.context.router.transitionTo({ pathname: '/' });
        //this.setState({ user: null });
      });
  }

  render() {
    return (
      <div>
        <h1>Dashboard!</h1>
        <Button
          content={'logout'}
          onClick={this.onLogout}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  authed: PropTypes.bool.isRequired,
};

Dashboard.contextTypes = {
  router: React.PropTypes.object,
};

export default Dashboard;
