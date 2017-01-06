/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logout } from '../redux/actions';

const mapStateToProps = (state) => {
  // Pass Redux State as Container Props
  return {
    isAuthenticating: state.reducer.isAuthenticating,
    isAuthenticated: state.reducer.isAuthenticated,
    statusText: state.reducer.statusText,
    isFetching: state.reducer.isFetching,
    error: state.reducer.error,
    data: state.reducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
};

class Dashboard extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      user: null,
    };
    console.log(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      console.log('new props!!!');
      console.log(nextProps);
      this.setState({ authed: nextProps.authed });
    }
  }

  onLogout() {
    this.props.logout();
    this.context.router.replace('/');
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

Dashboard.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
