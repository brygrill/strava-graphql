import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SigninModal from '../SigninModal';
import Loading from '../Loading';

import { fire } from '../../config';

const propTypes = {
  appState: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  appState: {
    loading: true,
  },
};

export default class HomePage extends Component {
  state = {
    login: null,
    error: false,
  };

  handleLoginInputChange = (event, p) => {
    const name = p.name;
    const value = p.value;
    this.setState({
      login: { ...this.state.login, [name]: value },
    });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    // set loading
    this.setState({ loading: true });
    // submit credentials to firebase
    const { login } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    if (!this.props.appState.loading) {
      return (
        <SigninModal
          error={this.state.error}
          onChange={this.handleLoginInputChange}
          onSubmit={this.handleLoginSubmit}
        />
      );
    }
    return <Loading />;
  }
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;
