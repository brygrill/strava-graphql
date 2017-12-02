import React, { Component } from 'react';
import { Segment, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { saveToken } from '../utils/fetch';
import { fire } from '../config';

const propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default class StravaAuthPage extends Component {
  state = {
    error: false,
  };

  handleStravaCallback = (search, history) => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      fire
        .auth()
        .currentUser.getIdToken()
        .then(idToken => {
          saveToken(code, idToken)
            .then(() => {
              setTimeout(() => {
                history.push('/');
              }, 5000);
              // history.push('/');
            })
            .catch(() => {
              this.setState({ error: true });
            });
        })
        .catch(() => {
          this.setState({ error: true });
        });
    } else {
      history.push('/');
    }
  };

  componentDidMount() {
    console.log('StravaAuth - cDM');
    this.handleStravaCallback(this.props.location.search, this.props.history);
  }

  render() {
    return (
      <Segment
        inverted
        padded="very"
        textAlign="center"
        className="back-black"
        style={{ marginTop: '6rem' }}
      >
        <Loader active inline="centered" />
        <Header
          inverted
          as="h1"
          content="Authenticating with Strava"
          subheader="This should only take a moment..."
        />
      </Segment>
    );
  }
}

StravaAuthPage.propTypes = propTypes;
