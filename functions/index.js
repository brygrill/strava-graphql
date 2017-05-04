// @flow
/* eslint-disable object-shorthand */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const shellSchedule = {
  '1_monday': {
    '1': {
      type: 'swim',
      timeInMin: 15,
      workout: '10 x 50',
    },
    '2': {
      type: 'strength',
      timeInMin: 20,
      workout: '3 x 3. Incline press, push press, squat, deadlift',
    },
  },
  '2_tuesday': {
    '1': {
      type: 'bike',
      timeInMin: 40,
      workout: '',
    },
    '2': {
      type: 'run',
      timeInMin: 15,
      workout: '',
    },
  },
  '3_wednesday': {
    '1': {
      type: 'strength',
      timeInMin: 10,
      workout: '',
    },
    '2': {
      type: 'run',
      timeInMin: 30,
      workout: '',
    },
  },
  '4_thursday': {
    '1': {
      type: 'strength',
      timeInMin: 10,
      workout: '',
    },
    '2': {
      type: 'bike',
      timeInMin: 45,
      workout: '',
    },
    '3': {
      type: 'run',
      timeInMin: 15,
      workout: '',
    },
  },
  '5_friday': {
    '1': {
      type: 'crossfit',
      timeInMin: 15,
      workout: '',
    },
    '2': {
      type: 'run',
      timeInMin: 30,
      workout: '',
    },
  },
  '6_saturday': {
    '1': {
      type: 'strength',
      timeInMin: 10,
      workout: '',
    },
    '2': {
      type: 'bike',
      timeInMin: 45,
      workout: '',
    },
    '3': {
      type: 'run',
      timeInMin: 15,
      workout: '',
    },
  },
  '7_sunday': {
    '1': {
      type: 'strength',
      timeInMin: 10,
      workout: '',
    },
    '2': {
      type: 'run',
      timeInMin: 30,
      workout: '',
    },
  },
};

function addUserObject(userId, email, displayName, imageUrl) {
  admin.database().ref('users/' + userId).set({
    email: email,
    displayName: displayName,
    profile_picture: imageUrl,
  });
}

function addScheduleObject(userId) {
  admin.database().ref('schedules/' + userId).set(shellSchedule);
}

exports.handleNewUser = functions.auth.user().onCreate(event => {
  console.log('User Signed Up!', event);
  const newUser = event.data;
  // Add user to /users
  addUserObject(
    newUser.uid,
    newUser.email,
    newUser.displayName,
    newUser.photoURL,
  );
  // Add user to /schedules
  addScheduleObject(newUser.uid);
  // Send welcome email here
  // ...
});
