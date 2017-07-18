const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');
const values = require('lodash.values');

// init functions
admin.initializeApp(functions.config().firebase);

// connect to db
const db = admin.database();
const ref = db.ref();

// ----------- ALLOWED --------------------
// Fetch Currently Allowed Users
exports.allowed = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    ref.child('allowedUsers').once('value').then(data => {
      const allowedUsers = values(data.val());
      if (allowedUsers.includes(req.query.num)) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    });
  });
});

// ----------- STRAVA --------------------
// Save Strava Access Code
const updateStravaToken = (uid, token) => {
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
};

// Post temp code to Strava
const postStravaToken = code => {
  const body = {
    client_id: functions.config().strava.id,
    client_secret: functions.config().strava.secret,
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
};

exports.strava = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    postStravaToken(req.query.code)
      .then(token => {
        updateStravaToken(req.query.uid, token)
          .then(() => {
            res.json({ tokenUpdated: true });
          })
          .catch(() => {
            res.json({ tokenUpdated: false });
          });
      })
      .catch(() => {
        res.json({ tokenUpdated: false });
      });
  });
});
