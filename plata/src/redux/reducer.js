import { LOGIN, LOGOUT, REQUEST_NETWORK, FAIL_NETWORK } from './actions';

const initialState = {
  authed: false,
  isFetching: false,
  error: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        authed: true,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        authed: false,
      });
    case REQUEST_NETWORK:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FAIL_NETWORK:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
      });
    default:
      return state;
  }
}

export default reducer;
