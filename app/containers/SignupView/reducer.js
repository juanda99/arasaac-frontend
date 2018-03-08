/*
 *
 * Signup reducer
 *
 */

import { fromJS } from 'immutable'
import { SIGNUP } from './actions'

export const initialState = fromJS({
  loading: false,
  error: '',
  send: false,
  name: '',
  email: ''
})

const register = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP.REQUEST:
      return state
        .set('loading', true)
        .set('error', '')
        .set('send', 'false')
        .set('name', action.payload.name)
        .set('email', action.payload.email)
    case SIGNUP.SUCCESS:
      return state
        .set('loading', false)
        .set('send', true)
    case SIGNUP.FAILURE:
      return state
        .set('loading', false)
        .set('error', action.payload.error)
    default:
      return state
  }
}

export default register
