export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const FETCH_PROTECTED_DATA_FAIL = 'FETCH_PROTECTED_DATA_FAIL';
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA';

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  };
}

export function validateToken(token) {
  // check if the token is not expired
  const valid = false;
  return valid ? loginUserSuccess(token) : logout();
}

export function loginUser(email, pwd) {
  return function (dispatch) {
    dispatch(loginUserRequest());
    /*
            return fetch('http://localhost:3000/auth/getToken/', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: email, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
            */
  };
}
export function receiveProtectedData(data) {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data,
    },
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedDataFail() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest());
    /*
      return fetch('http://localhost:3000/getData/', {
              credentials: 'include',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then(response => {
              dispatch(receiveProtectedData(response.data));
          })
          .catch(error => {
              if(error.response.status === 401) {
                dispatch(loginUserFailure(error));
                dispatch(push(reDir));
              }
          })
          */
      }
}
