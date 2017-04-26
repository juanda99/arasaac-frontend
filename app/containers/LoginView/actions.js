/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')
export const ACTIVATION = createRequestTypes('ACTIVATION')

export const login = {
  request: (username, password) => action(LOGIN.REQUEST, { username, password }),
  success: (username, token) => action(LOGIN.SUCCESS, { username, token }),
  failure: (error) => action(LOGIN.FAILURE, { error })
}

export const activation = {
  request: (profile) => action(ACTIVATION.REQUEST, { profile }),
  success: () => action(ACTIVATION.SUCCESS),
  failure: (error) => action(ACTIVATION.FAILURE, { error })
}

export const logout = {
  request: () => action(LOGOUT.REQUEST),
  success: () => action(LOGOUT.SUCCESS),
  failure: (error) => action(LOGOUT.FAILURE, { error })
}
