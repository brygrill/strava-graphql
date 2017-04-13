import firebase from './init';

export const auth = firebase.auth;

export const login = creds => {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.pwd);
};

export const logout = () => {
  return firebase.auth().signOut();
};
