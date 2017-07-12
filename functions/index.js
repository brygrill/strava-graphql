const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const values = require('lodash.values');

// init functions
admin.initializeApp(functions.config().firebase);

// connect to db
const db = admin.database();
const ref = db.ref('allowedUsers');

// currently allowed users
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
