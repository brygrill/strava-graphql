import firebase from 'firebase';
import { connect } from './config';

firebase.initializeApp(connect);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();
