const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');
const values = require('lodash.values');

// init functions
admin.initializeApp(functions.config().firebase);

// connect to db
const db = admin.database();
const ref = db.ref('allowedUsers');

// POST temp code to strava
const postStravaToken = (uid, code) => {
  //const ref = db.ref(`users/${uid}`);

  const body = {
    client_id: functions.config().strava.id,
    client_secret: functions.config().strava.secret,
    code,
  };

  return axios
    .post('https://www.strava.com/oauth/token', body)
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Fetch Currently Allowed Users
exports.allowed = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    ref.once('value').then(data => {
      const allowedUsers = values(data.val());
      if (allowedUsers.includes(req.query.num)) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    });
  });
});

// Save Strava Access Code
exports.strava = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    postStravaToken(req.query.code, req.query.uid);
    res.json({ worked: true });
  });
});
