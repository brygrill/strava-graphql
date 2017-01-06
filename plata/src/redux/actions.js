export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_NETWORK = 'REQUEST_NETWORK';
export const FAIL_NETWORK = 'FAIL_NETWORK';

export function doLogin() {
  console.log('here mate');
  return {
    type: LOGIN,
  };
}

export function doLogout() {
  return {
    type: LOGOUT,
  };
}

export function requestNetwork() {
  return {
    type: REQUEST_NETWORK,
  };
}

export function failNetwork() {
  return {
    type: FAIL_NETWORK,
  };
}
