import axios from 'axios';
import admin from '../config';

const db = admin.database();
const ref = db.ref();

const stravaToken = {
  // save access_token to firebase
  updateStravaToken(uid, token) {
    return ref
      .child('users')
      .child(uid)
      .update({
        strava: {
          token,
        },
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
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
      .catch(err => {
        console.log(err);
        return err;
      });
  },
};

export default stravaToken;
