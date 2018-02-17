/*
 *
 * LoginView reducer
 *
 */

import { fromJS } from 'immutable'
import {
  LOGIN,
  LOGOUT,
  ACTIVATION,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  SOCIAL_LOGOUT
} from './actions'

const initialState = fromJS({
  username: '',
  token: '',
  isAuthenticated: false,
  loading: false,
  error: '',
  profile: fromJS({})
})


// The auth reducer. The starting state sets authentication based on a token being in local storage.
// TODO:
// we would also want a util to check if the token is expired, it would update isAuthenticated key

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
    case SOCIAL_LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
    case LOGIN.SUCCESS:
    case SOCIAL_LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('username', action.payload.username)
        .set('token', action.payload.token)
        .set('isAuthenticated', true)
    case LOGIN.FAILURE:
    case SOCIAL_LOGIN_FAILURE:
      return state
        .set('loading', false)
        .set('error', action.payload.error)
        .set('isAuthenticated', false)
    case LOGOUT:
    case SOCIAL_LOGOUT:
      return state
        .set('username', '')
        .set('token', '')
        .set('isAuthenticated', false)
    case ACTIVATION.REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
    case ACTIVATION.SUCCESS:
      return state
        .set('loading', false)
        .set('error', '')
    case ACTIVATION.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error)
    default:
      return state
  }
}

export default authReducer
