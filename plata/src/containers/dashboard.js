/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { doLogout } from '../redux/actions';

const mapStateToProps = (state) => {
  // Pass Redux State as Container Props
  return {
    authed: state.reducer.authed,
    loading: state.reducer.isFetching,
    error: state.reducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(doLogout, dispatch),
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
    if (nextProps.authed !== this.props.authed) {
      console.log('new props!!!');
      console.log(nextProps);
      this.setState({ authed: nextProps.authed });
    }
  }

  onLogout() {
    console.log('do something in redux');
    console.log(this.context);
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
