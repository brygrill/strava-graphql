import firebase from 'firebase';

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyC9SjeBoAeI_GT9Gbqy9boAQl4wj4V-Rcs',
    databaseURL: 'https://team-manager-f76c3.firebaseio.com',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
