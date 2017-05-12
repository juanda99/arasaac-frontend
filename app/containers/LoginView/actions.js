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

/* Social login */

export const SOCIAL_LOGIN = 'SOCIAL_LOGIN'
export const SOCIAL_LOGIN_PREPARE = 'SOCIAL_LOGIN_PREPARE'
export const SOCIAL_LOGIN_REQUEST = 'SOCIAL_LOGIN_REQUEST'
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS'
export const SOCIAL_LOGIN_FAILURE = 'SOCIAL_LOGIN_FAILURE'
export const SOCIAL_LOGOUT = 'SOCIAL_LOGOUT'

export const socialLogin = {
  prepare: (service, options) => ({ type: SOCIAL_LOGIN_PREPARE, service, options }),
  request: (service, options) => ({ type: SOCIAL_LOGIN_REQUEST, service, options }),
  success: (user) => ({ type: SOCIAL_LOGIN_SUCCESS, user }),
  failure: (error) => ({ type: SOCIAL_LOGIN_FAILURE, error })
}

export const socialLogout = () => ({ type: SOCIAL_LOGOUT })
