const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const axios = require('axios');
const app = express();

// init functions
admin.initializeApp(functions.config().firebase);

// connect to db
const db = admin.database();
const ref = db.ref();

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

// Firebase Token Middleware
const validateFirebaseIdToken = (req, res, next) => {
  // thanks https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      next();
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
};

// Set middleware
app.use(cors);
app.use(validateFirebaseIdToken);

// Respond at /token
app.get('/token', (req, res) => {
  postStravaToken(req.query.code)
    .then(stravaToken => {
      updateStravaToken(req.user.uid, stravaToken)
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

// Export app
exports.strava = functions.https.onRequest(app);
