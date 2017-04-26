/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const SIGNUP = createRequestTypes('SIGNUP')

export const signup = {
  request: (email, password) => action(SIGNUP.REQUEST, { email, password }),
  success: () => action(SIGNUP.SUCCESS),
  failure: (error) => action(SIGNUP.FAILURE, { error })
}
