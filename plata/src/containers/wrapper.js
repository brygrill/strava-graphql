/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUserSuccess } from '../redux/actions';

const mapStateToProps = (state) => {
  // Pass Redux State as Container Props
  // Need to know Auth status to pass to nav
  // so Nav can determine what menu items to show
  return {
    isAuthenticated: state.reducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(loginUserSuccess, dispatch),
  };
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log('wrapper const');
  }

  render() {
    return (
      <div>
        <h1>wrapper</h1>
        {this.props.children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
