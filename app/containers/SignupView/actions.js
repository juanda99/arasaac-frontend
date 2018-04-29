/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const SIGNUP = createRequestTypes('SIGNUP')

export const signup = {
  request: ({ name, email, password, company, website }) => action(SIGNUP.REQUEST, { name, email, password, company, website }),
  success: () => action(SIGNUP.SUCCESS),
  failure: (error) => action(SIGNUP.FAILURE, { error })
}
