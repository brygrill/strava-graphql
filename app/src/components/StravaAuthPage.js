import React, { Component } from 'react';
import axios from 'axios';

import { stravaFunctionUrl, fire } from '../config';

// import AppContainer from '../components/AppContainer';

const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .get(stravaFunctionUrl(code), config)
    .then(resp => {
      console.log(resp);
      return resp.data;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export default class DashboardPage extends Component {
  state = {
    error: false,
  };

  props: {
    appState: Object,
    location: Object,
    history: Object,
  };

  handleStravaCallback = (search: string, history: Object) => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      fire
        .auth()
        .currentUser.getIdToken()
        .then(idToken => {
          saveToken(code, idToken)
            .then(() => {
              history.push('/');
            })
            .catch(() => {
              this.setState({ error: true });
            });
        })
        .catch(function(error) {
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
      // <AppContainer authed={this.props.appState.authed}>
      //   <div>
      //     <Dialog open>
      //       <LinearProgress />
      //       <div>
      //         <DialogTitle>
      //           {'Authenticating with Strava'}
      //         </DialogTitle>
      //         <DialogContent>
      //           <DialogContentText>
      //             Confirming your info with Strava. Just a moment...
      //           </DialogContentText>
      //         </DialogContent>
      //       </div>
      //     </Dialog>
      //   </div>
      // </AppContainer>
      <div>Strava auth page!</div>
    );
  }
}
