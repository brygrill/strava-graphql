// TRADE STRAVA OAUTH CODE FOR ACCESS TOKEN
// SAVE TO REALTIME DB UNDER USER
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');

const strava = require('../controllers/strava-token');
const mw = require('../middleware');

const { updateStravaToken, postStravaToken } = strava;

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

// Set middleware
app.use(cors);
app.use(mw.auth(admin));

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
module.exports = app;
