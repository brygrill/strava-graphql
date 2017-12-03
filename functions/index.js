const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const { updateStravaToken, postStravaToken } = controllers;

// init strava
const stravaConnection = {
  client_id: functions.config().strava.id,
  client_secret: functions.config().strava.secret,
};

// Init app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init functions
admin.initializeApp(functions.config().firebase);

// connect to db
const db = admin.database();
const ref = db.ref();

// Firebase Token Middleware
// Only authed users can call this endpoint
// attaches user id to request so strava access token
// can be added to user object in database
const validateFirebaseIdToken = (req, res, next) => {
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
    // eslint-disable-next-line
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

// Respond at root
app.post('/', (req, res) => {
  // post code to strava api and get access token
  postStravaToken(stravaConnection, req.body.code)
    .then(stravaToken => {
      // save access token to user object in database
      updateStravaToken(ref, req.user.uid, stravaToken)
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
