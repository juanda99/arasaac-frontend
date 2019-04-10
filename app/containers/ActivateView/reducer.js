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
    case ACTIVATION.REQUEST:
      return state
        .set('isActivating', true)
        .set('error', '')
    case ACTIVATION.SUCCESS:
      return state
        .set('isActivating', false)
        .set('accessToken', action.payload.accessToken)
        .set('refreshToken', action.payload.refreshToken)
    case ACTIVATION.FAILURE:
      return state
        .set('isActivating', false)
        .set('error', action.payload.error)
    default:
      return state
  }
}

export default authReducer

