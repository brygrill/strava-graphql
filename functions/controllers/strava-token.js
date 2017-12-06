const axios = require('axios');

module.exports = {
  updateStravaToken(ref, uid, token) {
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
  postStravaToken(strava, code) {
    const body = {
      client_id: strava.client_id,
      client_secret: strava.client_secret,
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
