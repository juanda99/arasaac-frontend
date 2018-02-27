/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */


/* import { fromJS } from 'immutable'

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default appReducer */


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
  accessToken: '',
  refreshToken: '',
  loading: false,
  error: '',
  profile: fromJS({}),
  isRefreshing: false,
  isActivating: false,
  provider: fromJS({})

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
        .set('accessToken', action.payload.accessToken)
        .set('refreshToken', action.payload.refreshToken)
    case TOKEN_VALIDATION.SUCCESS:
      // token & refreshToken get not altered as they are valid
      // we upgrade user profile
      return state
        .set('loading', false)
        .mergeDeep(action.payload.authData)
    case TOKEN_REFRESH.SUCCESS:
      return state
        .set('isRefreshing', false)
        .set('accessToken', action.payload.accessToken)
    case LOGIN.FAILURE:
    case SOCIAL_LOGIN.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.payload.error)
    case TOKEN_VALIDATION.FAILURE:
      return state
        .set('loading', false)
        .set('accessToken', '')
        .set('error', action.payload.error)
    case TOKEN_REFRESH.FAILURE:
      return state
        .set('isRefreshing', false)
        .set('refreshToken', '')
    case LOGOUT:
      return initialState
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

