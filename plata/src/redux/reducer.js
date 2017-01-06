import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  FETCH_PROTECTED_DATA_REQUEST,
  FETCH_PROTECTED_DATA_FAIL,
  RECEIVE_PROTECTED_DATA,
} from './actions';

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  statusText: null,
  isFetching: false,
  error: false,
  data: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null,
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        statusText: 'Login Success!',
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        statusText: 'Authentication Failure.',
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        statusText: 'Logout Success!',
      });
    case FETCH_PROTECTED_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_PROTECTED_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
      });
    case RECEIVE_PROTECTED_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
}

export default reducer;
