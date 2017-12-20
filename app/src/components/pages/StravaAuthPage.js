import React, { Component } from 'react';
import { Segment, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { saveToken } from '../../utils';
import { fire } from '../../config';

import StravaAuthView from '../hocs/StravaAuthMutation';

const propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

// const currentUserToken = () => {
//   return fire
//     .auth()
//     .currentUser.getIdToken()
//     .then(token => {
//       return token;
//     })
//     .catch(err => {
//       return err;
//     });
// };

export default class StravaAuthPage extends Component {
  // state = {
  //   error: false,
  // };

  // handleStravaCallback = async (search, history) => {
  //   try {
  //     const params = new URLSearchParams(search);
  //     const code = params.get('code');
  //     if (code) {
  //       const fireToken = await currentUserToken();
  //       await saveToken(code, fireToken);
  //       history.push('/');
  //     } else {
  //       history.push('/');
  //     }
  //   } catch (error) {
  //     this.setState({ error: true });
  //   }
  // };

  // componentDidMount() {
  //   this.handleStravaCallback(this.props.location.search, this.props.history);
  // }

  render() {
    // if (this.state.error) {
    //   return <Header>Error Msg Here</Header>;
    // }
    console.log('StravaAuthPage', this.props);
    return (
      <StravaAuthView
        location={this.props.location}
        history={this.props.history}
      />
      // <Segment
      //   inverted
      //   padded="very"
      //   textAlign="center"
      //   className="back-black"
      //   style={{ marginTop: '6rem' }}
      // >
      //   <Loader active inline="centered" />
      //   <Header
      //     inverted
      //     as="h1"
      //     content="Authenticating with Strava"
      //     subheader="This should only take a moment..."
      //   />
      // </Segment>
    );
  }
}

StravaAuthPage.propTypes = propTypes;
