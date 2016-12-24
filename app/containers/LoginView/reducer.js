/*
 *
 * LoginView reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN, LOGOUT, ACTIVATION } from './actions'

const initialState = fromJS({
  userName: '',
  token: '',
  isAuthenticated: false,
  loading: false, 
  error: ''
})


// The auth reducer. The starting state sets authentication based on a token being in local storage. 
// TODO:
// we would also want a util to check if the token is expired, it would update isAuthenticated key

const auth = (state = initialState, action) => {
  switch (action.type) {
  	case LOGIN.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case LOGIN.SUCCESS:
      return state
        .set('loading', false )
        .set('username', action.username)
        .set('token', action.token)
    case LOGIN.FAILURE:
   	  return state
   	  	.set('loading', false)
        .set('error', action.error)
  	case LOGOUT.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case LOGOUT.SUCCESS:
      return state
        .set('loading', false)
        .set('username', '')
        .set('token', ''),
    case LOGOUT.FAILURE:
   	  return state
   	    .set('loading', false)
        .set('error', action.error)
    case ACTIVATION.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case ACTIVATION.SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
    case ACTIVATION.FAILURE:
   	  return state
   	    .set('loading', false)
        .set('error', action.error)
    default:
      return state
  }
}

export default authReducer
