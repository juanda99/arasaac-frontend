/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const SIGNUP = createRequestTypes('SIGNUP')
export const RESET_ERROR = 'app/SignUpView/RESET_ERROR'

export const signup = {
  request: ({ name, email, password, company, website }) => action(SIGNUP.REQUEST, { name, email, password, company, website }),
  success: () => action(SIGNUP.SUCCESS),
  failure: (error) => action(SIGNUP.FAILURE, { error })
}

export const resetError = () => action(RESET_ERROR)
