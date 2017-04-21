/*
 *
 * Signup reducer
 *
 */

import { fromJS } from 'immutable'
import { SIGNUP } from './actions'

export const initialState = fromJS({
  loading: false,
  error: ''
})

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP.REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
    case SIGNUP.SUCCESS:
      return state
        .set('loading', false)
    case SIGNUP.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error)
    default:
      return state
  }
}

export default signupReducer
