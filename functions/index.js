/* eslint-disable object-shorthand */
// import packages
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const SparkPost = require('sparkpost');

// set vars
const api = functions.config().sparkpost.key;
const myemail = functions.config().myemail.address;

// init functions
admin.initializeApp(functions.config().firebase);
const client = new SparkPost(api);

// function to set user object
function addUserObject(userId, phoneNumber) {
  return admin.database().ref(`users/${userId}`).set({
    info: {
      phoneNumber,
    },
    onboard: {
      acceptBetaMsg: false,
      completedOnboard: false,
    },
  });
}

// function to send an email
function sendEmail(subject, text, html, to) {
  return client.transmissions
    .send({
      content: {
        from: {
          name: 'Bryan at Plata',
          email: 'hi@mail.plata.cool',
        },
        subject: subject,
        reply_to: 'Bryan <bryan@plata.cool>',
        text: text,
        html: html,
      },
      recipients: [{ address: to }],
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

// actions for new user sign up
exports.handleNewUser = functions.auth.user().onCreate(event => {
  console.log('User Signed Up!', event);
  const newUser = event.data;
  // Add user to /users
  addUserObject(newUser.uid, newUser.phoneNumber);

  // Send welcome text to new user here

  // Send new user alert to self
  const alertText = `New User!\n UID: ${newUser.uid}\n Phone: ${newUser.phoneNumber}`;
  const alertHtml = `<html><body><p>New User!</p><p>UID: ${newUser.uid}</p><p>Phone: ${newUser.phoneNumber}</p></body></html>`;
  return sendEmail('New Signup!', alertText, alertHtml, myemail);
});
