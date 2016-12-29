/*
 *
 * LoginView reducer
 *
 */

import { fromJS } from 'immutable'
import { LOGIN, LOGOUT, ACTIVATION } from './actions'

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
      return state
        .set('loading', true)
        .set('error', '')
    case LOGIN.SUCCESS:
      return state
        .set('loading', false)
        .set('username', action.username)
        .set('token', action.token)
        .set('isAuthenticated', true)
    case LOGIN.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('isAuthenticated', false)
    case LOGOUT.REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
    case LOGOUT.SUCCESS:
      return state
        .set('loading', false)
        .set('username', '')
        .set('token', '')
    case LOGOUT.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error)
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
