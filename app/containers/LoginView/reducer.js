/*
 *
 * LoginView reducer
 *
 */

import { fromJS } from 'immutable'
import {
  LOGIN,
  LOGOUT,
  TOKEN_VALIDATION,
  TOKEN_REFRESH,
  ACTIVATION,
  SOCIAL_LOGIN,
  RESET_ERROR
} from './actions'

const initialState = fromJS({
  username: '',
  token: '',
  refreshToken: '',
  loading: false,
  error: '',
  profile: fromJS({}),
  isRefreshing: false,
  isActivating: false
})


// The auth reducer. The starting state sets authentication based on a token being in local storage.
// TODO:
// we would also want a util to check if the token is expired, it would update isAuthenticated key

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
    case SOCIAL_LOGIN.REQUEST:
    case TOKEN_VALIDATION.REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
    case TOKEN_REFRESH.REQUEST:
      return state
          .set('isRefreshing', true)
          .set('error', '')
    case LOGIN.SUCCESS:
    case SOCIAL_LOGIN.SUCCESS:
      return state
        .set('loading', false)
        // .set('username', action.payload.username)
        .set('token', action.payload.token)
        .set('refreshToken', action.payload.refreshToken)
    case TOKEN_VALIDATION.SUCCESS:
      // token & refreshToken get not altered as they are valid
      return state
        .set('loading', false)
    case TOKEN_REFRESH.SUCCESS:
      return state
        .set('isRefreshing', false)
        .set('token', action.payload.token)
    case LOGIN.FAILURE:
    case SOCIAL_LOGIN.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.payload.error)
    case TOKEN_VALIDATION.FAILURE:
      return state
        .set('loading', false)
        .set('token', '')
        .set('error', action.payload.error)
    case TOKEN_REFRESH.FAILURE:
      return state
        .set('isRefreshing', false)
        .set('refreshToken', '')
    case LOGOUT:
      return state
        .set('profile, fromJS({})')
        .set('token', '')
        .set('refreshToken', false)
    case ACTIVATION.REQUEST:
      return state
        .set('isActivating', true)
        .set('error', '')
    case ACTIVATION.SUCCESS:
      return state
        .set('isActivating', false)
        .set('error', '')
    case ACTIVATION.FAILURE:
      return state
        .set('isActivating', false)
        .set('error', action.payload.error)
    case RESET_ERROR:
      return state
        .set('error', '')
    default:
      return state
  }
}

export default authReducer
