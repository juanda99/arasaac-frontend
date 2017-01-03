/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const SIGNUP = createRequestTypes('SIGNUP')

export const signup = {
  request: (userData) => action(SIGNUP.REQUEST, userData),
  success: () => action(SIGNUP.SUCCESS),
  failure: (error) => action(SIGNUP.FAILURE, { error })
}
