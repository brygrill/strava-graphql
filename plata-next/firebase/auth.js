/* eslint-disable import/prefer-default-export */
import { firebaseAuth } from './index';

export function login(email, pwd) {
  return firebaseAuth.signInWithEmailAndPassword(email, pwd);
}

export function logout() {
  return firebaseAuth.signOut();
}

export const currentUser = firebaseAuth.currentUser;
