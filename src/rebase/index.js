// @flow
import rebase from 're-base';
import firebase from 'firebase';

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
});

export const base = rebase.createClass(app.database());
