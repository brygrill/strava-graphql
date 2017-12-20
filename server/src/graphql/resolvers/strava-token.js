import axios from 'axios';
import admin from '../../config';

const db = admin.database();
const ref = db.ref();

const writeTokenToUser = (uid, token) => {
  return ref
    .child('users')
    .child(uid)
    .update({
      strava: {
        token,
      },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const readUserObj = uid => {
  return ref
    .child('users')
    .child(uid)
    .once('value')
    .then(snapshot => {
      const stravaToken = snapshot
        .child('strava')
        .child('token')
        .val();
      return stravaToken;
    })
    .catch(() => {
      throw new Error('Error fetching user object');
    });
};
const stravaToken = {
  // save access_token to firebase
  async updateStravaToken(uid, token) {
    const write = await writeTokenToUser(uid, token);
    if (!write) {
      throw new Error('Failed to write token to Firebase');
    }
    // if write succeeds, get user and return
    const user = await readUserObj(uid);
    return user;
  },
  // Post temp code to Strava
  // return access_token
  postStravaToken(code) {
    const body = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
    };

    return axios
      .post('https://www.strava.com/oauth/token', body)
      .then(data => {
        return data.data.access_token;
      })
      .catch(() => {
        throw new Error('Failed to trade code for access token');
      });
  },
};

export default stravaToken;
