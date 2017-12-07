import { fire } from '../config';

export const currentUserToken = () => {
  return fire
    .auth()
    .currentUser.getIdToken()
    .then(token => {
      return token;
    })
    .catch(err => {
      return err;
    });
};
