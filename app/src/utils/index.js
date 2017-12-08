import axios from 'axios';

import { fire, functionsAccess } from '../config';

export const currentUserToken = () => {
  if (fire.auth().currentUser) {
    return fire
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        return token;
      })
      .catch(err => {
        return err;
      });
  }
  return null;
};

// Fire Function to save Strava OAuth token
export const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .post(functionsAccess, { code }, config)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return false;
    });
};

// Deauth Athlete
export const deAuthAthlete = token => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post('https://www.strava.com/oauth/deauthorize', {}, config);
};
