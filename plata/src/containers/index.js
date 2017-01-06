/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogin } from '../redux/actions';

import Home from './home';
import Dashboard from './dashboard';

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  // Pass Redux State as Container Props
  return {
    authed: state.reducer.authed,
    loading: state.reducer.isFetching,
    error: state.reducer.error,
    //query: ownProps.location.query,
    //action: ownProps.location.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(doLogin, dispatch),
  };
};

const Wrapper = (props) => {
  return (
    <div>
      <h1>wrapper</h1>
      {props.children}
    </div>
  );
};

const NotFound = () => {
  return (<h1>404</h1>);
};

const DashboardEnter = () => {
  console.log('dashboard enter');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: props.authed,
      user: null,
    };
    console.log(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.lastUpdated !== this.props.lastUpdated) {
      console.log('new props!!!');
      console.log(nextProps);
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route component={Wrapper}>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} onEnter={DashboardEnter} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

App.propTypes = {
  authed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
