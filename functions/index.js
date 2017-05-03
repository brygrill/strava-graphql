const functions = require('firebase-functions');

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
  console.log('User Signed Up!');
  console.log(event);
});
