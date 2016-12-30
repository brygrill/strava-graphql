import { firebaseAuth } from './index';

export function login(email, pwd) {
  return firebaseAuth.signInWithEmailAndPassword(email, pwd);
}
