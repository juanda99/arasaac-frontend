/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const LOGIN = createRequestTypes('LOGIN')
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN')
export const LOGOUT = 'app/LoginView/LOGOUT'
export const ACTIVATION = createRequestTypes('ACTIVATION')
export const TOKEN_VALIDATION = createRequestTypes('TOKEN_VALIDATION')
export const TOKEN_REFRESH = createRequestTypes('TOKEN_REFRESH')
export const RESET_ERROR = 'app/LoginView/RESET_ERROR'

export const login = {
  request: (username, password) => action(LOGIN.REQUEST, { username, password }),
  success: (token, refreshToken) => action(LOGIN.SUCCESS, { token, refreshToken }),
  failure: (error) => action(LOGIN.FAILURE, { error })
}

export const socialLogin = {
  request: (socialToken, socialNetwork) => action(SOCIAL_LOGIN.REQUEST, { socialToken, socialNetwork }),
  success: (token, refreshToken) => action(SOCIAL_LOGIN.SUCCESS, { token, refreshToken }),
  failure: (error) => action(SOCIAL_LOGIN.FAILURE, { error })
}

export const activation = {
  request: (profile) => action(ACTIVATION.REQUEST, { profile }),
  success: () => action(ACTIVATION.SUCCESS),
  failure: (error) => action(ACTIVATION.FAILURE, { error })
}

export const tokenValidation = {
  request: (token) => action(TOKEN_VALIDATION.REQUEST, { token }),
  success: () => action(TOKEN_VALIDATION.SUCCESS),
  failure: (error) => action(TOKEN_VALIDATION.FAILURE, { error })
}

export const tokenRefresh = {
  request: (refreshToken) => action(TOKEN_REFRESH.REQUEST, { refreshToken }),
  success: (token) => action(TOKEN_REFRESH.SUCCESS, { token }),
  failure: (error) => action(TOKEN_REFRESH.FAILURE, { error })
}

export const logout = {
  request: () => action(LOGOUT.REQUEST),
  success: () => action(LOGOUT.SUCCESS),
  failure: (error) => action(LOGOUT.FAILURE, { error })
}

export const resetError = () => action(RESET_ERROR)

/* Social login */
/*
export const SOCIAL_LOGIN = 'app/LoginView/SOCIAL_LOGIN'
export const SOCIAL_LOGIN_PREPARE = 'app/LoginView/SOCIAL_LOGIN_PREPARE'
export const SOCIAL_LOGIN_REQUEST = 'app/LoginView/SOCIAL_LOGIN_REQUEST'
export const SOCIAL_LOGIN_SUCCESS = 'app/LoginView/SOCIAL_LOGIN_SUCCESS'
export const SOCIAL_LOGIN_FAILURE = 'app/LoginView/SOCIAL_LOGIN_FAILURE'
export const SOCIAL_LOGOUT = 'app/LoginView/SOCIAL_LOGOUT'


export const socialLogin = {
  prepare: (service, options) => action(SOCIAL_LOGIN_PREPARE, { service, options }),
  request: (service, options) => action(SOCIAL_LOGIN_REQUEST, { service, options }),
  success: (user) => action(SOCIAL_LOGIN_SUCCESS, { user }),
  failure: (error) => action(SOCIAL_LOGIN_FAILURE, { error })
}

export const socialLogout = () => action(SOCIAL_LOGOUT)
*/
